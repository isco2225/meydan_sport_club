import { siteConfig, type PostalAddress } from "@/lib/site";

/**
 * `siteConfig`'ten türetilen dış bağlantılar (telefon, WhatsApp, e-posta,
 * harita). Numara/adres yalnızca `site.ts`'te yaşar; bağlantılar hep buradan
 * üretilir ki iki yerde farklı numara görünmesin.
 */

/** Telefon numarasını `tel:` bağlantısına çevirir (boşluk ve ayraçlar atılır). */
export function telHref(phone: string = siteConfig.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailtoHref(email: string = siteConfig.email): string {
  return `mailto:${email}`;
}

/** Ziyaretçinin WhatsApp'ta göreceği hazır mesaj. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Merhaba, Meydan Sport Club hakkında bilgi almak istiyorum.";

export const WHATSAPP_TRIAL_MESSAGE =
  "Merhaba, ücretsiz deneme antrenmanı için randevu almak istiyorum.";

/** wa.me sohbet bağlantısı; numara uluslararası biçimde, yalnızca rakam olmalı. */
export function whatsappHref(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
  number: string = siteConfig.whatsapp,
): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Görünen tek satırlık adres, ör. "Ortaçeşme, Çayır Cd. No:224/2, 34825 Beykoz/İstanbul". */
export function formatAddress(address: PostalAddress = siteConfig.address): string {
  return `${address.street}, ${address.postalCode} ${address.district}/${address.city}`;
}

/**
 * Google Maps arama bağlantısı (resmî "Maps URLs" biçimi). Koordinat
 * gerektirmez; salon adı + adresle aranır, mobilde Haritalar uygulamasını açar.
 */
export function mapsHref(): string {
  const query = `${siteConfig.name}, ${formatAddress()}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
