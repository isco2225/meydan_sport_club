import { weeklySchedule } from "@/data/schedule";

type WeeklyScheduleProps = {
  /**
   * Gün başlıklarının düzeyi. Ana sayfa bölümünde `h2` "Ders Programı"
   * olduğu için `3`; `/ders-programi` sayfasında `h1` PageHeader'da olduğu
   * için `2`.
   */
  headingLevel: 2 | 3;
};

/** Ders türü → görsel vurgu. Yalnızca marka token'ları kullanılır. */
const classStyles = [
  "border-brand bg-brand text-black",
  "border-brand/60 bg-brand/10 text-foreground",
  "border-foreground/30 bg-foreground/[0.06] text-foreground",
];

const classTitles = [
  ...new Set(weeklySchedule.flatMap((day) => day.sessions.map((s) => s.title))),
];

function styleFor(title: string): string {
  return classStyles[classTitles.indexOf(title) % classStyles.length];
}

/**
 * Kadınlar salonunun haftalık grup ders programı: masaüstünde günler yan yana
 * sütun, mobilde alt alta kart. Ders türleri renk tonuyla ayrışır ve altta
 * açıklaması verilir. Ana sayfadaki `ScheduleSection` ile `/ders-programi`
 * sayfasının ortak gövdesidir.
 */
export default function WeeklySchedule({ headingLevel }: WeeklyScheduleProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {weeklySchedule.map((day) => (
          <div
            key={day.day}
            className="overflow-hidden rounded-2xl border border-line bg-surface"
          >
            <Heading className="border-b border-line px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">
              {day.day}
            </Heading>
            <ul className="space-y-3 p-4">
              {day.sessions.map((session) => (
                <li
                  key={`${session.time}-${session.title}`}
                  className={`rounded-xl border px-4 py-3 ${styleFor(session.title)}`}
                >
                  <span className="block font-display text-2xl leading-none tabular-nums">
                    {session.time}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">
                    {session.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul
        aria-label="Ders türleri"
        className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70"
      >
        {classTitles.map((title) => (
          <li key={title} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-3 rounded-full border ${styleFor(title)}`}
            />
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
