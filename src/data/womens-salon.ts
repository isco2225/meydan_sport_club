import { faqItems, type FaqItem } from "@/data/faq";
import { pages } from "@/lib/metadata";

/**
 * `/kadinlar-salonu` sayfasının içeriği. Salon sahibinden (6 Kas 2026):
 * salon tamamen kadınlara özeldir ve kadın antrenörler hizmet verir.
 * Kadınlar salonuna ait fotoğraf henüz yok; sayfa görselsiz kurulur.
 */

export type WomensSalonHighlight = {
  title: string;
  description: string;
};

/** Sayfa girişi (PageHeader açıklaması). */
export const womensSalonIntro =
  "Tamamen kadınlara özel salonumuzda kadın antrenörler eşliğinde rahatça antrenman yapın; pilates, zumba ve core board derslerine katılın.";

export const womensSalonHighlights: WomensSalonHighlight[] = [
  {
    title: "Tamamen Kadınlara Özel",
    description:
      "Karma salondan ayrı bir alanda hizmet verir; salonu yalnızca kadın üyeler kullanır.",
  },
  {
    title: "Kadın Antrenörler",
    description:
      "Kadın antrenörlerimiz programınızı sizinle birlikte planlar ve antrenmanlarınızda yanınızdadır.",
  },
  {
    title: "Grup Dersleri",
    description:
      "Pilates, zumba ve core board dersleri yalnızca bu salonda, antrenör eşliğinde yapılır.",
  },
  {
    title: "Ücretsiz Deneme",
    description:
      "İlk antrenmanınız ücretsiz: salonu gezin, antrenörlerimizle tanışın, size uygun üyeliği seçin.",
  },
];

/** Sayfada gösterilen SSS maddeleri, bu sırayla. */
export const womensSalonFaqIds = [
  "kadinlar-salonu",
  "kadin-antrenor",
  "deneme-antrenmani",
  "konum",
] as const;

/**
 * SSS'nin kadınlar salonuyla ilgili alt kümesi (metin `faq.ts`'te tek
 * kaynakta). Bu sayfanın kendisine giden bağlantı burada gösterilmez.
 */
export const womensSalonFaq: FaqItem[] = womensSalonFaqIds.map((id) => {
  const item = faqItems.find((f) => f.id === id);
  if (!item) throw new Error(`SSS maddesi tanımlı değil: ${id}`);
  if (item.link?.href !== pages.womens.path) return item;
  return { ...item, link: undefined };
});
