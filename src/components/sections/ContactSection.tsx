import Section from "./Section";
import ContactDetails from "@/components/ContactDetails";
import ContactCta from "@/components/ContactCta";
import SectionHeader from "@/components/SectionHeader";

export default function ContactSection() {
  return (
    <Section id="iletisim">
      <SectionHeader
        eyebrow="Bize ulaşın"
        title="İletişim"
        description="Sorularınız için bize ulaşın veya ücretsiz deneme antrenmanı için randevu alın."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <ContactDetails headingLevel={3} />
        <ContactCta headingLevel={3} />
      </div>
    </Section>
  );
}
