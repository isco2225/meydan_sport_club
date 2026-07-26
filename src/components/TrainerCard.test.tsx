import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TrainerCard from "./TrainerCard";
import type { Trainer } from "@/data/trainers";

const withPhoto: Trainer = {
  id: "ali-sirganci",
  name: "Ali Sırgancı",
  title: "Antrenör",
  bio: "Tekrar bizimle çalışmaya başlamıştır.",
  photo: "/images/antrenorler/ali-sirganci.jpg",
};

const withoutPhoto: Trainer = {
  id: "zeynep-kaya",
  name: "Zeynep Kaya",
  title: "Yoga Eğitmeni",
  bio: "Zihin ve beden dengesine odaklanır.",
};

describe("TrainerCard", () => {
  it("fotoğrafı olan antrenörde görseli alt metniyle gösterir", () => {
    render(<TrainerCard trainer={withPhoto} headingLevel={3} />);

    const image = screen.getByRole("img", {
      name: "Ali Sırgancı — Antrenör",
    });
    // next/image src'yi optimizer yoluna sarar; kaynak dosya adı korunur.
    expect(image.getAttribute("src")).toContain("ali-sirganci.jpg");
  });

  it("fotoğrafı olmayan antrenörde görsel yerine baş harfi gösterir", () => {
    const { container } = render(
      <TrainerCard trainer={withoutPhoto} headingLevel={3} />,
    );

    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("Z")).toBeInTheDocument();
  });

  it("ad, ünvan ve biyografiyi render eder", () => {
    render(<TrainerCard trainer={withoutPhoto} headingLevel={3} />);

    expect(screen.getByText("Zeynep Kaya")).toBeInTheDocument();
    expect(screen.getByText("Yoga Eğitmeni")).toBeInTheDocument();
    expect(
      screen.getByText("Zihin ve beden dengesine odaklanır."),
    ).toBeInTheDocument();
  });

  it("kartta branş/uzmanlık etiketi listesi yoktur", () => {
    const { container } = render(
      <TrainerCard trainer={withPhoto} headingLevel={3} />,
    );

    expect(container.querySelector("ul")).toBeNull();
  });

  it("başlık düzeyini çağıranın verdiği seviyede render eder", () => {
    const { unmount } = render(
      <TrainerCard trainer={withPhoto} headingLevel={2} />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Ali Sırgancı" }),
    ).toBeInTheDocument();
    unmount();

    render(<TrainerCard trainer={withPhoto} headingLevel={3} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Ali Sırgancı" }),
    ).toBeInTheDocument();
  });
});
