import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TrainersSection from "@/components/sections/TrainersSection";
import MembershipSection from "@/components/sections/MembershipSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import ContactSection from "@/components/sections/ContactSection";

/**
 * Tek sayfa (one-page) ana sayfa: bölümler alt alta dizilir ve kullanıcı aşağı
 * kaydırdıkça "yeni sayfaya geçilmiş" hissi verir. Menüdeki bağlantılar her
 * bölümün id'sine yumuşak kaydırma ile gider.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TrainersSection />
      <MembershipSection />
      <ScheduleSection />
      <ContactSection />
    </>
  );
}
