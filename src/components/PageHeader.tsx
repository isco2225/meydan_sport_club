import { ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

/**
 * Alt sayfaların üst kısmı: ana sayfaya dönüş bağlantısı, sayfanın tek `h1`'i
 * ve açıklama. Hero ile aynı görsel dil (Anton başlık, sarı ışık hüzmesi).
 */
export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="glow-brand relative overflow-hidden border-b border-line py-16 sm:py-24">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand transition-opacity hover:opacity-80"
        >
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
          Ana Sayfa
        </Link>
        <h1 className="mt-4 font-display text-4xl uppercase leading-[1.05] sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-foreground/70">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
