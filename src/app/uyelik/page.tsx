import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import MembershipPricing from "@/components/MembershipPricing";

export const metadata: Metadata = {
  title: "Üyelik Ücretleri",
  description:
    "Meydan Sport Club üyelik ücretleri: standart ve öğrenci fiyatları, aylık ve dönemsel seçenekler ile ek ücretler.",
};

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
