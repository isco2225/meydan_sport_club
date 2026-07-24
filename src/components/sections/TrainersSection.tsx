import Section from "./Section";
import { trainers } from "@/data/trainers";

export default function TrainersSection() {
  return (
    <Section id="antrenorler" muted>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Antrenörler
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Alanında uzman, sertifikalı antrenör kadromuzla tanışın.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((trainer) => (
          <article
            key={trainer.id}
            className="flex flex-col rounded-2xl border border-black/10 bg-background p-6 dark:border-white/10"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10 text-xl font-bold">
              {trainer.name.charAt(0)}
            </div>
            <h3 className="text-lg font-semibold">{trainer.name}</h3>
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
      </div>
    </Section>
  );
}
