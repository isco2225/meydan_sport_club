import { afterEach, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { navItems, siteConfig } from "@/lib/site";
import {
  formatAddress,
  mapsHref,
  telHref,
  whatsappHref,
} from "@/lib/links";

describe("Footer", () => {
  it("marka logosunu başlık olarak gösterir", () => {
    render(<Footer />);

    // Logo görseli marka adıyla adlandırılır; kelime işareti aria-hidden olduğu
    // için başlığın erişilebilir adı yalnızca logonun alt metninden gelir.
    const logo = screen.getByRole("img", { name: siteConfig.name });
    expect(logo).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: siteConfig.name }),
    ).toBeInTheDocument();
  });

  it("tüm menü öğelerini doğru çapa bağlantılarıyla listeler", () => {
    render(<Footer />);

    for (const item of navItems) {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
    }
  });
});

describe("Footer iletişim ve saatler", () => {
  it("telefon, WhatsApp ve adres bağlantılarını içerir", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: siteConfig.phone })).toHaveAttribute(
      "href",
      telHref(),
    );
    expect(screen.getByRole("link", { name: "WhatsApp'tan yazın" })).toHaveAttribute(
      "href",
      whatsappHref(),
    );
    expect(screen.getByRole("link", { name: formatAddress() })).toHaveAttribute(
      "href",
      mapsHref(),
    );
  });

  it("çalışma saatlerini ve sosyal hesapları gösterir", () => {
    render(<Footer />);
    expect(screen.getByText("Karma Salon")).toBeInTheDocument();
    expect(screen.getByText("Kadınlar Salonu")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `${siteConfig.name} Instagram` }),
    ).toBeInTheDocument();
  });

  it("telif satırında güncel yılı gösterir", () => {
    render(<Footer />);
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()}`)),
    ).toBeInTheDocument();
  });
});

describe("Footer e-posta", () => {
  const original = siteConfig.email;
  afterEach(() => {
    siteConfig.email = original;
  });

  it("e-posta tanımlı değilken mailto: bağlantısı göstermez", () => {
    siteConfig.email = null;
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it("e-posta tanımlıysa mailto: bağlantısı gösterir", () => {
    siteConfig.email = "info@ornek.com";
    render(<Footer />);
    expect(screen.getByRole("link", { name: "info@ornek.com" })).toHaveAttribute(
      "href",
      "mailto:info@ornek.com",
    );
  });
});

describe("Footer kadınlar salonu", () => {
  it("menünün altında kadınlar salonu sayfasına bağlanır", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Kadınlara Özel Salon" })).toHaveAttribute(
      "href",
      "/kadinlar-salonu",
    );
  });
});
