import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { navItems, siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <Container className="grid gap-8 py-12 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-3 text-base font-bold">
            <Image
              src="/images/logo/meydansport_logo.png"
              alt={siteConfig.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
            <span aria-hidden="true">{siteConfig.name}</span>
          </h3>
          <p className="mt-3 max-w-xs text-sm text-foreground/70">
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
      </Container>

      <Container className="border-t border-black/10 py-6 text-center text-xs text-foreground/50 dark:border-white/10">
        © {siteConfig.name}. Tüm hakları saklıdır.
      </Container>
    </footer>
  );
}
