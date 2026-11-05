import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { galleryImages, heroImages } from "./gallery";

const publicFile = (src: string) => join(process.cwd(), "public", src);

describe("galleryImages", () => {
  it("her dosya public/ altında gerçekten vardır", () => {
    for (const image of galleryImages) {
      expect(existsSync(publicFile(image.src)), image.src).toBe(true);
    }
  });

  it("dosya adları isimlendirme kuralına uyar (küçük harf, rakam, tire)", () => {
    for (const image of galleryImages) {
      expect(image.src).toMatch(/^\/images\/galeri\/[a-z0-9-]+\.(jpg|webp|png)$/);
    }
  });

  it("her görselin anlamlı bir alt metni ve ölçüsü vardır", () => {
    for (const image of galleryImages) {
      expect(image.alt.trim().length).toBeGreaterThan(10);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
  });
});

describe("heroImages", () => {
  it("birden fazla görsel tanımlı ve hepsi public/ altında var", () => {
    expect(heroImages.length).toBeGreaterThan(1);
    for (const src of heroImages) {
      expect(existsSync(publicFile(src)), src).toBe(true);
    }
  });
});
