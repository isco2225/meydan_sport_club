import Link from "next/link";
import Container from "./Container";
import { navItems, siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="text-base font-bold">{siteConfig.name}</h3>
          <p className="mt-2 max-w-xs text-sm text-foreground/70">
            {siteConfig.description}
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
            Sayfalar
          </h4>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-foreground/70">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
            İletişim
          </h4>
          <p>{siteConfig.address}</p>
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.workingHours}</p>
        </div>
      </Container>

      <Container className="border-t border-black/10 py-6 text-center text-xs text-foreground/50 dark:border-white/10">
        © {siteConfig.name}. Tüm hakları saklıdır.
      </Container>
    </footer>
  );
}
