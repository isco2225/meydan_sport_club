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
 * Ana sayfadaki tek sayfa (one-page) akışının yapı taşı. Her bölüm, sticky
 * navbar'ın altında kalan ekran alanını (`100svh - var(--nav-h)`) tam olarak
 * doldurur; böylece bölüm ekrana taşmadan sığar ve içerik görünür alanın
 * gerçek ortasına hizalanır. Kullanıcı serbestçe kaydırır (snap yok).
 *
 * Çapa telafisi burada YAPILMAZ; `globals.css` içindeki `scroll-padding-top`
 * tüm çapa hedefleri için tek kaynaktır.
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
      className={`flex min-h-[calc(100svh-var(--nav-h))] items-center border-b border-black/10 py-20 dark:border-white/10 ${
        muted ? "bg-foreground/[0.02]" : ""
      } ${className}`}
    >
      <Container className="w-full">{children}</Container>
    </section>
  );
}
