import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("tek bir h1 başlık gösterir", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
  });

  it("arka planda hero slideshow görsellerini render eder", () => {
    const { container } = render(<HeroSection />);
    const images = container.querySelectorAll("img");
    // Slideshow birden fazla arka plan görseli serer; ilki hero klasöründendir.
    expect(images.length).toBeGreaterThan(1);
    expect(images[0].getAttribute("src")).toContain("hero-1");
  });

  it("üyelik ücretleri ve ders programı bölümlerine bağlantı verir", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: "Üyelik Ücretleri" }),
    ).toHaveAttribute("href", "/#uyelik");
    expect(
      screen.getByRole("link", { name: "Ders Programı" }),
    ).toHaveAttribute("href", "/#ders-programi");
  });

  it("bölüm id'si 'ust' olarak render edilir", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("#ust")).not.toBeNull();
  });
});
