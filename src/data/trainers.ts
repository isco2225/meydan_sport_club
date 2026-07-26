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
    id: "yunus-hoca",
    name: "Yunus Hoca",
    title: "Salon Sahibi & Antrenör",
    bio: "Salonumuzun sahibi. Yılların deneyimiyle üyelerimize yol gösteren iyi bir hocadır.",
    photo: "/images/antrenorler/yunus-hoca.jpg",
  },
  {
    id: "ali-sirganci",
    name: "Ali Sırgancı",
    title: "Antrenör",
    bio: "Spor ve fitness alanında yılların deneyime sahip, üyelerimize değer katmak için hazır.",
    photo: "/images/antrenorler/ali-sirganci.jpg",
  },
];
