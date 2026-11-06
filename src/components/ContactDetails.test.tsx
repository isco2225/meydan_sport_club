import { afterEach, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactDetails from "./ContactDetails";
import {
  formatAddress,
  googleReviewHref,
  mapsHref,
  telHref,
  whatsappHref,
} from "@/lib/links";
import { siteConfig } from "@/lib/site";

describe("ContactDetails", () => {
  it("telefonu tıklanabilir tel: bağlantısı olarak gösterir", () => {
    render(<ContactDetails headingLevel={3} />);
    expect(screen.getByRole("link", { name: siteConfig.phone })).toHaveAttribute(
      "href",
      telHref(),
    );
  });

  it("adresi yeni sekmede açılan harita bağlantısı olarak gösterir", () => {
    render(<ContactDetails headingLevel={3} />);
    const link = screen.getByRole("link", { name: formatAddress() });
    expect(link).toHaveAttribute("href", mapsHref());
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("çalışma saatlerini ve sosyal hesapları içerir", () => {
    render(<ContactDetails headingLevel={3} />);
    expect(screen.getByText("Karma Salon")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `${siteConfig.name} Instagram` }),
    ).toBeInTheDocument();
  });

  it("alt başlıkları çağıranın verdiği düzeyde render eder", () => {
    const { unmount } = render(<ContactDetails headingLevel={2} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Çalışma Saatleri" }),
    ).toBeInTheDocument();
    unmount();

    render(<ContactDetails headingLevel={3} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Çalışma Saatleri" }),
    ).toBeInTheDocument();
  });
});

describe("ContactDetails e-posta", () => {
  const original = siteConfig.email;
  afterEach(() => {
    siteConfig.email = original;
  });

  it("e-posta tanımlı değilken (MX kurulana dek) e-posta satırı göstermez", () => {
    siteConfig.email = null;
    const { container } = render(<ContactDetails headingLevel={3} />);
    expect(screen.queryByText("E-posta")).not.toBeInTheDocument();
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it("e-posta tanımlıysa mailto: bağlantısı olarak gösterir", () => {
    siteConfig.email = "info@ornek.com";
    render(<ContactDetails headingLevel={3} />);
    expect(screen.getByText("E-posta")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "info@ornek.com" })).toHaveAttribute(
      "href",
      "mailto:info@ornek.com",
    );
  });
});

describe("ContactDetails WhatsApp", () => {
  it("WhatsApp hattını yeni sekmede açılan sohbet bağlantısı olarak verir", () => {
    render(<ContactDetails headingLevel={3} />);
    const link = screen.getByRole("link", { name: "WhatsApp'tan yazın" });
    expect(link).toHaveAttribute("href", whatsappHref());
    expect(link).toHaveAttribute("target", "_blank");
  });
});

describe("ContactDetails WhatsApp rengi", () => {
  it("yalnızca WhatsApp satırının ikonu WhatsApp yeşilindedir", () => {
    render(<ContactDetails headingLevel={3} />);
    const iconTile = (name: string) =>
      screen.getByRole("link", { name }).closest("div.flex")!.firstElementChild!;
    expect(iconTile("WhatsApp'tan yazın").className).toContain("text-whatsapp");
    expect(iconTile(siteConfig.phone).className).toContain("text-brand");
    expect(iconTile(siteConfig.phone).className).not.toContain("text-whatsapp");
  });
});

describe("ContactDetails Google yorumu", () => {
  it("Google'da yorum yazma bağlantısını yeni sekmede açar", () => {
    render(<ContactDetails headingLevel={3} />);
    const link = screen.getByRole("link", { name: /Google'da yorum yazın/ });
    expect(link).toHaveAttribute("href", googleReviewHref());
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByRole("heading", { level: 3, name: "Bizi Değerlendirin" }),
    ).toBeInTheDocument();
  });
});
