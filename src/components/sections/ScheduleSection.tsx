import Section from "./Section";
import { weeklySchedule } from "@/data/schedule";

export default function ScheduleSection() {
  return (
    <Section id="ders-programi" muted>
      <h2 className="font-display text-3xl uppercase sm:text-4xl">
        Ders Programı
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Kadınlar salonuna özel haftalık grup derslerimizi inceleyin.
      </p>

      <div className="mt-6 rounded-xl border border-black/10 bg-background p-4 text-sm text-foreground/70 dark:border-white/10">
        <strong className="font-semibold text-foreground">
          Kadınlar Salonu
        </strong>{" "}
        — Aşağıdaki grup ders programı yalnızca kadınlar salonu için geçerlidir.
        Erkek veya karma salon için ders programı bulunmamaktadır.
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {weeklySchedule.map((day) => (
          <div
            key={day.day}
            className="rounded-2xl border border-black/10 bg-background p-6 dark:border-white/10"
          >
            <h3 className="text-lg font-semibold">{day.day}</h3>
            <ul className="mt-4 space-y-4">
              {day.sessions.map((session) => (
                <li
                  key={`${session.time}-${session.title}`}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="w-12 shrink-0 font-mono font-medium text-foreground/60">
                    {session.time}
                  </span>
                  <span className="font-medium">{session.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
