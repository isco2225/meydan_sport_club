export type AboutValue = {
  title: string;
  description: string;
};

export type AboutHighlight = {
  title: string;
  description: string;
};

/** Hem ana sayfadaki bölümün hem hakkımızda sayfasının ortak giriş cümlesi. */
export const aboutIntro =
  "Meydan Sport Club olarak sporu herkes için erişilebilir kılıyoruz; kapımız her yaştan, her seviyeden herkese açık.";

export const aboutValues: AboutValue[] = [
  {
    title: "Misyonumuz",
    description:
      "Her yaştan ve seviyeden üyeye sağlıklı bir yaşam tarzı kazandırmak.",
  },
  {
    title: "Vizyonumuz",
    description:
      "Bölgenin en çok tercih edilen, topluluk odaklı spor kulübü olmak.",
  },
  {
    title: "Değerlerimiz",
    description:
      "Disiplin, samimiyet ve sürekli gelişim ilkelerimizin temelini oluşturur.",
  },
];

/** Kısa ve samimi tutulur; kurumsal dil kullanılmaz. */
export const aboutStory: string[] = [
  "Meydan Sport Club, 3. kademe kıdemli antrenör Yunus Hoca'nın öncülüğünde kuruldu. Bizim için burası sadece ağırlık kaldırılan bir yer değil; birbirini tanıyan, birbirine destek olan bir topluluk.",
  "Karma salonumuzun yanında sadece kadınların girebildiği ayrı bir kadınlar salonumuz var; pilates, zumba ve core board gibi grup derslerimiz de burada yapılıyor. İster spora yeni başlıyor olun, ister yıllardır antrenman yapın — size uygun bir program mutlaka var.",
];

export const aboutHighlights: AboutHighlight[] = [
  {
    title: "Kadınlara Özel Salon",
    description:
      "Sadece kadınların girebildiği, ayrı bir alanda hizmet veren salonumuz.",
  },
  {
    title: "Grup Dersleri",
    description: "Pilates, zumba ve core board dersleri antrenör eşliğinde.",
  },
  {
    title: "Belgeli Antrenörler",
    description: "3. kademe kıdemli antrenör liderliğinde deneyimli bir kadro.",
  },
  {
    title: "Temiz ve Düzenli Salon",
    description:
      "Hijyen ve salon kurallarımız sayesinde herkes için rahat bir ortam.",
  },
];
