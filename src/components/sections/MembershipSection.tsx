import Section from "./Section";
import MembershipPricing from "@/components/MembershipPricing";
import SectionHeader from "@/components/SectionHeader";
import TrialCallout from "@/components/TrialCallout";

export default function MembershipSection() {
  return (
    <Section id="uyelik">
      <SectionHeader
        eyebrow="Fiyatlar"
        title="Üyelik Ücretleri"
        description="Standart ve öğrenci fiyatlarımız. Üyelik süresi uzadıkça aylık maliyet düşer."
      />

      <div className="mt-12">
        <MembershipPricing />
      </div>

      <div className="mt-10">
        <TrialCallout />
      </div>
    </Section>
  );
}
