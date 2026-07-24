import { ReactNode } from "react";
import Container from "./Container";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Alt sayfaların üst kısmında başlık ve açıklama gösteren blok. */
export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="border-b border-black/10 bg-foreground/[0.02] py-16 dark:border-white/10">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-lg text-foreground/70">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
