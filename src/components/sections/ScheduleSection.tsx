import Section from "./Section";
import ScheduleNotice from "@/components/ScheduleNotice";
import SectionHeader from "@/components/SectionHeader";
import WeeklySchedule from "@/components/WeeklySchedule";

export default function ScheduleSection() {
  return (
    <Section id="ders-programi" muted>
      <SectionHeader
        eyebrow="Grup dersleri"
        title="Ders Programı"
        description="Kadınlar salonuna özel haftalık grup derslerimizi inceleyin."
      />

      <ScheduleNotice className="mt-8" />

      <div className="mt-8">
        <WeeklySchedule headingLevel={3} />
      </div>
    </Section>
  );
}
