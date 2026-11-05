import { describe, it, expect } from "vitest";
import { heroFacts } from "./facts";

describe("heroFacts", () => {
  it("rakamları saatler ve ders programından türetir", () => {
    expect(heroFacts).toEqual([
      { value: "6 gün", label: "haftada açık" },
      { value: "2 salon", label: "karma ve kadınlara özel" },
      { value: "3 grup dersi", label: "pilates · zumba · core board" },
    ]);
  });
});
