import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import PageHeader from "@/components/PageHeader";
import { pageMetadata, pages } from "@/lib/metadata";

export const metadata = pageMetadata(pages.faq);

/**
 * SSS sayfası. FAQPage JSON-LD'si bilinçli olarak yalnızca ana sayfadadır
 * (bkz. `FaqSection`); burada yalnızca liste gösterilir.
 */
export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Sıkça Sorulan Sorular"
        description="Aklınıza takılanların cevabı burada yoksa bize telefonla, WhatsApp'tan veya iletişim formundan ulaşabilirsiniz."
      />

      <section className="py-16">
        <Container className="max-w-3xl">
          <FaqList />
        </Container>
      </section>
    </>
  );
}
