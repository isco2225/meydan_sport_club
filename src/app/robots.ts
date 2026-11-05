import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** `/robots.txt` — tüm site taranabilir; sitemap kanonik alan adından verilir. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}
