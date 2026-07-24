import { describe, it, expect } from "vitest";
import { weeklySchedule } from "./schedule";

describe("weeklySchedule (Kadınlar Salonu)", () => {
  it("yalnızca hafta içi günleri içerir (Cumartesi/Pazar yok)", () => {
    const days = weeklySchedule.map((d) => d.day);
    expect(days).toEqual([
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
    ]);
  });

  const findSessions = (day: string) =>
    weeklySchedule.find((d) => d.day === day)?.sessions ?? [];

  it("Grup Pilates Pazartesi ve Çarşamba 18:30'da", () => {
    for (const day of ["Pazartesi", "Çarşamba"]) {
      expect(findSessions(day)).toEqual([
        { time: "18:30", title: "Grup Pilates" },
      ]);
    }
  });

  it("Grup Zumba Salı ve Perşembe 16:30 ve 20:00'de", () => {
    for (const day of ["Salı", "Perşembe"]) {
      expect(findSessions(day)).toEqual([
        { time: "16:30", title: "Grup Zumba" },
        { time: "20:00", title: "Grup Zumba" },
      ]);
    }
  });

  it("Core Board Cuma 10:30 ve 18:30'da", () => {
    expect(findSessions("Cuma")).toEqual([
      { time: "10:30", title: "Core Board" },
      { time: "18:30", title: "Core Board" },
    ]);
  });

  it("yalnızca beklenen ders türlerini içerir", () => {
    const titles = new Set(
      weeklySchedule.flatMap((d) => d.sessions.map((s) => s.title)),
    );
    expect(titles).toEqual(new Set(["Grup Pilates", "Grup Zumba", "Core Board"]));
  });

  it("her saat HH:MM biçiminde", () => {
    const times = weeklySchedule.flatMap((d) => d.sessions.map((s) => s.time));
    for (const time of times) {
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    }
  });
});
