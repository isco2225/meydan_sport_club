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
 * Tek bir antrenörü gösteren kompakt kart. Ana sayfadaki `TrainersSection` ile
 * `/antrenorler` sayfası aynı kartı kullanır; kart düzeni tek yerde durur.
 *
 * Fotoğraf, profil fotoğrafı gibi yuvarlak bir çerçevede gösterilir; fotoğrafı
 * olmayan antrenörde aynı çerçevede adın baş harfi durur — böylece grid'deki
 * kart yüksekliği fotoğrafın varlığına göre değişmez.
 */
export default function TrainerCard({
  trainer,
  headingLevel,
}: TrainerCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <article className="flex flex-col items-center rounded-2xl border border-black/10 bg-background p-6 text-center dark:border-white/10">
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-foreground/10 ring-1 ring-black/10 dark:ring-white/10">
        {trainer.photo ? (
          <Image
            src={trainer.photo}
            alt={`${trainer.name} — ${trainer.title}`}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full items-center justify-center text-4xl font-bold text-foreground/40"
          >
            {trainer.name.charAt(0)}
          </span>
        )}
      </div>

      <Heading className="mt-4 text-lg font-semibold">{trainer.name}</Heading>
      <p className="text-sm text-foreground/60">{trainer.title}</p>
    </article>
  );
}
