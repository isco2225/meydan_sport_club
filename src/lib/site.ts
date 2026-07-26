export const siteConfig = {
  name: "Meydan Sport Club",
  shortName: "Meydan",
  description:
    "Meydan Sport Club — modern ekipman, uzman antrenörler ve uygun üyelik ücretleriyle spor salonunuz.",
  phone: "+90 532 228 26 22",
  email: "info@meydansportclub.com",
  address: "Meydan Sport Club, Ortaçeşme, Çayır Cd. No:224/2, 34825 Beykoz/İstanbul",
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
 * id'ler `/hakkimizda` gibi ayrı sayfalarda da doğrudan erişilebilir kalır.
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
