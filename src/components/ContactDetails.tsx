import Icon, { type IconName } from "@/components/Icon";
import SocialLinks from "@/components/SocialLinks";
import WorkingHours from "@/components/WorkingHours";
import {
  formatAddress,
  mailtoHref,
  mapsHref,
  telHref,
  whatsappHref,
} from "@/lib/links";
import { siteConfig } from "@/lib/site";

type ContactDetailsProps = {
  /**
   * Alt başlıkların düzeyi. Ana sayfadaki bölümde `h2` "İletişim" olduğu için
   * `3`; `/iletisim` sayfasında `h1` PageHeader'da olduğu için `2`.
   */
  headingLevel: 2 | 3;
  className?: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: IconName;
  /** Dış site (harita, WhatsApp) — yeni sekmede açılır. */
  external?: boolean;
};

/**
 * İletişim kanalları (adres, telefon, WhatsApp, e-posta) — tek liste. Hem bu
 * bileşen hem Footer kullanır; sıra ve bağlantılar tek yerde durur.
 */
export function getContactItems(): ContactItem[] {
  return [
    {
      label: "Adres",
      value: formatAddress(),
      href: mapsHref(),
      icon: "map-pin",
      external: true,
    },
    { label: "Telefon", value: siteConfig.phone, href: telHref(), icon: "phone" },
    {
      label: "WhatsApp",
      value: "WhatsApp'tan yazın",
      href: whatsappHref(),
      icon: "message",
      external: true,
    },
    { label: "E-posta", value: siteConfig.email, href: mailtoHref(), icon: "mail" },
  ];
}

/** Dış bağlantılar için yeni sekme öznitelikleri. */
export function externalProps(item: ContactItem) {
  return item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/**
 * İletişim bilgileri (adres, telefon, e-posta), çalışma saatleri ve sosyal
 * hesaplar. Ana sayfadaki `ContactSection` ile `/iletisim` sayfasının ortak
 * gövdesidir; her bilgi tıklanabilir (harita, `tel:`, WhatsApp, `mailto:`).
 */
export default function ContactDetails({
  headingLevel,
  className = "",
}: ContactDetailsProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  const details = getContactItems();

  return (
    <div className={className}>
      <dl className="space-y-5">
        {details.map((detail) => (
          <div key={detail.label} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand"
            >
              <Icon name={detail.icon} />
            </span>
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                {detail.label}
              </dt>
              <dd className="mt-1">
                <a
                  href={detail.href}
                  {...externalProps(detail)}
                  className="break-words text-foreground/90 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  {detail.value}
                </a>
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <Heading className="inline-block bg-brand px-2 py-0.5 text-sm font-semibold uppercase tracking-wide text-black">
          Çalışma Saatleri
        </Heading>
        <WorkingHours className="mt-4" />
      </div>

      <div className="mt-10">
        <Heading className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
          Bizi Takip Edin
        </Heading>
        <SocialLinks className="mt-3" />
      </div>
    </div>
  );
}
