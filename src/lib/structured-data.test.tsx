import { afterEach, describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JsonLd from "@/components/JsonLd";
import HomePage from "@/app/page";
import { faqItems } from "@/data/faq";
import { openingHoursSpecification, salonSchedules } from "@/data/hours";
import { formatTRY, membershipPlans, membershipPriceBounds } from "@/data/membership";
import { mapsHref } from "./links";
import { faqPageJsonLd, gymJsonLd } from "./structured-data";
import { siteConfig } from "./site";

describe("gymJsonLd e-posta", () => {
  const original = siteConfig.email;
  afterEach(() => {
    siteConfig.email = original;
  });

  it("e-posta tanımlı değilken (sitede görünmüyorken) bildirilmez", () => {
    siteConfig.email = null;
    expect(gymJsonLd()).not.toHaveProperty("email");
  });

  it("e-posta tanımlıysa siteConfig'teki adresi bildirir", () => {
    siteConfig.email = "info@ornek.com";
    expect(gymJsonLd().email).toBe("info@ornek.com");
  });
});

describe("gymJsonLd (ExerciseGym)", () => {
  const data = gymJsonLd();

  it("doğru tür ve kanonik URL ile işletmeyi tanımlar", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("ExerciseGym");
    expect(data.name).toBe(siteConfig.name);
    expect(data.url).toBe("https://www.meydansportclub.com/");
  });

  it("adres ve telefonu siteConfig'ten türetir", () => {
    // Görünen numara yerel biçimdedir; JSON-LD'de Google ülke kodunu ister.
    expect(data.telephone).toBe("+90 532 228 26 22");
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
        "@id": "https://www.meydansportclub.com/kadinlar-salonu#salon",
        name: `${siteConfig.name} Kadınlar Salonu`,
        url: "https://www.meydansportclub.com/kadinlar-salonu",
        image: ["https://www.meydansportclub.com/images/og/meydan-sport-club.jpg"],
        telephone: data.telephone,
        address: data.address,
        priceRange: data.priceRange,
        openingHoursSpecification: openingHoursSpecification(kadinlar.week),
      },
    ]);
  });

  it("kadınlar salonu bölümü Google'ın istediği alanların hepsini taşır", () => {
    // Zengin Sonuçlar Testi (6 Kas 2026) bölüm için bu alanları istedi.
    const [kadinlarDept] = data.department;
    for (const field of ["priceRange", "address", "telephone", "image"] as const) {
      expect(kadinlarDept[field], field).toBeTruthy();
    }
    expect(kadinlarDept.telephone).toBe("+90 532 228 26 22");
    expect(kadinlarDept.address.streetAddress).toBe("Ortaçeşme, Çayır Cd. No:224/2");
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

describe("gymJsonLd yerel sinyaller", () => {
  const data = gymJsonLd();

  it("haritadaki konumu GeoCoordinates olarak verir", () => {
    expect(data.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    });
    // Beykoz Ortaçeşme civarı (yanlış/ters yazılmış koordinatı yakalar).
    expect(data.geo.latitude).toBeGreaterThan(41.1);
    expect(data.geo.latitude).toBeLessThan(41.2);
    expect(data.geo.longitude).toBeGreaterThan(29.0);
    expect(data.geo.longitude).toBeLessThan(29.2);
  });

  it("harita bağlantısı İşletme Profili'nin Place ID'sini taşır", () => {
    expect(new URL(data.hasMap).searchParams.get("query_place_id")).toBe(
      siteConfig.googlePlaceId,
    );
  });

  it("hizmet bölgesi ilçedir (Beykoz)", () => {
    expect(data.areaServed).toEqual({
      "@type": "AdministrativeArea",
      name: "Beykoz, İstanbul",
    });
  });

  it("fiyat aralığı görünen üyelik ücretlerinden türetilir", () => {
    const { min, max } = membershipPriceBounds();
    expect(data.priceRange).toBe(`${formatTRY(min)} – ${formatTRY(max)}`);
  });

  it("teklif kataloğu her plan için standart ve öğrenci fiyatını içerir", () => {
    const catalog = data.hasOfferCatalog;
    expect(catalog["@type"]).toBe("OfferCatalog");
    expect(catalog.url).toBe("https://www.meydansportclub.com/uyelik");
    expect(catalog.itemListElement).toHaveLength(membershipPlans.length * 2);
    for (const plan of membershipPlans) {
      expect(catalog.itemListElement).toContainEqual({
        "@type": "Offer",
        name: `${plan.label} Üyelik`,
        price: plan.standardPrice,
        priceCurrency: "TRY",
      });
      expect(catalog.itemListElement).toContainEqual(
        expect.objectContaining({
          name: `${plan.label} Öğrenci Üyeliği`,
          price: plan.studentPrice,
          priceCurrency: "TRY",
        }),
      );
    }
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
