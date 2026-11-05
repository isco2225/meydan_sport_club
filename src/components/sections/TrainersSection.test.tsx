import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TrainersSection from "./TrainersSection";
import { trainers } from "@/data/trainers";

describe("TrainersSection", () => {
  it("bölüm başlığını ve tüm antrenörleri h3 olarak gösterir", () => {
    render(<TrainersSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Antrenörlerimiz" }),
    ).toBeInTheDocument();
    for (const trainer of trainers) {
      expect(
        screen.getByRole("heading", { level: 3, name: trainer.name }),
      ).toBeInTheDocument();
    }
  });

  it("kişisel antrenman için hazır mesajlı WhatsApp bağlantısı verir", () => {
    render(<TrainersSection />);
    const link = screen.getByRole("link", { name: /kişisel antrenman/i });
    const url = new URL(link.getAttribute("href")!);
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toMatch(/kişisel antrenman/i);
  });
});
