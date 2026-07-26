export type Trainer = {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  /**
   * `public/` altındaki portre fotoğrafın kök yolu. Dosya adı `id` ile eşleşir
   * (bkz. `public/images/README.md`). Fotoğrafı olmayan antrenörde kart adın
   * baş harfini gösterir, bu yüzden alan isteğe bağlıdır.
   */
  photo?: string;
};

export const trainers: Trainer[] = [
  {
    id: "ali-sirganci",
    name: "Ali Sırgancı",
    title: "Antrenör",
    specialties: [],
    bio: "Geçmişte beraber çalıştığımız antrenörümüz Ali hoca, tekrar bizimle çalışmaya başlamıştır.",
    photo: "/images/antrenorler/ali-sirganci.jpg",
  },
  {
    id: "ayse-yilmaz",
    name: "Ayşe Yılmaz",
    title: "Baş Antrenör",
    specialties: ["Fonksiyonel Antrenman", "Kuvvet"],
    bio: "10 yılı aşkın deneyimiyle kişiye özel antrenman programları hazırlar.",
  },
  {
    id: "mehmet-demir",
    name: "Mehmet Demir",
    title: "Fitness Antrenörü",
    specialties: ["Vücut Geliştirme", "Beslenme Koçluğu"],
    bio: "Sporcu geçmişiyle üyelerin hedeflerine güvenle ulaşmasına yardımcı olur.",
  },
  {
    id: "zeynep-kaya",
    name: "Zeynep Kaya",
    title: "Yoga & Pilates Eğitmeni",
    specialties: ["Yoga", "Pilates", "Esneklik"],
    bio: "Zihin ve beden dengesine odaklanan dersleriyle tanınır.",
  },
  {
    id: "can-ozturk",
    name: "Can Öztürk",
    title: "Crossfit Antrenörü",
    specialties: ["Crossfit", "HIIT"],
    bio: "Yüksek tempolu grup dersleriyle dayanıklılığı artırmayı hedefler.",
  },
];
