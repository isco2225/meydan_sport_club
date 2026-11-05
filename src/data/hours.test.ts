import { describe, it, expect } from "vitest";
import {
  CLOSED,
  dayRangeLabel,
  groupWeek,
  openingHoursSpecification,
  salonSchedules,
  summarizeHours,
  workingHours,
} from "./hours";

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
      "Karma Salon: Hafta içi 09:00 – 23:50, Cumartesi 09:00 – 22:50, Pazar Kapalı",
    );
  });
});

describe("salonSchedules (kaynak veri)", () => {
  it("her salon tam 7 gün tanımlar ve saatler HH:MM biçimindedir", () => {
    for (const salon of salonSchedules) {
      expect(salon.week).toHaveLength(7);
      for (const day of salon.week) {
        if (day === null) continue;
        expect(day.opens).toMatch(/^\d{2}:\d{2}$/);
        expect(day.closes).toMatch(/^\d{2}:\d{2}$/);
        expect(day.opens < day.closes).toBe(true);
      }
    }
  });

  it("görünen satırlar kaynak veriden türetilir (aynı salon adları)", () => {
    expect(workingHours.map((s) => s.name)).toEqual(
      salonSchedules.map((s) => s.name),
    );
  });
});

describe("groupWeek", () => {
  const nine = { opens: "09:00", closes: "18:00" };

  it("ardışık aynı saatli günleri tek blokta toplar", () => {
    expect(groupWeek([nine, nine, nine, nine, nine, null, null])).toEqual([
      { from: 0, to: 4, hours: nine },
      { from: 5, to: 6, hours: null },
    ]);
  });

  it("aynı saat ardışık değilse ayrı bloklar üretir", () => {
    const groups = groupWeek([nine, null, nine, nine, nine, nine, nine]);
    expect(groups.map((g) => [g.from, g.to])).toEqual([
      [0, 0],
      [1, 1],
      [2, 6],
    ]);
  });
});

describe("openingHoursSpecification", () => {
  it("karma salon için schema.org gün adlarıyla blokları verir, kapalı günü atlar", () => {
    const karma = salonSchedules.find((s) => s.id === "karma")!;
    expect(openingHoursSpecification(karma.week)).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "23:50",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "22:50",
      },
    ]);
  });

  it("görünen satırlarla aynı saatleri bildirir (iki kopya ayrışmaz)", () => {
    for (const salon of salonSchedules) {
      const visible = workingHours.find((s) => s.name === salon.name)!;
      const openRows = visible.rows.filter((r) => r.hours !== CLOSED);
      const spec = openingHoursSpecification(salon.week);
      expect(spec.map((s) => `${s.opens} – ${s.closes}`)).toEqual(
        openRows.map((r) => r.hours),
      );
    }
  });
});

describe("dayRangeLabel", () => {
  it("Pazartesi–Cuma aralığını 'Hafta içi' olarak adlandırır", () => {
    expect(dayRangeLabel(0, 4)).toBe("Hafta içi");
  });

  it("adı olmayan aralıkları uç günlerle yazar", () => {
    expect(dayRangeLabel(0, 5)).toBe("Pazartesi – Cumartesi");
    expect(dayRangeLabel(1, 3)).toBe("Salı – Perşembe");
  });

  it("tek günü kendi adıyla yazar", () => {
    expect(dayRangeLabel(6, 6)).toBe("Pazar");
  });

  it("karma salonun hafta içi satırı 'Hafta içi' etiketiyle görünür", () => {
    const karma = workingHours.find((s) => s.name === "Karma Salon")!;
    expect(karma.rows[0]).toEqual({ days: "Hafta içi", hours: "09:00 – 23:50" });
  });
});
