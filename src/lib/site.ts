export const siteConfig = {
  name: "Meydan Spor Kulübü",
  shortName: "Meydan",
  description:
    "Meydan Spor Kulübü — modern ekipman, uzman antrenörler ve herkese uygun üyelik paketleriyle spor salonunuz.",
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
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Antrenörler", href: "/antrenorler" },
  { label: "Üyelik Paketleri", href: "/uyelik" },
  { label: "Ders Programı", href: "/ders-programi" },
  { label: "İletişim", href: "/iletisim" },
];
