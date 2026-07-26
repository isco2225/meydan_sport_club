import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Section from "./Section";

describe("Section", () => {
  it("verilen id ile bir section render eder ve çocukları gösterir", () => {
    const { container } = render(
      <Section id="uyelik">
        <h2>Üyelik Ücretleri</h2>
      </Section>,
    );

    const section = container.querySelector("section#uyelik");
    expect(section).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "Üyelik Ücretleri" }),
    ).toBeInTheDocument();
  });

  it("navbar yüksekliğini düşerek ekrana sığar", () => {
    const { container } = render(<Section id="test">içerik</Section>);
    const section = container.querySelector("section")!;

    // Sticky navbar ekranın üstünden `--nav-h` kadar yer kapar. Bölüm tam
    // 100svh olursa her zaman ekranın altından taşar; kalan alan kullanılır.
    expect(section.className).toContain("min-h-[calc(100svh-var(--nav-h))]");
    expect(section.className).not.toContain("min-h-[100svh]");
  });

  it("çapa telafisini tekrarlamaz (globals.css'teki scroll-padding-top tek kaynak)", () => {
    const { container } = render(<Section id="test">içerik</Section>);
    const section = container.querySelector("section")!;

    // `scroll-mt-*` ile `scroll-padding-top` toplanır ve çapa hedefi bir
    // navbar boyu aşağı kayar; telafi yalnızca globals.css'te yapılır.
    expect(section.className).not.toMatch(/\bscroll-mt-/);
  });

  it("içeriği dikeyde ortalar", () => {
    const { container } = render(<Section id="test">içerik</Section>);
    const section = container.querySelector("section")!;

    expect(section.className).toContain("items-center");
  });

  it("muted verildiğinde arka planı farklılaştırır", () => {
    const { container: plain } = render(<Section id="a">a</Section>);
    const { container: muted } = render(
      <Section id="b" muted>
        b
      </Section>,
    );

    expect(plain.querySelector("section")!.className).not.toContain(
      "bg-foreground/[0.02]",
    );
    expect(muted.querySelector("section")!.className).toContain(
      "bg-foreground/[0.02]",
    );
  });
});
