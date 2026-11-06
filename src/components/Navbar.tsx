"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./Container";
import { navItems, siteConfig } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  // Başka bir rotaya geçildiğinde açık kalan menüyü kapat. Effect yerine
  // render sırasında state uyarlama kalıbı kullanılır (react-hooks kuralı).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-50 h-[var(--nav-h)] border-b border-white/10 bg-black/85 text-white backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenuOpen(false);
      }}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Link href="/#ust" className="flex items-center gap-2.5">
          <Image
            src="/images/logo/meydansport_logo.png"
            alt={siteConfig.name}
            width={40}
            height={40}
            priority
            className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
          />
          {/* Logo zaten markayı adlandırır; kelime işareti görsel için, bağlantı
              erişilebilir adı yalnızca logonun alt metninden gelir. */}
          <span
            aria-hidden="true"
            className="text-lg font-bold tracking-tight text-foreground"
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isHome && activeSection === item.sectionId;
            return (
              <Link
                key={item.sectionId}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand/15 text-brand"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="mobil-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:text-brand lg:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-6"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {menuOpen && (
        <nav
          id="mobil-menu"
          aria-label="Mobil menü"
          className="absolute inset-x-0 top-full border-b border-white/10 bg-black/95 py-2 backdrop-blur-md lg:hidden"
        >
          {navItems.map((item) => {
            const active = isHome && activeSection === item.sectionId;
            return (
              <Link
                key={item.sectionId}
                href={item.href}
                aria-current={active ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block border-l-2 px-6 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

/**
 * Görünür bölümü izleyen scroll-spy. Yalnızca ana sayfada (bölümlerin olduğu
 * yerde) çalışır; navbar'daki aktif bağlantıyı vurgulamak için kullanılır.
 */
function useActiveSection(enabled: boolean): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Ana sayfa dışında bölüm yok; render'da zaten isHome ile kapatıldığı için
    // gözlemciyi hiç kurmamak yeterli (eski değer görünürlüğü etkilemez).
    if (!enabled) return;

    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Kök alan, ekranın tam ortasındaki yatay bir çizgiye daraltılır: o çizgiyi
    // kesen bölüm aktiftir. Oran eşiği (ör. threshold 0.5) kullanılmaz; çünkü
    // ekrandan iki kat uzun bir bölüm hiçbir zaman %50 görünür olamaz ve
    // (mobilde ders programı gibi) hiç aktif sayılmazdı.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return activeSection;
}
