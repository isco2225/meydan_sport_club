import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JsonLd from "@/components/JsonLd";
import HomePage from "@/app/page";
import { faqItems } from "@/data/faq";
import { openingHoursSpecification, salonSchedules } from "@/data/hours";
import { mapsHref } from "./links";
import { faqPageJsonLd, gymJsonLd } from "./structured-data";
import { siteConfig } from "./site";

describe("gymJsonLd (ExerciseGym)", () => {
  const data = gymJsonLd();

  it("doğru tür ve kanonik URL ile işletmeyi tanımlar", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("ExerciseGym");
    expect(data.name).toBe(siteConfig.name);
    expect(data.url).toBe("https://www.meydansportclub.com/");
  });

  it("adres, telefon ve e-postayı siteConfig'ten türetir", () => {
    expect(data.telephone).toBe(siteConfig.phone);
    expect(data.email).toBe(siteConfig.email);
    expect(data.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Ortaçeşme, Çayır Cd. No:224/2",
      postalCode: "34825",
      addressLocality: "Beykoz",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    });
    expect(data.hasMap).toBe(mapsHref());
  });

  it("ana saatler karma salondan, kadınlar salonu ayrı department olarak gelir", () => {
    const karma = salonSchedules.find((s) => s.id === "karma")!;
    const kadinlar = salonSchedules.find((s) => s.id === "kadinlar")!;

    expect(data.openingHoursSpecification).toEqual(
      openingHoursSpecification(karma.week),
    );
    expect(data.department).toEqual([
      {
        "@type": "ExerciseGym",
        name: `${siteConfig.name} Kadınlar Salonu`,
        openingHoursSpecification: openingHoursSpecification(kadinlar.week),
      },
    ]);
  });

  it("görselleri ve sosyal hesapları mutlak URL olarak verir", () => {
    const withGallery = gymJsonLd(["/images/galeri/ornek.jpg"]);
    for (const url of withGallery.image) {
      expect(url.startsWith("https://www.meydansportclub.com/")).toBe(true);
    }
    expect(withGallery.image).toContain(
      "https://www.meydansportclub.com/images/galeri/ornek.jpg",
    );
    expect(data.sameAs).toEqual(Object.values(siteConfig.social));
  });
});

describe("faqPageJsonLd", () => {
  it("her soru için Question/Answer çifti üretir", () => {
    const data = faqPageJsonLd();
    expect(data.mainEntity).toHaveLength(faqItems.length);
    expect(data.mainEntity[0]).toEqual({
      "@type": "Question",
      name: faqItems[0].question,
      acceptedAnswer: { "@type": "Answer", text: faqItems[0].answer },
    });
  });
});

describe("JsonLd", () => {
  it("< karakterini kaçışlar; veri </script> ile etiketi kapatamaz", () => {
    const { container } = render(
      <JsonLd data={{ name: "</script><script>alert(1)</script>" }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]')!;
    expect(script.innerHTML).not.toContain("</script>");
    expect(script.innerHTML).toContain("\\u003c/script>");
    expect(JSON.parse(script.textContent ?? "{}").name).toBe(
      "</script><script>alert(1)</script>",
    );
  });
});

describe("ana sayfa", () => {
  it("ExerciseGym ve FAQPage JSON-LD'lerini birer kez basar", () => {
    const { container } = render(<HomePage />);
    const types = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ].map((s) => JSON.parse(s.textContent ?? "{}")["@type"]);
    expect(types.sort()).toEqual(["ExerciseGym", "FAQPage"]);
  });
});
