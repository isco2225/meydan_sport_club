import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";
import { sitePages } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

describe("sitemap", () => {
  it("her sayfayı kanonik alan adıyla mutlak URL olarak listeler", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(sitePages.length);

    for (const page of sitePages) {
      expect(entries.map((e) => e.url)).toContain(
        new URL(page.path, siteConfig.url).toString(),
      );
    }
    for (const entry of entries) {
      expect(entry.url.startsWith("https://www.meydansportclub.com/")).toBe(true);
    }
  });

  it("ana sayfaya en yüksek önceliği verir", () => {
    const home = sitemap().find((e) => e.url === `${siteConfig.url}/`);
    expect(home?.priority).toBe(1);
  });
});

describe("robots", () => {
  it("tüm siteyi taramaya açar ve sitemap adresini verir", () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe("https://www.meydansportclub.com/sitemap.xml");
  });
});
