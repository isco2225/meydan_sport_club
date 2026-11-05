import Icon from "@/components/Icon";
import { whatsappHref, WHATSAPP_TRIAL_MESSAGE } from "@/lib/links";

/**
 * "Önce bir deneyin" çağrısı: üyelik ücretlerinin altında, karar aşamasındaki
 * ziyaretçiyi ücretsiz deneme antrenmanına (WhatsApp) yönlendirir. Teklif
 * SSS'deki "deneme antrenmanı" cevabıyla tutarlıdır.
 */
export default function TrialCallout() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-8 text-black sm:px-10 sm:py-10">
      {/* Arka planda büyük, soluk marka yazısı. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-8 font-display text-[9rem] leading-none text-black/[0.07] uppercase select-none"
      >
        Meydan
      </span>
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-3xl uppercase leading-none sm:text-4xl">
            Önce bir deneyin
          </p>
          <p className="mt-3 max-w-md text-sm font-medium text-black/75">
            İlk antrenmanınız ücretsiz. Salonu gezin, antrenörlerimizle tanışın,
            size uygun üyeliği birlikte seçelim.
          </p>
        </div>
        <a
          href={whatsappHref(WHATSAPP_TRIAL_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-brand transition-transform hover:-translate-y-0.5"
        >
          <Icon name="message" className="size-4" />
          Deneme randevusu al
        </a>
      </div>
    </div>
  );
}
