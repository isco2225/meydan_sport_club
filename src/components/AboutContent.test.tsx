import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutContent from "./AboutContent";
import { aboutHighlights, aboutStory, aboutValues } from "@/data/about";
import { galleryImages } from "@/data/gallery";

describe("AboutContent", () => {
  it("hikayeyi, değerleri ve öne çıkanları gösterir", () => {
    render(<AboutContent headingLevel={3} />);
    expect(screen.getByText(aboutStory[0])).toBeInTheDocument();
    for (const value of aboutValues) {
      expect(screen.getByText(value.description)).toBeInTheDocument();
    }
    for (const highlight of aboutHighlights) {
      expect(screen.getByText(highlight.title)).toBeInTheDocument();
    }
  });

  it("salon fotoğraflarını alt metinleriyle gösterir", () => {
    render(<AboutContent headingLevel={3} />);
    for (const image of galleryImages) {
      expect(screen.getByRole("img", { name: image.alt })).toBeInTheDocument();
    }
  });

  it("başlık hiyerarşisini çağıranın düzeyine göre kurar", () => {
    const { unmount } = render(<AboutContent headingLevel={3} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Neden Meydan?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: aboutHighlights[0].title }),
    ).toBeInTheDocument();
    unmount();

    render(<AboutContent headingLevel={2} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Neden Meydan?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: aboutHighlights[0].title }),
    ).toBeInTheDocument();
  });
});
