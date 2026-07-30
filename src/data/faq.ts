import { summarizeHours, workingHours } from "@/data/hours";

export type FaqItem = {
  id: string;
  question: string;
  /** Düz metin tutulur: hem <details> içeriği hem FAQPage JSON-LD'si buradan türetilir. */
  answer: string;
  /** Cevabın altında gösterilen isteğe bağlı yönlendirme bağlantısı (JSON-LD'ye girmez). */
  link?: { label: string; href: string };
};

export const faqItems: FaqItem[] = [
  {
    id: "calisma-saatleri",
    question: "Çalışma saatleriniz nedir?",
    answer: `Salonumuz karma ve kadınlara özel iki ayrı program uygular. ${workingHours
      .map(summarizeHours)
      .join(". ")}. Resmî tatillerdeki özel saatler sosyal medya hesaplarımızdan duyurulur.`,
    link: { label: "Detaylı görün", href: "/#iletisim" },
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
      "Evet, üyeliğinizi belli bir süre dondurabilirsiniz. Talebinizi resepsiyona iletmeniz yeterlidir; dondurulan süre üyeliğinizin bitişine eklenir.",
  },
  {
    id: "kadinlar-salonu",
    question: "Kadınlara özel bölümünüz var mı?",
    answer:
      "Sadece kadınların girebildiği, ayrı bir alanda hizmet veren kadınlar salonumuz var. Grup ders programımız (pilates, zumba, core board) yalnızca bu salonda düzenlenir.",
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
      "Hayır, üyelik için yaş sınırımız yok. Sporun her yaşa iyi geldiğine inanıyoruz; hedefiniz ne olursa olsun antrenörlerimiz size uygun bir programla yanınızda.",
  },
];
