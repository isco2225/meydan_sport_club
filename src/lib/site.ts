export type PostalAddress = {
  /** Mahalle (semt); hero'daki konum etiketinde de kullanılır. */
  neighborhood: string;
  /** Cadde ve kapı numarası. */
  street: string;
  postalCode: string;
  /** İlçe. */
  district: string;
  /** İl. */
  city: string;
  /** ISO 3166-1 alpha-2 ülke kodu (JSON-LD için). */
  country: string;
};

export const siteConfig = {
  name: "Meydan Sport Club",
  shortName: "Meydan",
  /**
   * Kanonik (üretim) adres. `metadataBase`, canonical bağlantılar, sitemap,
   * robots ve JSON-LD buradan türetilir. Alan adı kökü (`meydansportclub.com`)
   * Vercel'de `www`'ya yönlendirildiği için kanonik olan `www`'dur.
   */
  url: "https://www.meydansportclub.com",
  description:
    "Beykoz Ortaçeşme'de karma ve kadınlara özel salon, pilates, zumba ve core board grup dersleri ve uygun üyelik ücretleri. Ücretsiz deneme antrenmanı için bize ulaşın.",
  phone: "+90 532 228 26 22",
  /**
   * WhatsApp hattı. Varsayım: telefonla aynı numara (cep hattı). Farklıysa
   * yalnızca burayı değiştir; tüm WhatsApp bağlantıları buradan üretilir.
   */
  whatsapp: "+90 532 228 26 22",
  email: "info@meydansportclub.com",
  address: {
    neighborhood: "Ortaçeşme",
    street: "Çayır Cd. No:224/2",
    postalCode: "34825",
    district: "Beykoz",
    city: "İstanbul",
    country: "TR",
  } satisfies PostalAddress,
  social: {
    instagram: "https://www.instagram.com/meydansportclub/",
    youtube: "https://www.youtube.com/channel/UCN2zmBXM_rdVnDJCZFOVXiw",
  },
};

export type NavItem = {
  label: string;
  /** Ana sayfadaki bölümün id'si — hem çapa bağlantısı hem scroll-spy için kullanılır. */
  sectionId: string;
  href: string;
};

/**
 * Menü öğeleri. Site tek sayfa (one-page) olarak çalışır: her bağlantı ana
 * sayfadaki ilgili bölüme (`/#sectionId`) yumuşak kaydırma ile gider. Aynı
 * içerik `/hakkimizda` gibi ayrı rotalarda da sunulur (bkz. `lib/metadata.ts`).
 */
export const navItems: NavItem[] = [
  { label: "Ana Sayfa", sectionId: "ust", href: "/#ust" },
  { label: "Hakkımızda", sectionId: "hakkimizda", href: "/#hakkimizda" },
  { label: "Antrenörlerimiz", sectionId: "antrenorler", href: "/#antrenorler" },
  { label: "Üyelik Ücretleri", sectionId: "uyelik", href: "/#uyelik" },
  { label: "Ders Programı", sectionId: "ders-programi", href: "/#ders-programi" },
  { label: "SSS", sectionId: "sss", href: "/#sss" },
  { label: "İletişim", sectionId: "iletisim", href: "/#iletisim" },
];
