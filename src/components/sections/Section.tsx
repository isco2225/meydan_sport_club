import { ReactNode } from "react";
import Container from "@/components/Container";

type SectionProps = {
  id: string;
  children: ReactNode;
  /** Arka planı hafifçe farklılaştırarak bölümler arası ayrımı belirginleştirir. */
  muted?: boolean;
  className?: string;
};

/**
 * Ana sayfadaki tek sayfa (one-page) akışının yapı taşı. Her bölüm en az bir
 * ekran yüksekliğinde olur; kullanıcı serbestçe kaydırır (snap yok).
 */
export default function Section({
  id,
  children,
  muted = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`flex min-h-[100svh] scroll-mt-16 items-center border-b border-black/10 py-20 dark:border-white/10 ${
        muted ? "bg-foreground/[0.02]" : ""
      } ${className}`}
    >
      <Container className="w-full">{children}</Container>
    </section>
  );
}
