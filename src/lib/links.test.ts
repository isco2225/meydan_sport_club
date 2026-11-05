import { describe, it, expect } from "vitest";
import {
  formatAddress,
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

  it("varsayılan olarak siteConfig telefonunu kullanır", () => {
    expect(telHref()).toBe(`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`);
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
