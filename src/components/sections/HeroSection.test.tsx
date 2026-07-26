import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("iddialı 'Kendine Meydan Oku' başlığını tek h1 olarak gösterir", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { level: 1, name: /kendine meydan oku/i }),
    ).toBeInTheDocument();
  });

  it("iddialı alt metni gösterir", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/doğru adres Meydan Sport Club/),
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

  it("Section gibi navbar yüksekliğini düşer ve çapa telafisini tekrarlamaz", () => {
    const { container } = render(<HeroSection />);
    // Hero, Section bileşenini sarmaz; kendi <section>'ını kurduğu için aynı
    // yükseklik ve çapa kurallarını burada da ayrıca korumak gerekir.
    const section = container.querySelector("section#ust")!;

    expect(section.className).toContain("min-h-[calc(100svh-var(--nav-h))]");
    expect(section.className).not.toMatch(/\bscroll-mt-/);
  });
});
