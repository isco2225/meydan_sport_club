import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HighlightGrid from "./HighlightGrid";

const items = [
  { title: "Birinci", description: "İlk kart." },
  {
    title: "İkinci",
    description: "Bağlantılı kart.",
    link: { label: "Ayrıntı", href: "/kadinlar-salonu" },
  },
];

describe("HighlightGrid", () => {
  it("kartları numaralı ve çağıranın başlık düzeyinde gösterir", () => {
    const { container } = render(<HighlightGrid items={items} headingLevel={3} />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Birinci",
      "İkinci",
    ]);
    expect(container.textContent).toContain("01");
    expect(container.textContent).toContain("02");
  });

  it("yalnızca bağlantısı olan kartta bağlantı gösterir", () => {
    render(<HighlightGrid items={items} headingLevel={4} />);
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(2);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("Ayrıntı");
    expect(links[0]).toHaveAttribute("href", "/kadinlar-salonu");
  });
});
