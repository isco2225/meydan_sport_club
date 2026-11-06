import Link from "next/link";
import { faqItems } from "@/data/faq";

const linkClass =
  "mt-3 inline-block text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4 transition-opacity hover:opacity-70";

/** Harita gibi site dışı bağlantılar yeni sekmede açılır. */
const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * SSS listesi. Açılır/kapanır davranış yerleşik <details>/<summary> ile
 * sağlanır: JavaScript gerektirmez, server component kalır. Ana sayfadaki
 * `FaqSection` ile `/sss` sayfasının ortak gövdesidir.
 */
export default function FaqList() {
  return (
    <div className="space-y-4">
      {faqItems.map((item) => (
        <details
          key={item.id}
          className="group rounded-2xl border border-line bg-surface p-6 transition-colors open:border-brand/50"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0 text-foreground/40 transition-transform group-open:rotate-180 group-open:text-brand"
            >
              <path d="m3 6 5 5 5-5" />
            </svg>
          </summary>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            {item.answer}
          </p>
          {item.link &&
            (isExternal(item.link.href) ? (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {item.link.label}
              </a>
            ) : (
              <Link href={item.link.href} className={linkClass}>
                {item.link.label}
              </Link>
            ))}
        </details>
      ))}
    </div>
  );
}
