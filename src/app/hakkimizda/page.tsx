import AboutContent from "@/components/AboutContent";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { aboutIntro } from "@/data/about";
import { pageMetadata, pages } from "@/lib/metadata";

export const metadata = pageMetadata(pages.about);

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Hakkımızda" description={aboutIntro} />

      <section className="py-16 sm:py-20">
        <Container>
          <AboutContent headingLevel={2} />
        </Container>
      </section>
    </>
  );
}
