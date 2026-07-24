import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import MembershipPricing from "./MembershipPricing";
import { membershipPlans, extraFees, formatTRY } from "@/data/membership";

describe("MembershipPricing", () => {
  it("her süre için bir kart, standart ve öğrenci fiyatıyla gösterir", () => {
    render(<MembershipPricing />);
    for (const plan of membershipPlans) {
      const card = screen
        .getByRole("heading", { name: plan.label })
        .closest("li");
      expect(card).not.toBeNull();

      const scope = within(card!);
      expect(scope.getByText(formatTRY(plan.standardPrice))).toBeInTheDocument();
      expect(scope.getByText(formatTRY(plan.studentPrice))).toBeInTheDocument();
      expect(scope.getByText("Öğrenci")).toBeInTheDocument();
    }
  });

  it("aylık maliyeti en düşük planı 'En Avantajlı' rozetiyle işaretler", () => {
    render(<MembershipPricing />);
    const best = membershipPlans.reduce((b, p) =>
      p.standardPrice / p.months < b.standardPrice / b.months ? p : b,
    );
    const badge = screen.getByText("En Avantajlı");
    const card = badge.closest("li");
    expect(within(card!).getByRole("heading", { name: best.label })).toBeInTheDocument();
  });

  it("ek ücretleri (kart/barkod, günlük giriş) listeler", () => {
    render(<MembershipPricing />);
    for (const fee of extraFees) {
      expect(screen.getByText(new RegExp(fee.label))).toBeInTheDocument();
      expect(screen.getByText(formatTRY(fee.price))).toBeInTheDocument();
    }
  });

  it("çevrimiçi üye olma / satın alma butonu içermez", () => {
    render(<MembershipPricing />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByText(/paketi seç|üye ol|satın al|sepete/i)).toBeNull();
  });
});
