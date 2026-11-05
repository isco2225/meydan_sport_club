import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TrialCallout from "./TrialCallout";
import { whatsappHref, WHATSAPP_TRIAL_MESSAGE } from "@/lib/links";

describe("TrialCallout", () => {
  it("deneme antrenmanı için hazır mesajlı WhatsApp bağlantısı verir", () => {
    render(<TrialCallout />);
    const link = screen.getByRole("link", { name: "Deneme randevusu al" });
    expect(link).toHaveAttribute("href", whatsappHref(WHATSAPP_TRIAL_MESSAGE));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("çevrimiçi üyelik/satın alma dili kullanmaz", () => {
    render(<TrialCallout />);
    expect(screen.queryByText(/üye ol|satın al|sepete|paketi seç/i)).toBeNull();
  });
});
