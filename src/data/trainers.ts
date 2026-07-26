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
];
