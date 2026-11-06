export type Trainer = {
  id: string;
  name: string;
  title: string;
  /**
   * `public/` altındaki portre fotoğrafın kök yolu. Dosya adı `id` ile eşleşir
   * (bkz. `public/images/README.md`). Fotoğrafı olmayan antrenörde kart adın
   * baş harfini gösterir, bu yüzden alan isteğe bağlıdır.
   */
  photo?: string;
};

export const trainers: Trainer[] = [
  {
    id: "yunus-hoca",
    name: "Yunus Hoca",
    title: "Salon Sahibi & Antrenör",
    photo: "/images/antrenorler/yunus-hoca.jpg",
  },
  {
    id: "ali-sirganci",
    name: "Ali Sırgancı",
    title: "Antrenör",
    photo: "/images/antrenorler/ali-sirganci.jpg",
  },
  // Fotoğrafları henüz yok (6 Kas 2026); kart baş harfi gösterir. Fotoğraf
  // gelince `public/images/antrenorler/<id>.jpg` olarak ekle ve `photo` ver.
  {
    id: "emre-demir",
    name: "Emre Demir",
    title: "Antrenör",
  },
  {
    id: "umut-cevik",
    name: "Umut Çevik",
    title: "Antrenör",
  },
];
