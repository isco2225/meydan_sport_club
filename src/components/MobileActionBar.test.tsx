import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import MobileActionBar from "./MobileActionBar";
import { mapsHref, telHref, whatsappHref } from "@/lib/links";

describe("MobileActionBar", () => {
  it("Ara, WhatsApp ve Yol Tarifi eylemlerini doğru bağlantılarla verir", () => {
    render(<MobileActionBar />);
    const bar = screen.getByRole("navigation", { name: "Hızlı iletişim" });
    const scope = within(bar);

    expect(scope.getByRole("link", { name: "Ara" })).toHaveAttribute("href", telHref());
    expect(scope.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      whatsappHref(),
    );
    expect(scope.getByRole("link", { name: "Yol Tarifi" })).toHaveAttribute(
      "href",
      mapsHref(),
    );
  });

  it("dış bağlantılar yeni sekmede ve güvenli rel ile açılır; arama aynı sekmede", () => {
    render(<MobileActionBar />);
    for (const name of ["WhatsApp", "Yol Tarifi"]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByRole("link", { name: "Ara" })).not.toHaveAttribute("target");
  });

  it("yalnızca mobilde görünür (md ve üstünde gizli)", () => {
    render(<MobileActionBar />);
    expect(screen.getByRole("navigation").className).toContain("md:hidden");
  });
});

describe("MobileActionBar renkleri", () => {
  it("WhatsApp butonu WhatsApp yeşilinde ve siyah yazılıdır; diğerleri nötr", () => {
    render(<MobileActionBar />);
    const whatsapp = screen.getByRole("link", { name: "WhatsApp" });
    expect(whatsapp.className).toContain("bg-whatsapp");
    expect(whatsapp.className).toContain("text-black");
    for (const name of ["Ara", "Yol Tarifi"]) {
      expect(screen.getByRole("link", { name }).className).not.toContain("bg-whatsapp");
    }
  });
});
