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
      className="relative flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden border-b border-white/10 py-20 text-center"
    >
      <HeroSlideshow images={heroImages} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75"
      />

      <Container className="relative">
        {/* Salon adıyla kelime oyunu: "meydan okumak". CSS uppercase,
            lang="tr" sayesinde i → İ dönüşümünü doğru yapar. */}
        <h1 className="mx-auto max-w-5xl font-display text-[clamp(3rem,11vw,7rem)] uppercase leading-[0.95] tracking-tight text-white drop-shadow-sm">
          <span className="block">Kendine</span>{" "}
          <span className="block text-brand">Meydan</span>{" "}
          <span className="block">Oku</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
          Modern ekipman, uzman antrenörler ve seni her antrenmanda ileri
          taşıyan bir atmosfer. Hedefin ne olursa olsun, doğru adres{" "}
          {siteConfig.name}.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/#uyelik"
            className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Üyelik Ücretleri
          </Link>
          <Link
            href="/#ders-programi"
            className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ders Programı
          </Link>
        </div>
        {/* Bir sonraki bölüme yumuşak kaydıran keşif butonu. */}
        <Link
          href="/#hakkimizda"
          className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Keşfet{" "}
          <span aria-hidden="true" className="animate-bounce">
            ↓
          </span>
        </Link>
      </Container>
    </section>
  );
}
