import Link from "next/link";
import Icon from "@/components/Icon";

export type Highlight = {
  title: string;
  description: string;
  /** İsteğe bağlı ayrıntı bağlantısı, ör. kadınlar salonu sayfası. */
  link?: { label: string; href: string };
};

type HighlightGridProps = {
  items: Highlight[];
  /** Kart başlıklarının düzeyi; çağıranın başlık hiyerarşisinden gelir. */
  headingLevel: 3 | 4;
  className?: string;
};

/**
 * Numaralı öne çıkan kartlar ("01", "02"…). Hakkımızda'daki "Neden Meydan?"
 * ile `/kadinlar-salonu`'nun ortak gövdesidir; kart JSX'i tek yerde durur.
 */
export default function HighlightGrid({
  items,
  headingLevel,
  className = "",
}: HighlightGridProps) {
  const Heading = `h${headingLevel}` as "h3" | "h4";

  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand/50"
        >
          <span
            aria-hidden="true"
            className="font-display text-4xl text-brand/25 transition-colors group-hover:text-brand"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <Heading className="mt-3 text-sm font-semibold uppercase tracking-wide">
            {item.title}
          </Heading>
          <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
          {item.link && (
            <Link
              href={item.link.href}
              className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand transition-opacity hover:opacity-80"
            >
              {item.link.label}
              <Icon name="arrow-right" className="size-4" />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
