import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { externalProps, getContactItems } from "./ContactDetails";
import Icon from "./Icon";
import SocialLinks from "./SocialLinks";
import WorkingHours from "./WorkingHours";
import { pages } from "@/lib/metadata";
import { navItems, siteConfig } from "@/lib/site";

const columnTitle =
  "text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50";

/**
 * Site altbilgisi. Yerel işletme sitesinde ziyaretçi adres/telefon/saatleri
 * çoğu zaman en altta arar; bu yüzden menünün yanında iletişim kanalları ve
 * çalışma saatleri de burada durur (ContactDetails ile aynı kaynaktan).
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const { district, city } = siteConfig.address;

  return (
    <footer className="mt-auto border-t border-line bg-black/40">
      {/* Üst kenarda ince marka çizgisi. */}
      <div aria-hidden="true" className="h-1 bg-brand" />

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1.2fr]">
        <div>
          <h2 className="flex items-center gap-3 text-base font-bold">
            <Image
              src="/images/logo/meydansport_logo.png"
              alt={siteConfig.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
            <span aria-hidden="true" className="text-brand">
              {siteConfig.name}
            </span>
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/65">
            {siteConfig.description}
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Alt menü" className="flex flex-col gap-2.5">
          <h3 className={`${columnTitle} mb-1`}>Menü</h3>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/70 transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          {/* Menü tek sayfa çapalarıdır; ayrı rotası olan kadınlar salonu
              sayfası buradan da bağlanır (yerel arama için iç bağlantı). */}
          <Link
            href={pages.womens.path}
            className="text-sm text-foreground/70 transition-colors hover:text-brand"
          >
            Kadınlara Özel Salon
          </Link>
        </nav>

        <div>
          <h3 className={columnTitle}>Bize Ulaşın</h3>
          <ul className="mt-4 space-y-3.5">
            {getContactItems().map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...externalProps(item)}
                  className="group flex gap-3 text-sm text-foreground/75 transition-colors hover:text-brand"
                >
                  <Icon
                    name={item.icon}
                    className={`mt-0.5 size-4 shrink-0 ${
                      item.whatsapp ? "text-whatsapp" : "text-brand/80"
                    }`}
                  />
                  <span className="break-words">{item.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={columnTitle}>Çalışma Saatleri</h3>
          <WorkingHours compact className="mt-4" />
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-1 py-6 text-xs text-foreground/55 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p>
            {district} / {city}
          </p>
        </Container>
      </div>
    </footer>
  );
}
