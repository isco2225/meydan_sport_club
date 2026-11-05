import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ScheduleNotice from "@/components/ScheduleNotice";
import WeeklySchedule from "@/components/WeeklySchedule";
import { pageMetadata, pages } from "@/lib/metadata";

export const metadata = pageMetadata(pages.schedule);

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="Ders Programı"
        description="Kadınlar salonuna özel haftalık grup derslerimizi inceleyin ve size uygun saati bulun."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ScheduleNotice className="mb-8" />
          <WeeklySchedule headingLevel={2} />
        </Container>
      </section>
    </>
  );
}
