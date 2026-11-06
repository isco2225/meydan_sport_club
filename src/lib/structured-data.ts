import { faqItems, type FaqItem } from "@/data/faq";
import { openingHoursSpecification, salonSchedules } from "@/data/hours";
import {
  CURRENCY,
  formatTRY,
  membershipPlans,
  membershipPriceBounds,
} from "@/data/membership";
import { internationalPhone, mapsHref, streetAddress } from "@/lib/links";
import { pages, shareImage } from "@/lib/metadata";
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

function offer(name: string, price: number, description?: string) {
  return {
    "@type": "Offer" as const,
    name,
    price,
    priceCurrency: CURRENCY,
    ...(description ? { description } : {}),
  };
}

/**
 * Üyelik ücretleri teklif kataloğu — `/uyelik`'teki tabloyla aynı veriden
 * (`membershipPlans`): her süre için standart ve öğrenci fiyatı.
 */
function membershipOfferCatalog() {
  return {
    "@type": "OfferCatalog" as const,
    name: "Üyelik Ücretleri",
    url: absolute(pages.membership.path),
    itemListElement: membershipPlans.flatMap((plan) => [
      offer(`${plan.label} Üyelik`, plan.standardPrice),
      offer(
        `${plan.label} Öğrenci Üyeliği`,
        plan.studentPrice,
        "Geçerli öğrenci belgesi ile uygulanır.",
      ),
    ]),
  };
}

/**
 * Ana sayfa için `ExerciseGym` (LocalBusiness alt türü). Ana işletmenin
 * saatleri karma salondur; kadınlar salonu farklı saatlerle çalıştığı için
 * ayrı bir `department` olarak bildirilir.
 *
 * Google bölümü de ayrı bir yerel işletme gibi denetler (Zengin Sonuçlar
 * Testi adres/telefon/fiyat/görsel ister); bu yüzden bölüm aynı binadaki
 * ortak alanları ana işletmeyle aynı değerlerden alır ve kendi sayfasına
 * (`/kadinlar-salonu`) bağlanır.
 */
export function gymJsonLd(images: string[] = []) {
  const karma = findSalon("karma");
  const kadinlar = findSalon("kadinlar");
  const { address, geo } = siteConfig;
  const prices = membershipPriceBounds();

  const shared = {
    telephone: internationalPhone(siteConfig.phone),
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: streetAddress(address),
      postalCode: address.postalCode,
      addressLocality: address.district,
      addressRegion: address.city,
      addressCountry: address.country,
    },
    priceRange: `${formatTRY(prices.min)} – ${formatTRY(prices.max)}`,
  };

  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": absolute("/#salon"),
    name: siteConfig.name,
    description: siteConfig.description,
    url: absolute("/"),
    logo: absolute("/images/logo/meydansport_logo.png"),
    image: [shareImage.url, ...images].map(absolute),
    telephone: shared.telephone,
    // Sitede e-posta görünmüyorsa Google'a da bildirilmez.
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: shared.address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: mapsHref(),
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${address.district}, ${address.city}`,
    },
    priceRange: shared.priceRange,
    hasOfferCatalog: membershipOfferCatalog(),
    openingHoursSpecification: openingHoursSpecification(karma.week),
    department: [
      {
        "@type": "ExerciseGym",
        "@id": absolute(`${pages.womens.path}#salon`),
        name: `${siteConfig.name} ${kadinlar.name}`,
        url: absolute(pages.womens.path),
        // Kadınlar salonuna ait fotoğraf henüz yok; paylaşım görseli kullanılır.
        image: [absolute(shareImage.url)],
        ...shared,
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
