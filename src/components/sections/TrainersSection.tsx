import Section from "./Section";
import Icon from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import TrainerCard from "@/components/TrainerCard";
import { trainers } from "@/data/trainers";
import { whatsappHref } from "@/lib/links";

const PERSONAL_TRAINING_MESSAGE =
  "Merhaba, kişisel antrenman (özel ders) hakkında bilgi almak istiyorum.";

export default function TrainersSection() {
  return (
    <Section id="antrenorler" muted>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Kadromuz"
            title="Antrenörlerimiz"
            description="Alanında uzman, sertifikalı antrenör kadromuzla tanışın. Spora yeni başlıyor olun ya da yıllardır antrenman yapın; programınızı birlikte kuralım."
          />
          <a
            href={whatsappHref(PERSONAL_TRAINING_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
          >
            Kişisel antrenman için bilgi alın
            <Icon name="arrow-right" className="size-4" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {trainers.map((trainer) => (
            // Bölüm başlığı h2 olduğu için kart başlıkları h3.
            <TrainerCard key={trainer.id} trainer={trainer} headingLevel={3} />
          ))}
        </div>
      </div>
    </Section>
  );
}
