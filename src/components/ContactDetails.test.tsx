import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactDetails from "./ContactDetails";
import {
  formatAddress,
  mailtoHref,
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

  it("e-postayı mailto: bağlantısı olarak gösterir", () => {
    render(<ContactDetails headingLevel={3} />);
    expect(screen.getByRole("link", { name: siteConfig.email })).toHaveAttribute(
      "href",
      mailtoHref(),
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

describe("ContactDetails WhatsApp", () => {
  it("WhatsApp hattını yeni sekmede açılan sohbet bağlantısı olarak verir", () => {
    render(<ContactDetails headingLevel={3} />);
    const link = screen.getByRole("link", { name: "WhatsApp'tan yazın" });
    expect(link).toHaveAttribute("href", whatsappHref());
    expect(link).toHaveAttribute("target", "_blank");
  });
});
