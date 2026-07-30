import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FaqSection from "./FaqSection";
import { faqItems } from "@/data/faq";

describe("FaqSection", () => {
  it("başlığı ve tüm soruları gösterir", () => {
    render(<FaqSection />);
    expect(
      screen.getByRole("heading", { name: "Sıkça Sorulan Sorular" }),
    ).toBeInTheDocument();

    for (const item of faqItems) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("bölüm id'si 'sss' olarak render edilir", () => {
    const { container } = render(<FaqSection />);
    expect(container.querySelector("#sss")).not.toBeNull();
  });

  it("her soruda aşağı ok ikonu bulunur", () => {
    const { container } = render(<FaqSection />);
    const icons = container.querySelectorAll('summary svg[aria-hidden="true"]');
    expect(icons).toHaveLength(faqItems.length);
  });

  it("bağlantı tanımlı sorularda bağlantıyı render eder", () => {
    render(<FaqSection />);
    for (const item of faqItems.filter((f) => f.link)) {
      const link = screen.getByRole("link", { name: item.link!.label });
      expect(link).toHaveAttribute("href", item.link!.href);
    }
  });

  it("FAQPage JSON-LD'sini veriyle tutarlı üretir", () => {
    const { container } = render(<FaqSection />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();

    const jsonLd = JSON.parse(script!.textContent ?? "{}");
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(faqItems.length);
    expect(jsonLd.mainEntity[0].name).toBe(faqItems[0].question);
    expect(jsonLd.mainEntity[0].acceptedAnswer.text).toBe(faqItems[0].answer);
  });
});
