import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("sayfanın tek h1'ini ve açıklamasını gösterir", () => {
    render(<PageHeader title="Ders Programı" description="Açıklama metni" />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Ders Programı" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Açıklama metni")).toBeInTheDocument();
  });

  it("ana sayfaya dönüş bağlantısı verir", () => {
    render(<PageHeader title="SSS" />);
    expect(screen.getByRole("link", { name: "Ana Sayfa" })).toHaveAttribute("href", "/");
  });
});
