import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ScheduleSection from "./ScheduleSection";

describe("ScheduleSection", () => {
  it("kadınlar salonu uyarısını ve ders programı başlığını gösterir", () => {
    render(<ScheduleSection />);
    expect(
      screen.getByRole("heading", { name: "Ders Programı" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Kadınlar Salonu")).toBeInTheDocument();
    expect(
      screen.getByText(/karma salon için ders programı bulunmamaktadır/i),
    ).toBeInTheDocument();
  });

  it("bölüm id'si 'ders-programi' olarak render edilir", () => {
    const { container } = render(<ScheduleSection />);
    expect(container.querySelector("#ders-programi")).not.toBeNull();
  });

  it("tüm ders türlerini listeler", () => {
    render(<ScheduleSection />);
    expect(screen.getAllByText("Grup Pilates").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Grup Zumba").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Core Board").length).toBeGreaterThan(0);
  });
});
