import { faqItems, type FaqItem } from "@/data/faq";
import { openingHoursSpecification, salonSchedules } from "@/data/hours";
import { internationalPhone, mapsHref, streetAddress } from "@/lib/links";
import { shareImage } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

/**
 * JSON-LD üreticileri. Kural: yapılandırılmış veri daima görünen veriden
 * (siteConfig, hours, faq) türetilir — elle ikinci bir kopya yazılmaz; böylece
 * sayfada görünen ile Google'a bildirilen hiçbir zaman ayrışmaz.
 */

/** Site köküne göre mutlak URL. */
const absolute = (path: string) => new URL(path, siteConfig.url).toString();

function findSalon(id: (typeof salonSchedules)[number]["id"]) {
  const salon = salonSchedules.find((s) => s.id === id);
  if (!salon) throw new Error(`Salon tanımlı değil: ${id}`);
  return salon;
}

/**
 * Ana sayfa için `ExerciseGym` (LocalBusiness alt türü). Ana işletmenin
 * saatleri karma salondur; kadınlar salonu farklı saatlerle çalıştığı için
 * ayrı bir `department` olarak bildirilir.
 */
export function gymJsonLd(images: string[] = []) {
  const karma = findSalon("karma");
  const kadinlar = findSalon("kadinlar");
  const { address } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": absolute("/#salon"),
    name: siteConfig.name,
    description: siteConfig.description,
    url: absolute("/"),
    logo: absolute("/images/logo/meydansport_logo.png"),
    image: [shareImage.url, ...images].map(absolute),
    telephone: internationalPhone(siteConfig.phone),
    // Sitede e-posta görünmüyorsa Google'a da bildirilmez.
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddress(address),
      postalCode: address.postalCode,
      addressLocality: address.district,
      addressRegion: address.city,
      addressCountry: address.country,
    },
    hasMap: mapsHref(),
    openingHoursSpecification: openingHoursSpecification(karma.week),
    department: [
      {
        "@type": "ExerciseGym",
        name: `${siteConfig.name} ${kadinlar.name}`,
        openingHoursSpecification: openingHoursSpecification(kadinlar.week),
      },
    ],
    sameAs: Object.values(siteConfig.social),
  };
}

/** SSS için `FAQPage`; cevaplar düz metindir (bkz. `FaqItem.answer`). */
export function faqPageJsonLd(items: FaqItem[] = faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
