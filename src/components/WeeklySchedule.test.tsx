import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import WeeklySchedule from "./WeeklySchedule";
import { weeklySchedule } from "@/data/schedule";

describe("WeeklySchedule", () => {
  it("her ders gününü verilen düzeyde başlık olarak gösterir", () => {
    render(<WeeklySchedule headingLevel={3} />);
    for (const day of weeklySchedule) {
      expect(
        screen.getByRole("heading", { level: 3, name: day.day }),
      ).toBeInTheDocument();
    }
  });

  it("her dersi saatiyle birlikte listeler", () => {
    render(<WeeklySchedule headingLevel={2} />);
    for (const day of weeklySchedule) {
      const column = screen.getByRole("heading", { level: 2, name: day.day })
        .parentElement!;
      for (const session of day.sessions) {
        expect(within(column).getAllByText(session.time).length).toBeGreaterThan(0);
      }
      expect(within(column).getAllByRole("listitem")).toHaveLength(day.sessions.length);
    }
  });

  it("ders türleri açıklamasında her türü bir kez listeler", () => {
    render(<WeeklySchedule headingLevel={3} />);
    const legend = screen.getByRole("list", { name: "Ders türleri" });
    const titles = new Set(
      weeklySchedule.flatMap((d) => d.sessions.map((s) => s.title)),
    );
    expect(within(legend).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      ...titles,
    ]);
  });
});
