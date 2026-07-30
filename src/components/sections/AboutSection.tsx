import Section from "./Section";
import {
  aboutHighlights,
  aboutIntro,
  aboutStory,
  aboutValues,
} from "@/data/about";

export default function AboutSection() {
  return (
    <Section id="hakkimizda">
      <h2 className="font-display text-3xl uppercase sm:text-4xl">
        Hakkımızda
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">{aboutIntro}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {aboutValues.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
          >
            <h3 className="text-lg font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm text-foreground/70">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {aboutStory.map((paragraph) => (
            <p key={paragraph} className="text-foreground/70">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
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
      </div>
    </Section>
  );
}
