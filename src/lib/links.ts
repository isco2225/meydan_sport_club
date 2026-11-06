import { siteConfig, type PostalAddress } from "@/lib/site";

/**
 * `siteConfig`'ten türetilen dış bağlantılar (telefon, WhatsApp, e-posta,
 * harita). Numara/adres yalnızca `site.ts`'te yaşar; bağlantılar hep buradan
 * üretilir ki iki yerde farklı numara görünmesin.
 */

/** Türkiye ülke kodu; yerel biçimdeki numaralar buna göre çevrilir. */
const COUNTRY_CODE = "90";

/**
 * Numarayı E.164 biçimine çevirir: "0532 228 26 22" → "+905322282622".
 * Zaten "+" ile başlayan numaralar yalnızca ayraçlarından arındırılır.
 */
export function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (phone.trim().startsWith("+")) return `+${digits}`;
  return `+${COUNTRY_CODE}${digits.replace(/^0/, "")}`;
}

/**
 * Okunur uluslararası biçim: "0532 228 26 22" → "+90 532 228 26 22".
 * JSON-LD'de kullanılır (Google ülke kodunu ister).
 */
export function internationalPhone(phone: string = siteConfig.phone): string {
  if (phone.trim().startsWith("+")) return phone.trim();
  return `+${COUNTRY_CODE} ${phone.trim().replace(/^0/, "")}`;
}

/** Telefon numarasını uluslararası `tel:` bağlantısına çevirir. */
export function telHref(phone: string = siteConfig.phone): string {
  return `tel:${toE164(phone)}`;
}

/** `siteConfig.email` isteğe bağlı olduğundan adres açıkça verilir. */
export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

/** Ziyaretçinin WhatsApp'ta göreceği hazır mesaj. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Merhaba, Meydan Sport Club hakkında bilgi almak istiyorum.";

export const WHATSAPP_TRIAL_MESSAGE =
  "Merhaba, ücretsiz deneme antrenmanı için randevu almak istiyorum.";

/** wa.me sohbet bağlantısı; wa.me numarayı ülke koduyla, "+" olmadan ister. */
export function whatsappHref(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
  number: string = siteConfig.whatsapp,
): string {
  const digits = toE164(number).slice(1);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Mahalle + cadde/kapı, ör. "Ortaçeşme, Çayır Cd. No:224/2" (JSON-LD streetAddress). */
export function streetAddress(address: PostalAddress = siteConfig.address): string {
  return `${address.neighborhood}, ${address.street}`;
}

/** Görünen tek satırlık adres, ör. "Ortaçeşme, Çayır Cd. No:224/2, 34825 Beykoz/İstanbul". */
export function formatAddress(address: PostalAddress = siteConfig.address): string {
  return `${streetAddress(address)}, ${address.postalCode} ${address.district}/${address.city}`;
}

/**
 * Google Maps arama bağlantısı (resmî "Maps URLs" biçimi). Koordinat
 * gerektirmez; salon adı + adresle aranır, mobilde Haritalar uygulamasını açar.
 */
export function mapsHref(): string {
  const query = `${siteConfig.name}, ${formatAddress()}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
