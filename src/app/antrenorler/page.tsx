import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import TrainerCard from "@/components/TrainerCard";
import { trainers } from "@/data/trainers";

export const metadata: Metadata = {
  title: "Antrenörlerimiz",
};

export default function TrainersPage() {
  return (
    <>
      <PageHeader
        title="Antrenörlerimiz"
        description="Alanında uzman, sertifikalı antrenör kadromuzla tanışın."
      />

      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            // Sayfanın tek h1'i PageHeader'da; kart başlıkları h2.
            <TrainerCard key={trainer.id} trainer={trainer} headingLevel={2} />
          ))}
        </Container>
      </section>
    </>
  );
}
