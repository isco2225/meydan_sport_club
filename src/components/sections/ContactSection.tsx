import Section from "./Section";
import ContactDetails from "@/components/ContactDetails";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <Section id="iletisim">
      <h2 className="font-display text-3xl uppercase sm:text-4xl">İletişim</h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Sorularınız için bize ulaşın veya ücretsiz deneme antrenmanı için
        randevu alın.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <ContactDetails headingLevel={3} />
        <ContactForm />
      </div>
    </Section>
  );
}
