import Link from "next/link";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import HeroSlideshow from "./HeroSlideshow";
import { heroImages } from "@/data/gallery";
import { whatsappHref, WHATSAPP_TRIAL_MESSAGE } from "@/lib/links";
import { siteConfig } from "@/lib/site";

/**
 * Ana sayfanın ilk ekranı. Salon fotoğrafları crossfade slideshow ile döner
 * (bkz. {@link HeroSlideshow}). Fotoğraflar dikey telefon çekimi olduğu için:
 * - mobilde tam ekran arka plandır (üzerinde koyu degrade, beyaz metin);
 * - masaüstünde (lg) sağda dikey bir çerçevede durur — yatay tam genişliğe
 *   büyütülüp bulanıklaşmaz; solda başlık ve eylemler yer alır.
 *
 * Tek bir slideshow örneği her iki düzeni de karşılar: mobilde çerçeve kutusu
 * konumlandırılmamış olduğundan görsel `section`'a göre tam ekrana yayılır;
 * lg'de çerçeve `relative` olur ve görsel onun içine sığar.
 */
export default function HeroSection() {
  const { district, neighborhood } = siteConfig.address;

  return (
    <section
      id="ust"
      className="glow-brand relative isolate flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden border-b border-line py-16 lg:py-12"
    >
      <Container className="grid items-center lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="relative z-10 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand backdrop-blur-sm">
            <Icon name="map-pin" className="size-3.5" />
            {district} · {neighborhood}
          </p>

          {/* Salon adıyla kelime oyunu: "meydan okumak". CSS uppercase,
              lang="tr" sayesinde i → İ dönüşümünü doğru yapar. */}
          <h1 className="mt-5 font-display text-[clamp(3.25rem,11vw,6.5rem)] uppercase leading-[0.92] tracking-tight text-white">
            <span className="block">Kendine</span>{" "}
            <span className="block text-brand">Meydan</span>{" "}
            <span className="block">Oku</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg lg:mx-0">
            Modern ekipman, uzman antrenörler ve seni her antrenmanda ileri
            taşıyan bir atmosfer. Hedefin ne olursa olsun, doğru adres{" "}
            {siteConfig.name}.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {/* Birincil eylem: SSS'de vaat edilen ücretsiz deneme antrenmanı,
                hazır mesajlı WhatsApp sohbetiyle tek dokunuşta. */}
            <a
              href={whatsappHref(WHATSAPP_TRIAL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_-8px_var(--color-brand)] transition-transform hover:-translate-y-0.5"
            >
              <Icon name="message" className="size-4" />
              Ücretsiz Deneme Antrenmanı
            </a>
            <Link
              href="/#uyelik"
              className="rounded-full border border-white/30 bg-black/30 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/10"
            >
              Üyelik Ücretleri
            </Link>
            <Link
              href="/#ders-programi"
              className="rounded-full border border-white/30 bg-black/30 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/10"
            >
              Ders Programı
            </Link>
          </div>

          {/* Bir sonraki bölüme yumuşak kaydıran keşif butonu. */}
          <Link
            href="/#hakkimizda"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            Keşfet{" "}
            <span aria-hidden="true" className="animate-bounce motion-reduce:animate-none">
              ↓
            </span>
          </Link>
        </div>

        <div className="lg:relative lg:w-full lg:max-w-[26rem] lg:justify-self-end">
          {/* Masaüstü: çerçevenin arkasında sarı ofset blok (marka imzası). */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -bottom-4 hidden size-full rounded-[2rem] border-2 border-brand lg:block"
          />
          <div className="lg:relative lg:aspect-[3/4] lg:overflow-hidden lg:rounded-[2rem] lg:ring-1 lg:ring-white/10">
            <HeroSlideshow
              images={heroImages}
              sizes="(min-width: 1024px) 416px, 100vw"
              className="absolute inset-0 -z-10 lg:z-0"
            />
            {/* Mobil: tam ekran fotoğrafın üstünde okunabilirlik katmanı. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/60 to-black/90 lg:hidden"
            />
            {/* Masaüstü: çerçevenin altına hafif koyulaşma. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black/60 to-transparent lg:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
