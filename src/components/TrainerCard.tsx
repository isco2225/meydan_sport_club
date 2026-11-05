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
 * Fotoğraf, profil fotoğrafı gibi yuvarlak bir çerçevede (sarı halkayla)
 * gösterilir; fotoğrafı olmayan antrenörde aynı çerçevede adın baş harfi
 * durur — böylece grid'deki kart yüksekliği fotoğrafın varlığına göre değişmez.
 */
export default function TrainerCard({
  trainer,
  headingLevel,
}: TrainerCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <article className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-line bg-surface px-6 pt-10 pb-8 text-center transition-colors hover:border-brand/50">
      {/* Kartın üst kenarında marka çizgisi. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-brand/70 transition-colors group-hover:bg-brand"
      />
      <div className="rounded-full p-1 ring-2 ring-brand/80">
        <div className="relative size-36 overflow-hidden rounded-full bg-foreground/10">
          {trainer.photo ? (
            <Image
              src={trainer.photo}
              alt={`${trainer.name} — ${trainer.title}`}
              fill
              sizes="144px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-full items-center justify-center font-display text-5xl text-foreground/40"
            >
              {trainer.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <Heading className="mt-6 font-display text-2xl uppercase tracking-wide">
        {trainer.name}
      </Heading>
      <p className="mt-1 text-sm font-medium text-brand">{trainer.title}</p>
    </article>
  );
}
