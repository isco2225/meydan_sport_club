import { describe, it, expect } from "vitest";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pageMetadata, pages, shareImage, sitePages } from "./metadata";
import { siteConfig } from "./site";

// Vitest proje kökünden çalışır (jsdom ortamında import.meta.url file: değildir).
const appDir = join(process.cwd(), "src/app");

/** `src/app` altında page.tsx'i olan her klasör bir rotadır (kök = "/"). */
function appRoutes(): string[] {
  const routes = existsSync(join(appDir, "page.tsx")) ? ["/"] : [];
  for (const entry of readdirSync(appDir, { withFileTypes: true })) {
    if (entry.isDirectory() && existsSync(join(appDir, entry.name, "page.tsx"))) {
      routes.push(`/${entry.name}`);
    }
  }
  return routes.sort();
}

describe("pages (sayfa listesi)", () => {
  it("src/app altındaki her rotayı içerir — eksik/fazla sayfa yok", () => {
    expect(sitePages.map((p) => p.path).sort()).toEqual(appRoutes());
  });

  it("yollar benzersizdir", () => {
    const paths = sitePages.map((p) => p.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("her sayfanın özgün bir açıklaması vardır", () => {
    const descriptions = sitePages.map((p) => p.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const description of descriptions) {
      // Arama sonucunda kesilmeyecek, ama boş da olmayacak bir uzunluk.
      expect(description.length).toBeGreaterThanOrEqual(70);
      expect(description.length).toBeLessThanOrEqual(170);
    }
  });

  it("ana sayfa başlığı konumu (Beykoz) içerir", () => {
    expect(pages.home.title).toContain("Beykoz");
  });

  it("ana sayfa başlığı yerel arama ifadesiyle başlar ve kesilmeyecek uzunluktadır", () => {
    expect(pages.home.title).toMatch(/^Beykoz Ortaçeşme Spor ve Fitness Salonu/);
    expect(pages.home.title).toContain(siteConfig.name);
    expect(pages.home.title.length).toBeLessThanOrEqual(60);
  });
});

describe("pageMetadata", () => {
  it("alt sayfada şablonlu başlık, canonical ve Open Graph üretir", () => {
    const meta = pageMetadata(pages.membership);

    expect(meta.title).toBe("Üyelik Ücretleri");
    expect(meta.description).toBe(pages.membership.description);
    expect(meta.alternates?.canonical).toBe("/uyelik");
    expect(meta.openGraph).toMatchObject({
      type: "website",
      locale: "tr_TR",
      siteName: siteConfig.name,
      title: `Üyelik Ücretleri · ${siteConfig.name}`,
      url: "/uyelik",
    });
  });

  it("her sayfada paylaşım görselini taşır (alt sayfa openGraph'ı görseli düşürmez)", () => {
    for (const page of sitePages) {
      const og = pageMetadata(page).openGraph as { images?: unknown[] };
      expect(og.images).toEqual([shareImage]);
    }
  });

  it("paylaşım görseli public/ altında gerçekten vardır ve 1200×630'dur", () => {
    expect(existsSync(join(process.cwd(), "public", shareImage.url))).toBe(true);
    expect([shareImage.width, shareImage.height]).toEqual([1200, 630]);
  });

  it("ana sayfada başlık şablonu atlanır (absolute)", () => {
    const meta = pageMetadata(pages.home);
    expect(meta.title).toEqual({ absolute: pages.home.title });
    expect(meta.alternates?.canonical).toBe("/");
  });
});
