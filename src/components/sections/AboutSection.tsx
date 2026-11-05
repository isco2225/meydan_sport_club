import Section from "./Section";
import AboutContent from "@/components/AboutContent";
import SectionHeader from "@/components/SectionHeader";
import { aboutIntro } from "@/data/about";

export default function AboutSection() {
  return (
    <Section id="hakkimizda">
      <SectionHeader eyebrow="Biz kimiz" title="Hakkımızda" description={aboutIntro} />
      <div className="mt-12">
        <AboutContent headingLevel={3} />
      </div>
    </Section>
  );
}
