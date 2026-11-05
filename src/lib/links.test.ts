import { describe, it, expect } from "vitest";
import {
  formatAddress,
  internationalPhone,
  toE164,
  mailtoHref,
  mapsHref,
  telHref,
  whatsappHref,
  WHATSAPP_DEFAULT_MESSAGE,
} from "./links";
import { siteConfig } from "./site";

describe("telHref", () => {
  it("boşlukları atar ve uluslararası + önekini korur", () => {
    expect(telHref("+90 532 228 26 22")).toBe("tel:+905322282622");
  });

  it("yerel biçimi (0532…) ülke koduyla uluslararası bağlantıya çevirir", () => {
    expect(telHref("0532 228 26 22")).toBe("tel:+905322282622");
  });

  it("varsayılan olarak siteConfig telefonunu kullanır", () => {
    expect(telHref()).toBe("tel:+905322282622");
  });
});

describe("görünen iletişim bilgileri (Google İşletme Profili ile aynı)", () => {
  it("telefon Google profilindeki biçimdedir", () => {
    expect(siteConfig.phone).toBe("0532 228 26 22");
  });

  it("adres Google profilindeki satırla birebir aynıdır", () => {
    expect(formatAddress()).toBe(
      "Ortaçeşme, Çayır Cd. No:224/2, 34825 Beykoz/İstanbul",
    );
  });
});

describe("toE164 / internationalPhone", () => {
  it("yerel ve uluslararası girdileri aynı E.164 numarasına indirger", () => {
    expect(toE164("0532 228 26 22")).toBe("+905322282622");
    expect(toE164("+90 532 228 26 22")).toBe("+905322282622");
  });

  it("okunur uluslararası biçim üretir", () => {
    expect(internationalPhone("0532 228 26 22")).toBe("+90 532 228 26 22");
    expect(internationalPhone("+90 532 228 26 22")).toBe("+90 532 228 26 22");
  });
});

describe("mailtoHref", () => {
  it("siteConfig e-postasına mailto bağlantısı üretir", () => {
    expect(mailtoHref()).toBe(`mailto:${siteConfig.email}`);
  });
});

describe("whatsappHref", () => {
  it("numarayı yalnızca rakamlara indirger ve mesajı kodlar", () => {
    const href = whatsappHref("Merhaba, bilgi?", "+90 532 228 26 22");
    expect(href).toBe(
      "https://wa.me/905322282622?text=Merhaba%2C%20bilgi%3F",
    );
  });

  it("yerel biçimli numarayı ülke koduyla wa.me'ye verir", () => {
    expect(whatsappHref("x", "0532 228 26 22")).toBe("https://wa.me/905322282622?text=x");
  });

  it("mesaj verilmezse varsayılan mesajı kullanır", () => {
    const url = new URL(whatsappHref());
    expect(url.searchParams.get("text")).toBe(WHATSAPP_DEFAULT_MESSAGE);
  });
});

describe("formatAddress", () => {
  it("adresi tek satırda 'sokak, posta kodu ilçe/il' biçiminde verir", () => {
    expect(formatAddress()).toBe(
      "Ortaçeşme, Çayır Cd. No:224/2, 34825 Beykoz/İstanbul",
    );
  });
});

describe("mapsHref", () => {
  it("Google Maps arama bağlantısına salon adı ve adresi koyar", () => {
    const url = new URL(mapsHref());
    expect(url.origin + url.pathname).toBe("https://www.google.com/maps/search/");
    expect(url.searchParams.get("api")).toBe("1");
    expect(url.searchParams.get("query")).toBe(
      `${siteConfig.name}, ${formatAddress()}`,
    );
  });
});
