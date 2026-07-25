import Link from "next/link";
import Container from "@/components/Container";
import HeroSlideshow from "./HeroSlideshow";
import { siteConfig } from "@/lib/site";

/**
 * Ana sayfanın ilk ekranı. Arka planda salon fotoğrafları crossfade slideshow
 * ile sırayla döner (bkz. {@link HeroSlideshow}); üzerine koyu degrade katman
 * konarak beyaz metnin okunabilirliği güvence altına alınır. İlk görsel
 * sayfanın LCP öğesidir ve öncelikli yüklenir.
 */
const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
  "/images/hero/hero-5.jpg",
  "/images/hero/hero-6.jpg",
];

export default function HeroSection() {
  return (
    <section
      id="ust"
      className="relative flex min-h-[100svh] scroll-mt-16 items-center overflow-hidden border-b border-white/10 py-20 text-center"
    >
      <HeroSlideshow images={heroImages} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75"
      />

      <Container className="relative">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-6xl">
          Hedeflerine {siteConfig.shortName} ile Ulaş
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/#uyelik"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Üyelik Ücretleri
          </Link>
          <Link
            href="/#ders-programi"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ders Programı
          </Link>
        </div>
        <p className="mt-16 text-sm text-white/60">
          Keşfetmek için aşağı kaydır ↓
        </p>
      </Container>
    </section>
  );
}
