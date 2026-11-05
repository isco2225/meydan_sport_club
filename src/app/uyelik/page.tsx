import Container from "@/components/Container";
import MembershipPricing from "@/components/MembershipPricing";
import PageHeader from "@/components/PageHeader";
import TrialCallout from "@/components/TrialCallout";
import { pageMetadata, pages } from "@/lib/metadata";

export const metadata = pageMetadata(pages.membership);

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        title="Üyelik Ücretleri"
        description="Standart ve öğrenci fiyatlarımızı inceleyin. Üyelik süresi uzadıkça aylık maliyet düşer."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <MembershipPricing />
          <div className="mt-10">
            <TrialCallout />
          </div>
        </Container>
      </section>
    </>
  );
}
