import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TrainersSection from "@/components/sections/TrainersSection";
import MembershipSection from "@/components/sections/MembershipSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, pages } from "@/lib/metadata";
import { gymJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata(pages.home);

/**
 * Tek sayfa (one-page) ana sayfa: bölümler alt alta dizilir ve kullanıcı aşağı
 * kaydırdıkça "yeni sayfaya geçilmiş" hissi verir. Menüdeki bağlantılar her
 * bölümün id'sine yumuşak kaydırma ile gider.
 */
export default function HomePage() {
  return (
    <>
      {/* Yerel işletme yapılandırılmış verisi: adres, telefon, saatler. */}
      <JsonLd data={gymJsonLd()} />
      <HeroSection />
      <AboutSection />
      <TrainersSection />
      <MembershipSection />
      <ScheduleSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
