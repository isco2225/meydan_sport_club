import { siteConfig } from "@/lib/site";

export type FaqItem = {
  id: string;
  question: string;
  /** Düz metin tutulur: hem <details> içeriği hem FAQPage JSON-LD'si buradan türetilir. */
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "calisma-saatleri",
    question: "Çalışma saatleriniz nedir?",
    answer: `Salonumuz ${siteConfig.workingHours} arasında hizmet vermektedir. Resmî tatillerdeki özel saatler sosyal medya hesaplarımızdan duyurulur.`,
  },
  {
    id: "deneme-antrenmani",
    question: "Üye olmadan önce deneme antrenmanı yapabilir miyim?",
    answer:
      "Evet. Ücretsiz bir günlük deneme antrenmanı için resepsiyondan veya telefonla randevu alabilirsiniz. Deneme gününde antrenörlerimiz salonu gezdirir ve hedeflerinize uygun üyelik seçeneğini önerir.",
  },
  {
    id: "uyelik-dondurma",
    question: "Üyeliğimi dondurabilir miyim?",
    answer:
      "Evet. Tüm üyeliklerde yılda toplam 30 güne kadar dondurma hakkı bulunur. Dondurma talebinizi resepsiyona iletmeniz yeterlidir; süre üyeliğinizin bitişine eklenir.",
  },
  {
    id: "kadinlar-salonu",
    question: "Kadınlara özel bölümünüz var mı?",
    answer:
      "Evet. Kadınlar salonumuz ayrı bir alanda hizmet verir ve grup ders programı (pilates, zumba, core board) yalnızca kadınlar salonunda düzenlenir.",
  },
  {
    id: "ozel-ders",
    question: "Kişisel antrenman (özel ders) hizmeti veriyor musunuz?",
    answer:
      "Evet. Uzman antrenörlerimizden birebir ders alabilirsiniz. Seans planlaması ve ücretlendirme için resepsiyondan bilgi alabilir veya iletişim formundan bize yazabilirsiniz.",
  },
  {
    id: "yas-siniri",
    question: "Üyelik için yaş sınırı var mı?",
    answer:
      "16 yaşını doldurmuş herkes üye olabilir. 16-18 yaş arası üyelerimiz için veli onayı gereklidir.",
  },
];
