import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import {
  aboutHighlights,
  aboutIntro,
  aboutStory,
  aboutValues,
} from "@/data/about";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Hakkımızda" description={aboutIntro} />

      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-3">
          {aboutValues.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <h2 className="text-lg font-semibold">{value.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">
                {value.description}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold">Hikayemiz</h2>
          <div className="mt-4 space-y-4">
            {aboutStory.map((paragraph) => (
              <p key={paragraph} className="text-foreground/70">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <h2 className="text-2xl font-bold">Neden Meydan?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutHighlights.map((highlight) => (
              <li
                key={highlight.title}
                className="rounded-2xl bg-foreground/[0.03] p-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {highlight.title}
                </h3>
                <p className="mt-1 text-sm text-foreground/70">
                  {highlight.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
