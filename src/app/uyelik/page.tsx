import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Üyelik Paketleri",
};

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        title="Üyelik Paketleri"
        description="Hedeflerine ve bütçene uygun paketi seç, hemen başla."
      />

      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col rounded-2xl border p-8 ${
                pkg.featured
                  ? "border-foreground shadow-lg"
                  : "border-black/10 dark:border-white/10"
              }`}
            >
              {pkg.featured && (
                <span className="mb-4 inline-block w-fit rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                  En Popüler
                </span>
              )}
              <h2 className="text-xl font-bold">{pkg.name}</h2>
              <p className="mt-4">
                <span className="text-4xl font-bold">{pkg.price} ₺</span>
                <span className="text-foreground/60"> / {pkg.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span aria-hidden className="mt-0.5 text-foreground/60">
                      ✓
                    </span>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/iletisim"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
                  pkg.featured
                    ? "bg-foreground text-background"
                    : "border border-foreground/20"
                }`}
              >
                Paketi Seç
              </Link>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
