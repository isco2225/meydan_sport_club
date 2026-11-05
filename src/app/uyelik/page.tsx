import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { pageMetadata, pages } from "@/lib/metadata";
import MembershipPricing from "@/components/MembershipPricing";

export const metadata = pageMetadata(pages.membership);

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        title="Üyelik Ücretleri"
        description="Standart ve öğrenci fiyatlarımızı inceleyin."
      />

      <section className="py-16">
        <Container className="max-w-3xl">
          <MembershipPricing />
        </Container>
      </section>
    </>
  );
}
