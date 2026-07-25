import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import WorkingHours from "@/components/WorkingHours";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
};

const contactDetails = [
  { label: "Adres", value: siteConfig.address },
  { label: "Telefon", value: siteConfig.phone },
  { label: "E-posta", value: siteConfig.email },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="İletişim"
        description="Sorularınız için bize ulaşın veya ücretsiz tanışma antrenmanı için randevu alın."
      />

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* İletişim bilgileri */}
          <div>
            <h2 className="text-xl font-bold">Bize Ulaşın</h2>
            <dl className="mt-6 space-y-6">
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
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                Çalışma Saatleri
              </h3>
              <WorkingHours className="mt-3" />
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
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium"
              >
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
        </Container>
      </section>
    </>
  );
}
