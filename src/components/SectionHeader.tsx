import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Başlığın üstündeki kısa sarı etiket, ör. "Biz kimiz". */
  eyebrow: string;
  /** Bölümün `h2` başlığı (ana sayfadaki her bölüm için tek). */
  title: string;
  description?: ReactNode;
  className?: string;
};

/**
 * Ana sayfa bölümlerinin ortak başlık bloğu: sarı çizgili etiket + Anton
 * `h2` + açıklama. Bölümler arasında tutarlı bir ritim sağlar.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl uppercase leading-[1.05] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-foreground/70">{description}</p>
      )}
    </div>
  );
}
