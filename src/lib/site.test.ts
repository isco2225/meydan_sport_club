import { describe, it, expect } from "vitest";
import { navItems } from "./site";

describe("navItems", () => {
  it("beklenen bölümleri sırayla içerir", () => {
    expect(navItems.map((i) => i.sectionId)).toEqual([
      "ust",
      "hakkimizda",
      "antrenorler",
      "uyelik",
      "ders-programi",
      "sss",
      "iletisim",
    ]);
  });

  it("her bağlantı ilgili bölüme çapa (/#sectionId) ile gider", () => {
    for (const item of navItems) {
      expect(item.href).toBe(`/#${item.sectionId}`);
    }
  });
});
