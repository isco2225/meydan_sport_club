import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FaqPage from "./sss/page";
import ContactPage from "./iletisim/page";
import { faqItems } from "@/data/faq";

// ContactForm sunucu action'ını içe aktarır; sayfa testinde Resend'e gerek yok.
vi.mock("@/lib/contact-action", () => ({ sendContactMessage: vi.fn() }));

describe("/sss sayfası", () => {
  it("tek h1 ve tüm soruları gösterir", () => {
    render(<FaqPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const item of faqItems) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("FAQPage JSON-LD basmaz (sitede tek kopya ana sayfadadır)", () => {
    const { container } = render(<FaqPage />);
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toBeNull();
  });
});

describe("/iletisim sayfası", () => {
  it("tek h1 ile iletişim bilgilerini ve çalışan formu gösterir", () => {
    render(<ContactPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByLabelText("Ad Soyad")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gönder" })).toBeInTheDocument();
  });

  it("form, alanları URL'ye yazan iskelet (GET) form değildir", () => {
    const { container } = render(<ContactPage />);
    const form = container.querySelector("form")!;
    // Eski iskelet formun ne handler'ı ne honeypot'u vardı; alanlar GET'le
    // adres çubuğuna düşüyordu. Gerçek ContactForm tarayıcı doğrulamasını
    // kapatır (Zod mesajları gösterilir) ve honeypot alanı taşır.
    expect(form).toHaveAttribute("novalidate");
    expect(form.querySelector('input[name="website"]')).not.toBeNull();
  });
});
