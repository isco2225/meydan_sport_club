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

  it("alt metinli bir arka plan görseli render eder", () => {
    render(<HeroSection />);
    const image = screen.getByRole("img");
    expect(image).toHaveAccessibleName(/salon/i);
    expect(image.getAttribute("src")).toContain("salon_foto_4");
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
