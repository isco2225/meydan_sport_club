import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { trainers } from "@/data/trainers";

export const metadata: Metadata = {
  title: "Antrenörler",
};

export default function TrainersPage() {
  return (
    <>
      <PageHeader
        title="Antrenörler"
        description="Alanında uzman, sertifikalı antrenör kadromuzla tanışın."
      />

      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <article
              key={trainer.id}
              className="flex flex-col rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10 text-xl font-bold">
                {trainer.name.charAt(0)}
              </div>
              <h2 className="text-lg font-semibold">{trainer.name}</h2>
              <p className="text-sm text-foreground/60">{trainer.title}</p>
              <p className="mt-3 flex-1 text-sm text-foreground/70">
                {trainer.bio}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {trainer.specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
