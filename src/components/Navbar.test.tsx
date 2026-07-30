import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("çevrimiçi üye olma / 'Üye Ol' butonu göstermez", () => {
    render(<Navbar />);
    expect(screen.queryByRole("link", { name: /üye ol/i })).toBeNull();
  });
});

describe("Navbar mobil menü", () => {
  it("başlangıçta kapalıdır", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);

    expect(document.getElementById("mobil-menu")).toBeNull();
    expect(screen.getByRole("button", { name: "Menüyü aç" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("butona tıklanınca açılır ve tüm bağlantıları gösterir", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "Menüyü aç" }));

    const menu = document.getElementById("mobil-menu");
    expect(menu).not.toBeNull();
    expect(menu!.querySelectorAll("a")).toHaveLength(navItems.length);
    expect(
      screen.getByRole("button", { name: "Menüyü kapat" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("bir bağlantıya tıklanınca kapanır", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "Menüyü aç" }));
    fireEvent.click(document.getElementById("mobil-menu")!.querySelector("a")!);

    expect(document.getElementById("mobil-menu")).toBeNull();
  });

  it("Escape tuşuyla kapanır", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "Menüyü aç" }));
    fireEvent.keyDown(document.getElementById("mobil-menu")!, {
      key: "Escape",
    });

    expect(document.getElementById("mobil-menu")).toBeNull();
  });
});
