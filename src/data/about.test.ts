import { describe, it, expect } from "vitest";
import {
  aboutIntro,
  aboutValues,
  aboutStory,
  aboutHighlights,
} from "./about";

describe("about verisi", () => {
  it("giriş metni dolu", () => {
    expect(aboutIntro.trim().length).toBeGreaterThan(0);
  });

  it("üç değer kartı tanımlı ve başlıkları benzersiz", () => {
    expect(aboutValues).toHaveLength(3);
    const titles = aboutValues.map((v) => v.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("hikaye paragrafları dolu", () => {
    expect(aboutStory.length).toBeGreaterThan(0);
    for (const paragraph of aboutStory) {
      expect(paragraph.trim().length).toBeGreaterThan(0);
    }
  });

  it("öne çıkanlar dolu ve başlıkları benzersiz", () => {
    expect(aboutHighlights.length).toBeGreaterThan(0);
    const titles = aboutHighlights.map((h) => h.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const highlight of aboutHighlights) {
      expect(highlight.description.trim().length).toBeGreaterThan(0);
    }
  });
});
