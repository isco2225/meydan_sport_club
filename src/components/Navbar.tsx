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

  return (
    <header className="sticky top-0 z-50 h-[var(--nav-h)] border-b border-white/10 bg-black text-white">
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
            className="text-lg font-bold tracking-tight text-brand max-[400px]:hidden"
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden gap-6 lg:flex">
          {navItems.map((item) => {
            const active = isHome && activeSection === item.sectionId;
            return (
              <Link
                key={item.sectionId}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-brand" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* İletişim sayfasındaki ücretsiz tanışma antrenmanına götüren CTA;
            menünün gizlendiği mobil ekranlarda da görünür kalır. */}
        <Link
          href="/#iletisim"
          className="shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:px-5"
        >
          Ücretsiz Deneme
        </Link>
      </Container>
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

    const observer = new IntersectionObserver(
      (entries) => {
        // Ekranın ortasına en yakın (en çok görünen) bölümü aktif say.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return activeSection;
}
