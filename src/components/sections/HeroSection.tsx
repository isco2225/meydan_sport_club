import Link from "next/link";
import Section from "./Section";
import { siteConfig } from "@/lib/site";

export default function HeroSection() {
  return (
    <Section id="ust" muted className="text-center">
      <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
        Hedeflerine {siteConfig.shortName} ile Ulaş
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70">
        {siteConfig.description}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/#uyelik"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Üyelik Paketleri
        </Link>
        <Link
          href="/#ders-programi"
          className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
        >
          Ders Programı
        </Link>
      </div>
      <p className="mt-16 text-sm text-foreground/50">
        Keşfetmek için aşağı kaydır ↓
      </p>
    </Section>
  );
}
