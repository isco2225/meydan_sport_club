import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialLinks from "./SocialLinks";
import { siteConfig } from "@/lib/site";

describe("SocialLinks", () => {
  it("siteConfig'te tanımlı her hesap için doğru bağlantı üretir", () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(Object.keys(siteConfig.social).length);

    for (const url of Object.values(siteConfig.social)) {
      const link = links.find((el) => el.getAttribute("href") === url);
      expect(link).toBeDefined();
    }
  });

  it("dış bağlantılar yeni sekmede ve güvenli rel ile açılır", () => {
    render(<SocialLinks />);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("her bağlantının erişilebilir bir adı vardır", () => {
    render(<SocialLinks />);
    expect(
      screen.getByRole("link", { name: `${siteConfig.name} Instagram` }),
    ).toHaveAttribute("href", siteConfig.social.instagram);
    expect(
      screen.getByRole("link", { name: `${siteConfig.name} YouTube` }),
    ).toHaveAttribute("href", siteConfig.social.youtube);
  });
});
