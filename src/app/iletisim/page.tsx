import Container from "@/components/Container";
import ContactDetails from "@/components/ContactDetails";
import ContactCta from "@/components/ContactCta";
import PageHeader from "@/components/PageHeader";
import { pageMetadata, pages } from "@/lib/metadata";

export const metadata = pageMetadata(pages.contact);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="İletişim"
        description="Sorularınız için bize ulaşın veya ücretsiz deneme antrenmanı için randevu alın."
      />

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <ContactDetails headingLevel={2} />
          <ContactCta headingLevel={2} />
        </Container>
      </section>
    </>
  );
}
