import { describe, it, expect, vi, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import HeroSlideshow from "./HeroSlideshow";

const images = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
];

afterEach(() => {
  vi.useRealTimers();
});

describe("HeroSlideshow", () => {
  it("verilen tüm görselleri render eder", () => {
    const { container } = render(<HeroSlideshow images={images} />);
    expect(container.querySelectorAll("img")).toHaveLength(images.length);
  });

  it("başlangıçta yalnızca ilk görsel görünür (opacity-100)", () => {
    const { container } = render(<HeroSlideshow images={images} />);
    const rendered = container.querySelectorAll("img");
    expect(rendered[0].className).toContain("opacity-100");
    expect(rendered[1].className).toContain("opacity-0");
  });

  it("interval sonrası bir sonraki görsele geçer", () => {
    vi.useFakeTimers();
    const { container } = render(
      <HeroSlideshow images={images} intervalMs={5000} />,
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const rendered = container.querySelectorAll("img");
    expect(rendered[0].className).toContain("opacity-0");
    expect(rendered[1].className).toContain("opacity-100");
  });
});
