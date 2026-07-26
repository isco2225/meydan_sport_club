import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { navItems, siteConfig } from "@/lib/site";

// next/navigation'ı test ortamında kullanılabilir kılmak için mock'la.
const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Navbar", () => {
  it("tüm menü öğelerini doğru çapa bağlantılarıyla render eder", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);

    for (const item of navItems) {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
    }
  });

  it("marka logosunu ana sayfaya bağlayan çapa olarak gösterir", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);

    // Logo hem markayı adlandırır (alt) hem de ana sayfa çapasına bağlar.
    const logo = screen.getByRole("img", { name: siteConfig.name });
    expect(logo).toBeInTheDocument();

    const brandLink = screen.getByRole("link", { name: siteConfig.name });
    expect(brandLink).toHaveAttribute("href", "/#ust");
  });

  it("ücretsiz deneme CTA'sı iletişim bölümüne bağlanır", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);

    const cta = screen.getByRole("link", { name: "Ücretsiz Deneme" });
    expect(cta).toHaveAttribute("href", "/#iletisim");
  });

  it("çevrimiçi üye olma / 'Üye Ol' butonu göstermez", () => {
    render(<Navbar />);
    expect(screen.queryByRole("link", { name: /üye ol/i })).toBeNull();
  });
});
