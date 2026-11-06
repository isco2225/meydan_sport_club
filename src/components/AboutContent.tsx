import Image from "next/image";
import HighlightGrid from "@/components/HighlightGrid";
import { aboutHighlights, aboutStory, aboutValues } from "@/data/about";
import { galleryImages } from "@/data/gallery";

type AboutContentProps = {
  /**
   * Alt başlıkların düzeyi. Ana sayfa bölümünde `h2` "Hakkımızda" olduğu için
   * `3`; `/hakkimizda` sayfasında `h1` PageHeader'da olduğu için `2`. Öne
   * çıkan kartların başlıkları bir alt düzeydedir.
   */
  headingLevel: 2 | 3;
};

/**
 * Hakkımızda gövdesi: hikaye + misyon/vizyon/değerler, salon fotoğrafları
 * mozaiği ve "Neden Meydan?" kartları. Ana sayfadaki `AboutSection` ile
 * `/hakkimizda` sayfasının ortak bileşenidir.
 */
export default function AboutContent({ headingLevel }: AboutContentProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <div className="space-y-4 text-lg leading-relaxed text-foreground/75">
            {aboutStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {aboutValues.map((value) => (
              <li key={value.title} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <Heading className="text-sm font-semibold uppercase tracking-wider text-brand">
                  {value.title}
                </Heading>
                <p className="text-foreground/75">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Salon fotoğrafları: dikey kareler, ikinci sütun aşağı kaydırılarak
            dinamik bir mozaik. */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {galleryImages.map((image, i) => (
            <li
              key={image.src}
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-line ${
                i % 2 === 1 ? "translate-y-6 sm:translate-y-10" : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 280px, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <Heading className="font-display text-2xl uppercase sm:text-3xl">
          Neden Meydan?
        </Heading>
        <HighlightGrid
          items={aboutHighlights}
          headingLevel={(headingLevel + 1) as 3 | 4}
          className="mt-6"
        />
      </div>
    </div>
  );
}
