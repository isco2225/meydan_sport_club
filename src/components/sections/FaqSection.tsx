import Section from "./Section";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import SectionHeader from "@/components/SectionHeader";
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

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Merak edilenler"
          title="Sıkça Sorulan Sorular"
          description="Aklınıza takılanların cevabı burada yoksa bize iletişim bölümünden ulaşabilirsiniz."
          className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start"
        />
        <FaqList />
      </div>
    </Section>
  );
}
