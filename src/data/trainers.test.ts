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

  it("her antrenörün adı ve ünvanı var", () => {
    for (const trainer of trainers) {
      expect(trainer.name.trim()).not.toBe("");
      expect(trainer.title.trim()).not.toBe("");
    }
  });

  it("fotoğraf yolu, antrenör klasörü ve id ile eşleşir", () => {
    // public/images/README.md kuralı: dosya adı trainer id'si ile aynıdır ki
    // eşleştirme gözle doğrulanabilir kalsın.
    for (const trainer of trainers) {
      if (!trainer.photo) continue;
      expect(trainer.photo).toMatch(
        new RegExp(`^/images/antrenorler/${trainer.id}\\.(jpg|webp|png)$`),
      );
    }
  });

  it("id'ler küçük harf, rakam ve tireden oluşur (Türkçe karakter yok)", () => {
    for (const trainer of trainers) {
      expect(trainer.id).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
