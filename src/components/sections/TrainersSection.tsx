import Section from "./Section";
import TrainerCard from "@/components/TrainerCard";
import { trainers } from "@/data/trainers";

export default function TrainersSection() {
  return (
    <Section id="antrenorler" muted>
      <h2 className="font-display text-3xl uppercase sm:text-4xl">
        Antrenörlerimiz
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Alanında uzman, sertifikalı antrenör kadromuzla tanışın.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((trainer) => (
          // Bölüm başlığı h2 olduğu için kart başlıkları h3.
          <TrainerCard key={trainer.id} trainer={trainer} headingLevel={3} />
        ))}
      </div>
    </Section>
  );
}
