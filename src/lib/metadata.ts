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
    title: `${siteConfig.name} · Beykoz Spor Salonu`,
    description: siteConfig.description,
  },
  about: {
    path: "/hakkimizda",
    title: "Hakkımızda",
    description:
      "3. kademe kıdemli antrenör Yunus Hoca'nın kurduğu Meydan Sport Club'ı tanıyın: karma ve kadınlara özel salonuyla Beykoz'un topluluk odaklı spor kulübü.",
  },
  trainers: {
    path: "/antrenorler",
    title: "Antrenörlerimiz",
    description:
      "Meydan Sport Club antrenör kadrosuyla tanışın: salon sahibi Yunus Hoca liderliğinde, her seviyeye birebir destek veren deneyimli antrenörler.",
  },
  membership: {
    path: "/uyelik",
    title: "Üyelik Ücretleri",
    description:
      "Meydan Sport Club üyelik ücretleri: standart ve öğrenci fiyatları, aylık ve dönemsel seçenekler ile ek ücretler.",
  },
  schedule: {
    path: "/ders-programi",
    title: "Ders Programı",
    description:
      "Kadınlar salonuna özel haftalık grup ders programı: pilates, zumba ve core board derslerinin gün ve saatleri.",
  },
  faq: {
    path: "/sss",
    title: "Sıkça Sorulan Sorular",
    description:
      "Çalışma saatleri, ücretsiz deneme antrenmanı, üyelik dondurma, kadınlar salonu ve özel ders hakkında merak edilenler.",
  },
  contact: {
    path: "/iletisim",
    title: "İletişim",
    description:
      "Meydan Sport Club'a ulaşın: Ortaçeşme, Beykoz adresimiz, telefon ve WhatsApp hattımız, çalışma saatlerimiz ve iletişim formu.",
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
