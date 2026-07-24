import Link from "next/link";
import Container from "@/components/Container";
import { siteConfig } from "@/lib/site";

const highlights = [
  {
    title: "Modern Ekipman",
    description: "Son teknoloji cihazlarla donatılmış geniş antrenman alanı.",
  },
  {
    title: "Uzman Antrenörler",
    description: "Alanında deneyimli, sertifikalı antrenör kadrosu.",
  },
  {
    title: "Esnek Üyelik",
    description: "Her bütçeye ve hedefe uygun üyelik paketleri.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-black/10 bg-foreground/[0.02] py-20 sm:py-28 dark:border-white/10">
        <Container className="text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Hedeflerine {siteConfig.shortName} ile Ulaş
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/uyelik"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Üyelik Paketleri
            </Link>
            <Link
              href="/ders-programi"
              className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
            >
              Ders Programı
            </Link>
          </div>
        </Container>
      </section>

      {/* Öne çıkanlar */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">
                {item.description}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <Container>
          <div className="rounded-3xl border border-black/10 bg-foreground/[0.02] p-10 text-center dark:border-white/10">
            <h2 className="text-2xl font-bold sm:text-3xl">Hemen Başla</h2>
            <p className="mx-auto mt-3 max-w-xl text-foreground/70">
              Ücretsiz tanışma antrenmanı için bizimle iletişime geç.
            </p>
            <Link
              href="/iletisim"
              className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              İletişime Geç
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
