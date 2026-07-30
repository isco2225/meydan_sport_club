import Section from "./Section";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import WorkingHours from "@/components/WorkingHours";
import { siteConfig } from "@/lib/site";

const contactDetails = [
  { label: "Adres", value: siteConfig.address },
  { label: "Telefon", value: siteConfig.phone },
  { label: "E-posta", value: siteConfig.email },
];

export default function ContactSection() {
  return (
    <Section id="iletisim">
      <h2 className="font-display text-3xl uppercase sm:text-4xl">İletişim</h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Sorularınız için bize ulaşın veya ücretsiz tanışma antrenmanı için
        randevu alın.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        {/* İletişim bilgileri */}
        <div>
          <dl className="space-y-6">
            {contactDetails.map((detail) => (
              <div key={detail.label}>
                <dt className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                  {detail.label}
                </dt>
                <dd className="mt-1 text-foreground/80">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h3 className="inline-block bg-brand px-2 py-0.5 text-sm font-semibold uppercase tracking-wide text-black">
              Çalışma Saatleri
            </h3>
            <WorkingHours className="mt-3" />
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
              Bizi Takip Edin
            </h3>
            <SocialLinks className="mt-3" />
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
