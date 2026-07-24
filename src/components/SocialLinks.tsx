import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

type SocialKey = keyof typeof siteConfig.social;

type SocialPlatform = {
  key: SocialKey;
  label: string;
  icon: ReactNode;
};

/**
 * Platform tanımları. Yalnızca `siteConfig.social` içinde tanımlı olanlar
 * render edilir; böylece hesap eklemek/çıkarmak tek noktadan (site.ts) yapılır.
 * İkonlar inline SVG'dir — yeni bağımlılık gerektirmez.
 */
const platforms: SocialPlatform[] = [
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 3.13A6.67 6.67 0 1 0 18.67 12 6.67 6.67 0 0 0 12 5.33Zm0 11A4.33 4.33 0 1 1 16.33 12 4.33 4.33 0 0 1 12 16.33Zm6.94-11.6a1.56 1.56 0 1 0 1.56 1.56 1.56 1.56 0 0 0-1.56-1.56Z" />
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: (
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.57V8.43L15.82 12Z" />
    ),
  },
];

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  const links = platforms.filter((platform) => siteConfig.social[platform.key]);

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map((platform) => (
        <li key={platform.key}>
          <a
            href={siteConfig.social[platform.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} ${platform.label}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground dark:border-white/15"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {platform.icon}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
