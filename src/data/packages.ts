export type MembershipPackage = {
  id: string;
  name: string;
  price: number;
  period: string;
  featured?: boolean;
  features: string[];
};

export const packages: MembershipPackage[] = [
  {
    id: "baslangic",
    name: "Başlangıç",
    price: 499,
    period: "ay",
    features: [
      "Fitness salonu erişimi",
      "Çalışma saatleri boyunca giriş",
      "Ücretsiz tanışma antrenmanı",
    ],
  },
  {
    id: "standart",
    name: "Standart",
    price: 799,
    period: "ay",
    featured: true,
    features: [
      "Fitness salonu erişimi",
      "Tüm grup dersleri",
      "Kişisel antrenman planı",
      "Beslenme danışmanlığı",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 1199,
    period: "ay",
    features: [
      "Sınırsız salon ve ders erişimi",
      "Haftalık birebir PT seansı",
      "Sauna ve dinlenme alanı",
      "Öncelikli randevu",
    ],
  },
];
