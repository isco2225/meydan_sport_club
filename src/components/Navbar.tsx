"use client";

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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/50">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/#ust" className="text-lg font-bold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => {
            const active = isHome && activeSection === item.sectionId;
            return (
              <Link
                key={item.sectionId}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
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
