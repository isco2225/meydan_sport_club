import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { navItems } from "@/lib/site";

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

  it("'Üye Ol' butonu üyelik bölümüne bağlanır", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Üye Ol" })).toHaveAttribute(
      "href",
      "/#uyelik",
    );
  });
});
