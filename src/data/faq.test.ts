import { describe, it, expect } from "vitest";
import { faqItems } from "./faq";

describe("faqItems", () => {
  it("en az bir soru tanımlı", () => {
    expect(faqItems.length).toBeGreaterThan(0);
  });

  it("soru id'leri benzersiz", () => {
    const ids = faqItems.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("her sorunun dolu bir soru ve cevap metni var", () => {
    for (const item of faqItems) {
      expect(item.question.trim().length).toBeGreaterThan(0);
      expect(item.answer.trim().length).toBeGreaterThan(0);
    }
  });

  it("sorular soru işaretiyle biter", () => {
    for (const item of faqItems) {
      expect(item.question.endsWith("?")).toBe(true);
    }
  });
});
