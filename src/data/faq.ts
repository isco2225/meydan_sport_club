import { summarizeHours, workingHours } from "@/data/hours";
import { formatAddress, mapsHref } from "@/lib/links";
import { pages } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export type FaqItem = {
  id: string;
  question: string;
  /** Düz metin tutulur: hem <details> içeriği hem FAQPage JSON-LD'si buradan türetilir. */
  answer: string;
  /**
   * Cevabın altında gösterilen isteğe bağlı yönlendirme bağlantısı (JSON-LD'ye
   * girmez). Dış bağlantılar (`http…`, ör. harita) yeni sekmede açılır.
   */
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
    id: "konum",
    question: "Salonunuz nerede?",
    answer: `${siteConfig.address.district} ${siteConfig.address.neighborhood}'deyiz: ${formatAddress()}. Google Haritalar'da "${siteConfig.name}" diye aratarak yol tarifi alabilirsiniz.`,
    link: { label: "Yol tarifi al", href: mapsHref() },
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
    question: "Kadınlara özel spor salonunuz var mı?",
    answer:
      "Evet. Karma salonumuzdan ayrı, tamamen kadınlara özel bir kadınlar salonumuz var; salonu yalnızca kadın üyeler kullanır. Grup ders programımız (pilates, zumba, core board) yalnızca bu salonda düzenlenir.",
    link: { label: "Kadınlar salonunu tanıyın", href: pages.womens.path },
  },
  {
    id: "kadin-antrenor",
    question: "Kadınlar salonunda kadın antrenör var mı?",
    answer:
      "Evet. Kadınlar salonumuzda kadın antrenörlerimiz hizmet verir; antrenman programınızı ve grup derslerini onlarla birlikte planlarsınız.",
  },
  {
    id: "otopark",
    question: "Otoparkınız var mı?",
    answer: "Hayır, salonumuza ait bir otopark bulunmuyor.",
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
