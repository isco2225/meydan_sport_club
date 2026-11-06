import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkingHours from "./WorkingHours";

describe("WorkingHours", () => {
  it("her iki salonu da başlıklarıyla gösterir", () => {
    render(<WorkingHours />);
    expect(screen.getByText("Karma Salon")).toBeInTheDocument();
    expect(screen.getByText("Kadınlar Salonu")).toBeInTheDocument();
  });

  it("gruplanmış gün ve saat satırlarını gösterir", () => {
    render(<WorkingHours />);
    expect(screen.getByText("Hafta içi")).toBeInTheDocument();
    expect(screen.getByText("09:00 – 23:50")).toBeInTheDocument();
    expect(screen.getByText("Pazartesi – Cumartesi")).toBeInTheDocument();
  });

  it("kapalı günleri 'Kapalı' olarak işaretler", () => {
    render(<WorkingHours />);
    // İki salon da Pazar kapalı → iki adet "Kapalı" beklenir.
    expect(screen.getAllByText("Kapalı")).toHaveLength(2);
  });
});

describe("WorkingHours tek salon", () => {
  it("salon verilince yalnızca o salonun saatlerini gösterir", () => {
    render(<WorkingHours salon="kadinlar" />);
    expect(screen.getByText("Kadınlar Salonu")).toBeInTheDocument();
    expect(screen.queryByText("Karma Salon")).not.toBeInTheDocument();
    expect(screen.getByText("Pazartesi – Cumartesi")).toBeInTheDocument();
    expect(screen.getByText("09:00 – 22:00")).toBeInTheDocument();
    expect(screen.getAllByText("Kapalı")).toHaveLength(1);
  });
});
