import { z } from "zod";

/**
 * İletişim formu doğrulama şeması. Hem istemci tarafı doğrulama hem de ileride
 * eklenecek sunucu action'ı için tek doğruluk kaynağı olarak kullanılabilir.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ad Soyad en az 2 karakter olmalıdır.")
    .max(80, "Ad Soyad en fazla 80 karakter olabilir."),
  email: z.email("Geçerli bir e-posta adresi girin."),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olmalıdır.")
    .max(1000, "Mesaj en fazla 1000 karakter olabilir."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Sunucu action'ının istemciye döndürdüğü sonuç. UI yalnızca bunu görür. */
export type ContactActionResult =
  | { status: "success" }
  | { status: "error"; message: string };
