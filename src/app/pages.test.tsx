import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FaqPage from "./sss/page";
import ContactPage from "./iletisim/page";
import WomensSalonPage from "./kadinlar-salonu/page";
import { faqItems } from "@/data/faq";
import { womensSalonFaq, womensSalonHighlights } from "@/data/womens-salon";
import { formatAddress, mapsHref } from "@/lib/links";
import { pages } from "@/lib/metadata";

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

describe("/kadinlar-salonu sayfası", () => {
  it("yerel arama ifadesini taşıyan tek h1 gösterir", () => {
    render(<WomensSalonPage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Beykoz Kadınlara Özel Spor Salonu");
    expect(h1s[0]).toHaveTextContent(pages.womens.title);
  });

  it("öne çıkanları gösterir", () => {
    render(<WomensSalonPage />);
    for (const highlight of womensSalonHighlights) {
      expect(screen.getByRole("heading", { level: 3, name: highlight.title })).toBeInTheDocument();
    }
  });

  it("yalnızca kadınlar salonunun saatlerini gösterir", () => {
    render(<WomensSalonPage />);
    expect(screen.getByText("Kadınlar Salonu")).toBeInTheDocument();
    expect(screen.queryByText("Karma Salon")).not.toBeInTheDocument();
  });

  it("adresi, yol tarifini ve üyelik ücretleri bağlantısını verir", () => {
    render(<WomensSalonPage />);
    expect(screen.getByText(formatAddress())).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Yol tarifi al/ })[0]).toHaveAttribute(
      "href",
      mapsHref(),
    );
    expect(screen.getByRole("link", { name: /Ücretleri görün/ })).toHaveAttribute(
      "href",
      "/uyelik",
    );
  });

  it("haftalık ders programını sayfa içi çapayla gösterir", () => {
    const { container } = render(<WomensSalonPage />);
    expect(container.querySelector("section#ders-programi")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Ders programı" })).toHaveAttribute(
      "href",
      "#ders-programi",
    );
    expect(screen.getAllByText("Grup Pilates").length).toBeGreaterThan(0);
  });

  it("yalnızca kadınlar salonuyla ilgili SSS'leri gösterir, kendine bağlanmaz", () => {
    const { container } = render(<WomensSalonPage />);
    const questions = [...container.querySelectorAll("summary")].map((s) => s.textContent);
    expect(questions).toEqual(womensSalonFaq.map((f) => f.question));
    expect(container.querySelector('details a[href="/kadinlar-salonu"]')).toBeNull();
  });

  it("kadınlar salonu mesajlı WhatsApp bağlantısı ve deneme çağrısı verir", () => {
    render(<WomensSalonPage />);
    const cta = screen.getByRole("link", { name: /WhatsApp'tan bilgi alın/ });
    const url = new URL(cta.getAttribute("href")!);
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toMatch(/kadınlar salonu/);
    expect(screen.getByRole("link", { name: /Deneme randevusu al/ })).toBeInTheDocument();
  });

  it("JSON-LD basmaz (FAQPage tek kopya ana sayfadadır)", () => {
    const { container } = render(<WomensSalonPage />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });
});
