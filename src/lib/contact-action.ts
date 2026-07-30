"use server";

import { z } from "zod";
import { contactSchema, type ContactActionResult } from "@/lib/contact";

/**
 * Honeypot alanı: formda gizli durur, insanlar doldurmaz. Dolu geldiyse
 * istek bot kabul edilir ve sessizce "başarılı" dönülür — bota ipucu verilmez.
 */
const honeypotSchema = z.looseObject({ website: z.string().default("") });

export async function sendContactMessage(
  payload: unknown,
): Promise<ContactActionResult> {
  const honeypot = honeypotSchema.safeParse(payload);
  if (honeypot.success && honeypot.data.website !== "") {
    return { status: "success" };
  }

  // İstemci doğrulaması güvenlik sınırı değildir; veri sunucuda yeniden doğrulanır.
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Form bilgileri geçersiz. Lütfen alanları kontrol edip tekrar deneyin.",
    };
  }

  // TODO(resend): RESEND_API_KEY edinilince gönderim buraya bağlanacak; ardından
  // Upstash rate limit + Turnstile eklenmeden form bitmiş sayılmaz (bkz. CLAUDE.md).
  // O zamana dek mesaj yalnızca sunucu logunda görünür.
  console.log("[iletisim] yeni mesaj:", parsed.data);

  return { status: "success" };
}
