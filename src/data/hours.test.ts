import { describe, it, expect } from "vitest";
import { CLOSED, summarizeHours, workingHours } from "./hours";

describe("workingHours", () => {
  it("karma ve kadınlar salonunu tanımlar", () => {
    expect(workingHours.map((salon) => salon.name)).toEqual([
      "Karma Salon",
      "Kadınlar Salonu",
    ]);
  });

  it("her salonun en az bir gün satırı vardır", () => {
    for (const salon of workingHours) {
      expect(salon.rows.length).toBeGreaterThan(0);
    }
  });

  it("her salon Pazar günü kapalıdır", () => {
    for (const salon of workingHours) {
      const pazar = salon.rows.find((row) => row.days === "Pazar");
      expect(pazar?.hours).toBe(CLOSED);
    }
  });

  it("kapalı olmayan saatler HH:MM – HH:MM biçimindedir", () => {
    for (const salon of workingHours) {
      for (const row of salon.rows) {
        if (row.hours === CLOSED) continue;
        expect(row.hours).toMatch(/^\d{2}:\d{2} – \d{2}:\d{2}$/);
      }
    }
  });
});

describe("summarizeHours", () => {
  it("salon adını ve tüm satırlarını tek metinde birleştirir", () => {
    const summary = summarizeHours(workingHours[0]);
    expect(summary).toBe(
      "Karma Salon: Pazartesi – Cuma 09:00 – 23:50, Cumartesi 09:00 – 22:50, Pazar Kapalı",
    );
  });
});
