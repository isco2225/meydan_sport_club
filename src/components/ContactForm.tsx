"use client";

import { useState, type SubmitEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactActionResult,
  type ContactFormValues,
} from "@/lib/contact";
import { sendContactMessage } from "@/lib/contact-action";
import { siteConfig } from "@/lib/site";

const fieldClass =
  "w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15";

type ContactFormProps = {
  /**
   * E-posta gönderimi alan adı doğrulaması bekliyor (bkz. contact-action.ts);
   * o güne dek varsayılan kapalıdır ve gönderimde telefon notu gösterilir.
   * Alan adı doğrulanınca ContactSection'da `emailEnabled` verilerek açılır.
   */
  emailEnabled?: boolean;
};

export default function ContactForm({ emailEnabled = false }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const [result, setResult] = useState<
    ContactActionResult | { status: "disabled" } | null
  >(null);

  const submitWithEmail = handleSubmit(async (values, event) => {
    setResult(null);
    // Honeypot RHF şemasının dışında kalır; değeri formun kendisinden okunur.
    const website =
      event?.target instanceof HTMLFormElement
        ? String(new FormData(event.target).get("website") ?? "")
        : "";
    const response = await sendContactMessage({ ...values, website });
    setResult(response);
    if (response.status === "success") reset();
  });

  const onSubmit = emailEnabled
    ? submitWithEmail
    : (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult({ status: "disabled" });
      };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 rounded-2xl border border-black/10 p-6 dark:border-white/10"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Ad Soyad
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          E-posta
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClass}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Mesajınız
        </label>
        <textarea
          id="message"
          rows={4}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={fieldClass}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: görünmez alan; botlar doldurur, sunucu dolu geleni yutar. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Web siteniz</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {result?.status === "disabled" && (
        <p
          role="status"
          className="rounded-lg bg-brand/15 px-4 py-3 text-sm font-medium"
        >
          Bu özellik henüz aktif değil. Bizimle{" "}
          <a
            href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}
            className="font-semibold underline underline-offset-2"
          >
            {siteConfig.phone}
          </a>{" "}
          üzerinden iletişime geçebilirsiniz.
        </p>
      )}
      {result?.status === "success" && (
        <p role="status" className="text-sm font-medium text-green-700 dark:text-green-400">
          Mesajınız alındı. En kısa sürede size dönüş yapacağız.
        </p>
      )}
      {result?.status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {result.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
