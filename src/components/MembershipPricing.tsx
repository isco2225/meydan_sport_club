import { membershipPlans, extraFees, formatTRY } from "@/data/membership";

/** Aylık maliyeti en düşük olan plan "En Avantajlı" olarak işaretlenir. */
const bestPlanId = membershipPlans.reduce((best, plan) =>
  plan.standardPrice / plan.months < best.standardPrice / best.months
    ? plan
    : best,
).id;

/**
 * Üyelik ücret kartları ve ek ücretler. Hem ana sayfadaki bölüm hem de /uyelik
 * sayfası kullanır; içerik tek kaynaktan (membership.ts) gelir. Çevrimiçi üye
 * olma yoktur — yalnızca fiyat gösterimi.
 */
export default function MembershipPricing() {
  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {membershipPlans.map((plan) => {
          const featured = plan.id === bestPlanId;
          const perMonth = Math.round(plan.standardPrice / plan.months);

          return (
            <li
              key={plan.id}
              className={`group relative flex flex-col rounded-3xl border p-6 transition-transform duration-200 hover:-translate-y-1 ${
                featured
                  ? "border-foreground bg-foreground/[0.03] shadow-lg shadow-foreground/5"
                  : "border-black/10 dark:border-white/10"
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                  En Avantajlı
                </span>
              )}

              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                {plan.label}
              </h3>

              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight tabular-nums">
                  {formatTRY(plan.standardPrice)}
                </span>
              </p>
              <p className="mt-1 text-xs text-foreground/50 tabular-nums">
                ≈ {formatTRY(perMonth)} / ay
              </p>

              <div className="mt-6 flex items-center justify-between gap-2 rounded-2xl bg-foreground/[0.04] px-4 py-3 dark:bg-white/[0.04]">
                <span className="text-sm font-medium text-foreground/70">
                  Öğrenci
                </span>
                <span className="text-lg font-bold tabular-nums">
                  {formatTRY(plan.studentPrice)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-sm text-foreground/50">
        Öğrenci ücreti geçerli öğrenci belgesi ile uygulanır.
      </p>

      <div className="mt-10 rounded-3xl border border-black/10 bg-background p-6 dark:border-white/10">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
          Ek Ücretler
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {extraFees.map((fee) => (
            <li
              key={fee.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-black/5 px-4 py-3 dark:border-white/5"
            >
              <span className="text-sm text-foreground/80">
                {fee.label}
                {fee.note && (
                  <span className="text-foreground/50"> ({fee.note})</span>
                )}
              </span>
              <span className="shrink-0 font-semibold tabular-nums">
                {formatTRY(fee.price)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
