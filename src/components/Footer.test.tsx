import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { navItems, siteConfig } from "@/lib/site";

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
