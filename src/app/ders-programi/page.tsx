import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { weeklySchedule } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Ders Programı",
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="Ders Programı"
        description="Haftalık grup derslerimizi inceleyin ve size uygun saati bulun."
      />

      <section className="py-16">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {weeklySchedule.map((day) => (
            <div
              key={day.day}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <h2 className="text-lg font-semibold">{day.day}</h2>
              <ul className="mt-4 space-y-4">
                {day.sessions.map((session) => (
                  <li
                    key={`${session.time}-${session.title}`}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="w-12 shrink-0 font-mono font-medium text-foreground/60">
                      {session.time}
                    </span>
                    <span>
                      <span className="font-medium">{session.title}</span>
                      <span className="block text-foreground/60">
                        {session.trainer}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
