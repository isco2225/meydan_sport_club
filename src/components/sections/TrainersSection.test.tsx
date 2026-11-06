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

describe("TrainersSection fotoğrafsız antrenörler", () => {
  it("fotoğrafı olmayan antrenörde boş çerçeve içinde baş harfi gösterir", () => {
    const { container } = render(<TrainersSection />);
    const withoutPhoto = trainers.filter((t) => !t.photo);
    expect(withoutPhoto.length).toBeGreaterThan(0);
    // Fotoğraflı antrenör sayısı kadar görsel vardır; diğerleri harfle gelir.
    expect(container.querySelectorAll("article img")).toHaveLength(
      trainers.length - withoutPhoto.length,
    );
    for (const trainer of withoutPhoto) {
      const card = screen.getByRole("heading", { level: 3, name: trainer.name }).closest("article")!;
      expect(card.textContent).toContain(trainer.name.charAt(0));
      expect(card.querySelector("img")).toBeNull();
    }
  });
});
