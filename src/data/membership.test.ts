import { describe, it, expect } from "vitest";
import {
  membershipPlans,
  extraFees,
  formatTRY,
  CURRENCY,
  basePlan,
  savingsPercent,
  formatPercent,
} from "./membership";

describe("membershipPlans", () => {
  it("en az bir üyelik süresi tanımlı", () => {
    expect(membershipPlans.length).toBeGreaterThan(0);
  });

  it("plan id'leri benzersiz", () => {
    const ids = membershipPlans.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("her planın pozitif standart ve öğrenci fiyatı ve süresi var", () => {
    for (const plan of membershipPlans) {
      expect(plan.months).toBeGreaterThan(0);
      expect(plan.standardPrice).toBeGreaterThan(0);
      expect(plan.studentPrice).toBeGreaterThan(0);
    }
  });

  it("öğrenci fiyatı standart fiyattan yüksek değildir", () => {
    for (const plan of membershipPlans) {
      expect(plan.studentPrice).toBeLessThanOrEqual(plan.standardPrice);
    }
  });

  it("süre uzadıkça aylık maliyet düşer (standart)", () => {
    const monthly = membershipPlans.map((p) => p.standardPrice / p.months);
    const sorted = [...membershipPlans].sort((a, b) => a.months - b.months);
    const sortedMonthly = sorted.map((p) => p.standardPrice / p.months);
    // En kısa süre en pahalı aylık maliyete sahip olmalı.
    expect(Math.max(...monthly)).toBe(sortedMonthly[0]);
  });
});

describe("extraFees", () => {
  it("günlük giriş ve kart/barkod ücreti tanımlı ve pozitif", () => {
    const ids = extraFees.map((f) => f.id);
    expect(ids).toContain("gunluk-giris");
    expect(ids).toContain("kart-barkod");
    for (const fee of extraFees) {
      expect(fee.price).toBeGreaterThan(0);
    }
  });
});

describe("formatTRY", () => {
  it("para birimi TRY'dir", () => {
    expect(CURRENCY).toBe("TRY");
  });

  it("sayıyı Türkçe biçimde ve ₺ simgesiyle biçimlendirir", () => {
    const formatted = formatTRY(2500);
    expect(formatted).toContain("₺");
    expect(formatted).toContain("2.500");
    // Kuruş gösterilmez.
    expect(formatted).not.toContain(",00");
  });
});

describe("savingsPercent", () => {
  const byId = (id: string) => membershipPlans.find((p) => p.id === id)!;

  it("taban (aylık) plan için 0 döner", () => {
    expect(basePlan.id).toBe("aylik");
    expect(savingsPercent(basePlan)).toBe(0);
  });

  it("aylık maliyeti tabana göre yüzde olarak hesaplar ve yuvarlar", () => {
    // 12 ay: 18.000 / 12 = 1.500 ₺/ay; 2.500'e göre %40 düşük.
    expect(savingsPercent(byId("12-aylik"))).toBe(40);
    // 3 ay: 6.500 / 3 ≈ 2.166,67 ₺/ay → %13,3 → 13.
    expect(savingsPercent(byId("3-aylik"))).toBe(13);
  });

  it("süre uzadıkça avantaj artar", () => {
    const sorted = [...membershipPlans].sort((a, b) => a.months - b.months);
    const savings = sorted.map((p) => savingsPercent(p));
    expect([...savings].sort((a, b) => a - b)).toEqual(savings);
  });
});

describe("formatPercent", () => {
  it("Türkçe yüzde biçimini (%40) kullanır", () => {
    expect(formatPercent(40)).toBe("%40");
  });
});
