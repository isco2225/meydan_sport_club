import Section from "./Section";
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

        {/* İletişim formu (iskelet) */}
        <form className="space-y-4 rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Ad Soyad
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Mesajınız
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Gönder
          </button>
        </form>
      </div>
    </Section>
  );
}
