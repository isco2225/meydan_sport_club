import Section from "./Section";
import FaqList from "@/components/FaqList";
import { faqItems } from "@/data/faq";

/**
 * FAQPage yapılandırılmış verisi (JSON-LD) SSS verisinden türetilir; böylece
 * görünen içerik ile arama motoruna bildirilen içerik hiç ayrışmaz.
 *
 * Yalnızca ana sayfada basılır: Google, aynı SSS birden çok sayfada
 * tekrarlanıyorsa işaretlemenin sitede tek bir kopyada olmasını ister —
 * `/sss` sayfası listeyi gösterir ama JSON-LD basmaz.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqSection() {
  return (
    <Section id="sss" muted>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <h2 className="font-display text-3xl uppercase sm:text-4xl">
        Sıkça Sorulan Sorular
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Aklınıza takılanların cevabı burada yoksa bize iletişim bölümünden
        ulaşabilirsiniz.
      </p>

      <div className="mt-8">
        <FaqList />
      </div>
    </Section>
  );
}
