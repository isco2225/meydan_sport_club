import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { pageMetadata, pages } from "@/lib/metadata";
import TrainerCard from "@/components/TrainerCard";
import { trainers } from "@/data/trainers";

export const metadata = pageMetadata(pages.trainers);

export default function TrainersPage() {
  return (
    <>
      <PageHeader
        title="Antrenörlerimiz"
        description="Alanında uzman, sertifikalı antrenör kadromuzla tanışın."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
            {trainers.map((trainer) => (
              // Sayfanın tek h1'i PageHeader'da; kart başlıkları h2.
              <TrainerCard key={trainer.id} trainer={trainer} headingLevel={2} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
