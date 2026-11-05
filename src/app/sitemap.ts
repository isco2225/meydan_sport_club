import type { MetadataRoute } from "next";
import { sitePages } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

/** `/sitemap.xml` — sayfa listesi `lib/metadata.ts`'teki tek kaynaktan gelir. */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: new URL(page.path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
