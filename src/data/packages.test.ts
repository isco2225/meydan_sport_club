import { describe, it, expect } from "vitest";
import { packages } from "./packages";

describe("packages", () => {
  it("en az bir paket tanımlı", () => {
    expect(packages.length).toBeGreaterThan(0);
  });

  it("paket id'leri benzersiz", () => {
    const ids = packages.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tam olarak bir paket öne çıkarılmış (featured)", () => {
    expect(packages.filter((p) => p.featured)).toHaveLength(1);
  });

  it("her paketin pozitif fiyatı ve en az bir özelliği var", () => {
    for (const pkg of packages) {
      expect(pkg.price).toBeGreaterThan(0);
      expect(pkg.features.length).toBeGreaterThan(0);
    }
  });
});
