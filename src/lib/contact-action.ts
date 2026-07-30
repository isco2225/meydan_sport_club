"use server";

import { Resend } from "resend";
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[iletisim] RESEND_API_KEY veya CONTACT_TO_EMAIL tanımlı değil.");
    return {
      status: "error",
      message:
        "Mesajınız şu anda iletilemiyor. Lütfen bize telefonla veya sosyal medyadan ulaşın.",
    };
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);
  // Alan adı doğrulanana dek gönderici Resend'in test adresidir; yanıtla
  // butonu replyTo sayesinde doğrudan ziyaretçiye gider. Gövde bilinçli olarak
  // düz metindir (text): HTML enjeksiyonuna kapı açmaz.
  const { error } = await resend.emails.send({
    from: "Meydan Sport Club <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `İletişim formu: ${name}`,
    text: `Ad Soyad: ${name}\nE-posta: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("[iletisim] Resend gönderim hatası:", error);
    return {
      status: "error",
      message:
        "Mesajınız gönderilemedi. Lütfen tekrar deneyin ya da bize telefonla ulaşın.",
    };
  }

  return { status: "success" };
}
