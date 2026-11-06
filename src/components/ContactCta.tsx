import Icon from "@/components/Icon";
import { telHref, whatsappHref } from "@/lib/links";
import { siteConfig } from "@/lib/site";

type ContactCtaProps = {
  /** Kart başlığının düzeyi: bölümde `3` (h2 "İletişim"), alt sayfada `2`. */
  headingLevel: 2 | 3;
};

/**
 * "Hemen ulaşın" kartı: WhatsApp ve telefon. Ana sayfadaki iletişim bölümü
 * ile `/iletisim`'in ortak gövdesidir.
 *
 * İletişim formunun yerini tutar (karar, 6 Kas 2026): e-posta gönderimi alan
 * adı doğrulanana dek form mesaj iletmiyordu. Form (`ContactForm`) ve sunucu
 * action'ı kodda duruyor; açılınca bu kartın yerine geri konur.
 */
export default function ContactCta({ headingLevel }: ContactCtaProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <div className="relative self-start overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10">
      {/* Köşede soluk marka ışığı. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative">
        <Heading className="font-display text-3xl uppercase leading-none sm:text-4xl">
          Hemen ulaşın
        </Heading>
        <p className="mt-4 max-w-md text-foreground/70">
          Sorularınız, üyelik bilgisi ya da ücretsiz deneme antrenmanı için en
          hızlı yol WhatsApp. Dilerseniz doğrudan arayabilirsiniz.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <Icon name="message" className="size-4" />
            WhatsApp&apos;tan yazın
          </a>
          <a
            href={telHref()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            <Icon name="phone" className="size-4" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
