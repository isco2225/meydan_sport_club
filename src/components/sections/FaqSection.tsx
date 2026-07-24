import Section from "./Section";
import { faqItems } from "@/data/faq";

/**
 * FAQPage yapılandırılmış verisi (JSON-LD) SSS verisinden türetilir; böylece
 * görünen içerik ile arama motoruna bildirilen içerik hiç ayrışmaz.
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

/**
 * Sıkça sorulan sorular. Açılır/kapanır davranış yerleşik <details>/<summary>
 * ile sağlanır: JavaScript gerektirmez, bu yüzden server component kalır.
 */
export default function FaqSection() {
  return (
    <Section id="sss" muted>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Sıkça Sorulan Sorular
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Aklınıza takılanların cevabı burada yoksa bize iletişim bölümünden
        ulaşabilirsiniz.
      </p>

      <div className="mt-8 space-y-4">
        {faqItems.map((item) => (
          <details
            key={item.id}
            className="group rounded-2xl border border-black/10 bg-background p-6 dark:border-white/10"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-foreground/40 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
