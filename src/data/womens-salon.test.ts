import { describe, it, expect } from "vitest";
import { faqItems } from "./faq";
import {
  womensSalonFaq,
  womensSalonFaqIds,
  womensSalonHighlights,
  womensSalonIntro,
} from "./womens-salon";
import { pages } from "@/lib/metadata";

describe("kadınlar salonu içeriği", () => {
  it("salonun tamamen kadınlara özel olduğunu ve kadın antrenörleri anlatır", () => {
    // Cümle başında da geçebilir; harf büyüklüğü önemsenmez.
    expect(womensSalonIntro).toMatch(/tamamen kadınlara özel/i);
    const text = womensSalonHighlights.map((h) => `${h.title} ${h.description}`).join(" ");
    expect(text).toMatch(/Kadın Antrenörler/);
    expect(text).toMatch(/yalnızca kadın üyeler/);
  });

  it("SSS alt kümesi faq.ts'teki maddelerden, verilen sırayla gelir", () => {
    expect(womensSalonFaq.map((f) => f.id)).toEqual([...womensSalonFaqIds]);
    for (const item of womensSalonFaq) {
      const source = faqItems.find((f) => f.id === item.id)!;
      expect(item.question).toBe(source.question);
      expect(item.answer).toBe(source.answer);
    }
  });

  it("sayfanın kendisine giden bağlantıyı göstermez; diğer bağlantılar kalır", () => {
    const source = faqItems.find((f) => f.id === "kadinlar-salonu")!;
    expect(source.link?.href).toBe(pages.womens.path);
    expect(womensSalonFaq.find((f) => f.id === "kadinlar-salonu")!.link).toBeUndefined();
    expect(womensSalonFaq.find((f) => f.id === "konum")!.link).toBeDefined();
  });
});
