import Section from "./Section";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/structured-data";

/**
 * FAQPage JSON-LD'si SSS verisinden türetilir (bkz. `lib/structured-data.ts`).
 * Yalnızca ana sayfada basılır: Google, aynı SSS birden çok sayfada
 * tekrarlanıyorsa işaretlemenin sitede tek bir kopyada olmasını ister —
 * `/sss` sayfası listeyi gösterir ama JSON-LD basmaz.
 */
export default function FaqSection() {
  return (
    <Section id="sss" muted>
      <JsonLd data={faqPageJsonLd()} />

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
