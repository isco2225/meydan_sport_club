import { describe, it, expect } from "vitest";
import { trainers } from "./trainers";

describe("trainers", () => {
  it("en az bir antrenör tanımlı", () => {
    expect(trainers.length).toBeGreaterThan(0);
  });

  it("antrenör id'leri benzersiz", () => {
    const ids = trainers.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("her antrenörün adı, ünvanı ve en az bir uzmanlığı var", () => {
    for (const trainer of trainers) {
      expect(trainer.name.trim()).not.toBe("");
      expect(trainer.title.trim()).not.toBe("");
      expect(trainer.specialties.length).toBeGreaterThan(0);
    }
  });
});
