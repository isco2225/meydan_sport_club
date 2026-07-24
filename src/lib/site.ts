export const siteConfig = {
  name: "Meydan Sport Club",
  shortName: "Meydan",
  description:
    "Meydan Sport Club — modern ekipman, uzman antrenörler ve herkese uygun üyelik paketleriyle spor salonunuz.",
  phone: "+90 (212) 000 00 00",
  email: "info@meydansporkulubu.com",
  address: "Meydan Mah. Spor Cad. No: 1, İstanbul",
  workingHours: "Hafta içi 06:00 – 23:00 · Hafta sonu 08:00 – 22:00",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
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
  { label: "Antrenörler", sectionId: "antrenorler", href: "/#antrenorler" },
  { label: "Üyelik Paketleri", sectionId: "uyelik", href: "/#uyelik" },
  { label: "Ders Programı", sectionId: "ders-programi", href: "/#ders-programi" },
  { label: "İletişim", sectionId: "iletisim", href: "/#iletisim" },
];
