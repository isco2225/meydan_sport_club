import Section from "./Section";
import MembershipPricing from "@/components/MembershipPricing";

export default function MembershipSection() {
  return (
    <Section id="uyelik">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Üyelik Ücretleri
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Standart ve öğrenci fiyatlarımızı aşağıda görebilirsiniz.
      </p>

      <div className="mt-10">
        <MembershipPricing />
      </div>
    </Section>
  );
}
