import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FaqList from "./FaqList";
import { faqItems } from "@/data/faq";
import { mapsHref } from "@/lib/links";

describe("FaqList bağlantıları", () => {
  it("harita gibi dış bağlantıyı yeni sekmede açar", () => {
    render(<FaqList />);
    const link = screen.getByRole("link", { name: "Yol tarifi al" });
    expect(link).toHaveAttribute("href", mapsHref());
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("site içi bağlantıyı aynı sekmede açar", () => {
    render(<FaqList />);
    const link = screen.getByRole("link", { name: "Detaylı görün" });
    expect(link).toHaveAttribute("href", "/#iletisim");
    expect(link).not.toHaveAttribute("target");
  });

  it("bağlantısı olan her soru için tek bağlantı render eder", () => {
    const { container } = render(<FaqList />);
    expect(container.querySelectorAll("details a")).toHaveLength(
      faqItems.filter((item) => item.link).length,
    );
  });
});
