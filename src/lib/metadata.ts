import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export type PageInfo = {
  /** Rota yolu; canonical ve sitemap bundan üretilir. */
  path: `/${string}`;
  /** Sayfa başlığı. Alt sayfalarda layout şablonu "· Meydan Sport Club" ekler. */
  title: string;
  /** Arama sonucunda görünen, sayfaya özgü açıklama (≈ 120–160 karakter). */
  description: string;
};

/**
 * Sitedeki tüm sayfalar — tek kaynak. Her sayfanın `metadata`'sı ve
 * `sitemap.xml` bu listeden türetilir. Yeni rota eklerken buraya da ekle
 * (`metadata.test.ts` eksik kalan rotayı yakalar).
 */
export const pages = {
  home: {
    path: "/",
    // Yerel arama ifadesi önde, marka sonda (≈60 karakter, kesilmez).
    title: `Beykoz Ortaçeşme Spor ve Fitness Salonu · ${siteConfig.name}`,
    description: siteConfig.description,
  },
  about: {
    path: "/hakkimizda",
    title: "Hakkımızda",
    description:
      "3. kademe kıdemli antrenör Yunus Hoca'nın kurduğu Meydan Sport Club'ı tanıyın: karma ve kadınlara özel salonuyla Beykoz'un topluluk odaklı spor kulübü.",
  },
  womens: {
    path: "/kadinlar-salonu",
    title: "Beykoz Kadınlara Özel Spor Salonu",
    description:
      "Beykoz Ortaçeşme'de tamamen kadınlara özel spor salonu: kadın antrenörler, pilates, zumba ve core board dersleri, ayrı çalışma saatleri. İlk antrenman ücretsiz.",
  },
  trainers: {
    path: "/antrenorler",
    title: "Antrenörlerimiz",
    description:
      "Beykoz Ortaçeşme'deki Meydan Sport Club antrenör kadrosuyla tanışın: Yunus Hoca liderliğinde, her seviyeye birebir destek ve kişisel antrenman.",
  },
  membership: {
    path: "/uyelik",
    title: "Üyelik Ücretleri",
    description:
      "Beykoz spor salonu üyelik ücretleri: Meydan Sport Club'ın standart ve öğrenci fiyatları, aylık, 3, 6 ve 12 aylık seçenekler ile ek ücretler.",
  },
  schedule: {
    path: "/ders-programi",
    title: "Ders Programı",
    description:
      "Beykoz'da kadınlara özel grup dersleri: Meydan Sport Club kadınlar salonunun haftalık pilates, zumba ve core board programı, gün ve saatleriyle.",
  },
  faq: {
    path: "/sss",
    title: "Sıkça Sorulan Sorular",
    description:
      "Beykoz Ortaçeşme'deki Meydan Sport Club hakkında merak edilenler: konum, çalışma saatleri, ücretsiz deneme, kadınlar salonu, otopark ve özel ders.",
  },
  contact: {
    path: "/iletisim",
    title: "İletişim",
    description:
      "Meydan Sport Club'a ulaşın: Beykoz Ortaçeşme'deki adresimiz ve yol tarifi, telefon ve WhatsApp hattımız, karma ve kadınlar salonu çalışma saatleri.",
  },
} satisfies Record<string, PageInfo>;

export const sitePages: PageInfo[] = Object.values(pages);

/**
 * WhatsApp/Instagram/Facebook'ta link paylaşılınca görünen görsel (1200×630).
 * Dosya tabanlı `app/opengraph-image` yerine açıkça verilir: bir alt sayfa
 * kendi `openGraph`'ını tanımlayınca kökteki dosya görseli düşüyordu.
 */
export const shareImage = {
  url: "/images/og/meydan-sport-club.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Kendine Meydan Oku. Beykoz Ortaçeşme'de karma ve kadınlara özel spor salonu.`,
};

/**
 * Open Graph alanları sayfa sayfa **sığ** birleşir (bir sayfa `openGraph`
 * verirse layout'unkini tamamen ezer). Ortak alanlar — görsel dahil — bu
 * yüzden her seferinde yeniden eklenir.
 */
export const sharedOpenGraph = {
  type: "website" as const,
  locale: "tr_TR",
  siteName: siteConfig.name,
  images: [shareImage],
};

/** Bir sayfanın title/description/canonical/Open Graph metadata'sını üretir. */
export function pageMetadata(page: PageInfo): Metadata {
  const isHome = page.path === "/";
  const fullTitle = isHome ? page.title : `${page.title} · ${siteConfig.name}`;

  return {
    title: isHome ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      ...sharedOpenGraph,
      title: fullTitle,
      description: page.description,
      url: page.path,
    },
  };
}
