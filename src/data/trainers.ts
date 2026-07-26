export type Trainer = {
  id: string;
  name: string;
  title: string;
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
    bio: "Spor ve fitness alanında yılların deneyime sahip, üyelerimize değer katmak için hazır.",
    photo: "/images/antrenorler/ali-sirganci.jpg",
  },
  {
    id: "ayse-yilmaz",
    name: "Ayşe Yılmaz",
    title: "Baş Antrenör",
    bio: "10 yılı aşkın deneyimiyle kişiye özel antrenman programları hazırlar.",
  },
  {
    id: "mehmet-demir",
    name: "Mehmet Demir",
    title: "Fitness Antrenörü",
    bio: "Sporcu geçmişiyle üyelerin hedeflerine güvenle ulaşmasına yardımcı olur.",
  },
  {
    id: "zeynep-kaya",
    name: "Zeynep Kaya",
    title: "Yoga & Pilates Eğitmeni",
    bio: "Zihin ve beden dengesine odaklanan dersleriyle tanınır.",
  },
  {
    id: "can-ozturk",
    name: "Can Öztürk",
    title: "Crossfit Antrenörü",
    bio: "Yüksek tempolu grup dersleriyle dayanıklılığı artırmayı hedefler.",
  },
];
