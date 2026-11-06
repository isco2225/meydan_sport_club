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

  it("tek h1, yerel arama ifadesini (konum + spor salonu) sloganla birlikte taşır", () => {
    render(<HeroSection />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAccessibleName(
      "Beykoz Ortaçeşme Spor Salonu — Kendine Meydan Oku",
    );
  });

  it("alt metin konumu ve kadınlara özel salonu anar", () => {
    render(<HeroSection />);
    expect(screen.getByText(/kadınlara özel ayrı salon/)).toBeInTheDocument();
    expect(screen.getByText(/Beykoz'da hedefin ne olursa olsun/)).toBeInTheDocument();
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

  it("keşfet butonu bir sonraki bölüme (hakkımızda) bağlanır", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: "Keşfet" })).toHaveAttribute(
      "href",
      "/#hakkimizda",
    );
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

describe("HeroSection birincil eylem", () => {
  it("ücretsiz deneme antrenmanı için hazır mesajlı WhatsApp bağlantısı verir", () => {
    render(<HeroSection />);
    const cta = screen.getByRole("link", { name: "Ücretsiz Deneme Antrenmanı" });
    const url = new URL(cta.getAttribute("href")!);
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toMatch(/deneme antrenmanı/i);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });
});
