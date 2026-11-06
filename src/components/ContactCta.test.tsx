import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactCta from "./ContactCta";
import { telHref, whatsappHref } from "@/lib/links";
import { siteConfig } from "@/lib/site";

describe("ContactCta", () => {
  it("WhatsApp sohbetini yeni sekmede açar", () => {
    render(<ContactCta headingLevel={3} />);
    const link = screen.getByRole("link", { name: /WhatsApp'tan yazın/ });
    expect(link).toHaveAttribute("href", whatsappHref());
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("telefonu tel: bağlantısıyla gösterir", () => {
    render(<ContactCta headingLevel={3} />);
    expect(screen.getByRole("link", { name: siteConfig.phone })).toHaveAttribute(
      "href",
      telHref(),
    );
  });

  it("başlığı çağıranın verdiği düzeyde render eder", () => {
    const { unmount } = render(<ContactCta headingLevel={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "Hemen ulaşın" })).toBeInTheDocument();
    unmount();
    render(<ContactCta headingLevel={3} />);
    expect(screen.getByRole("heading", { level: 3, name: "Hemen ulaşın" })).toBeInTheDocument();
  });

  it("form ya da e-posta alanı içermez", () => {
    const { container } = render(<ContactCta headingLevel={3} />);
    expect(container.querySelector("form, input, textarea")).toBeNull();
  });
});
