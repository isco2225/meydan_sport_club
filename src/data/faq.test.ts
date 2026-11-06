import { describe, it, expect } from "vitest";
import { faqItems } from "./faq";
import { formatAddress, mapsHref } from "@/lib/links";

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

describe("faqItems yerel sorular", () => {
  const byId = (id: string) => {
    const item = faqItems.find((f) => f.id === id);
    if (!item) throw new Error(`SSS maddesi yok: ${id}`);
    return item;
  };

  it("konum cevabı görünen adresi ve harita bağlantısını taşır", () => {
    const konum = byId("konum");
    expect(konum.answer).toContain(formatAddress());
    expect(konum.answer).toContain("Beykoz Ortaçeşme'deyiz");
    expect(konum.link?.href).toBe(mapsHref());
  });

  it("kadınlara özel salonun tamamen kadınlara ayrıldığını söyler", () => {
    const kadinlar = byId("kadinlar-salonu");
    expect(kadinlar.question).toBe("Kadınlara özel spor salonunuz var mı?");
    expect(kadinlar.answer).toMatch(/tamamen kadınlara özel/);
    expect(kadinlar.answer).toMatch(/yalnızca kadın üyeler/);
  });

  it("kadınlar salonunda kadın antrenör olduğunu söyler", () => {
    expect(byId("kadin-antrenor").answer).toMatch(/^Evet\..*kadın antrenör/);
  });

  it("otopark olmadığını açıkça söyler", () => {
    expect(byId("otopark").answer).toMatch(/^Hayır/);
  });
});
