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
import { telHref, whatsappHref } from "@/lib/links";
import { siteConfig } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-foreground/35 focus:border-brand focus:ring-2 focus:ring-brand/25 aria-[invalid=true]:border-red-400";

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
      className="space-y-5 rounded-3xl border border-line bg-surface p-6 sm:p-8"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground/80">
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
          <p id="name-error" className="mt-1 text-xs text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground/80">
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
          <p id="email-error" className="mt-1 text-xs text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground/80">
          Mesajınız
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={fieldClass}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-400">
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
          className="rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm font-medium"
        >
          Bu özellik henüz aktif değil. Bizimle{" "}
          <a
            href={telHref()}
            className="font-semibold underline underline-offset-2"
          >
            {siteConfig.phone}
          </a>{" "}
          numarasından arayarak ya da{" "}
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            WhatsApp&apos;tan
          </a>{" "}
          yazarak bize ulaşabilirsiniz.
        </p>
      )}
      {result?.status === "success" && (
        <p role="status" className="text-sm font-medium text-green-400">
          Mesajınız alındı. En kısa sürede size dönüş yapacağız.
        </p>
      )}
      {result?.status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {result.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
