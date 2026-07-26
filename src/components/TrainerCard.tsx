import Image from "next/image";
import type { Trainer } from "@/data/trainers";

type TrainerCardProps = {
  trainer: Trainer;
  /**
   * Antrenör adının başlık düzeyi. Ana sayfada bölüm başlığı `h2` olduğu için
   * kartlar `h3`; `/antrenorler` sayfasında `h1` PageHeader'da olduğu için
   * kartlar `h2` olur. Başlık hiyerarşisi bozulmasın diye çağıran belirler.
   */
  headingLevel: 2 | 3;
};

/**
 * Tek bir antrenörü gösteren kart. Ana sayfadaki `TrainersSection` ile
 * `/antrenorler` sayfası aynı kartı kullanır; kart düzeni tek yerde durur.
 *
 * Fotoğrafı olan antrenörde portre görsel kartın üstünü kaplar, olmayanda aynı
 * kutuda adın baş harfi gösterilir — böylece grid'deki kart yüksekliği
 * fotoğrafın varlığına göre değişmez.
 */
export default function TrainerCard({
  trainer,
  headingLevel,
}: TrainerCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-background dark:border-white/10">
      <div className="relative aspect-4/5 w-full bg-foreground/10">
        {trainer.photo ? (
          <Image
            src={trainer.photo}
            alt={`${trainer.name} — ${trainer.title}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full items-center justify-center text-5xl font-bold text-foreground/40"
          >
            {trainer.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-lg font-semibold">{trainer.name}</Heading>
        <p className="text-sm text-foreground/60">{trainer.title}</p>
        <p className="mt-3 flex-1 text-sm text-foreground/70">{trainer.bio}</p>
      </div>
    </article>
  );
}
