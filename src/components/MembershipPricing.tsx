import {
  membershipPlans,
  extraFees,
  formatPercent,
  formatTRY,
  monthlyCost,
  savingsPercent,
} from "@/data/membership";

/** Aylık maliyeti en düşük olan plan "En Avantajlı" olarak işaretlenir. */
const bestPlanId = membershipPlans.reduce((best, plan) =>
  monthlyCost(plan) < monthlyCost(best) ? plan : best,
).id;

/**
 * Üyelik ücret kartları ve ek ücretler. Hem ana sayfadaki bölüm hem de /uyelik
 * sayfası kullanır; içerik tek kaynaktan (membership.ts) gelir. Çevrimiçi üye
 * olma yoktur — yalnızca fiyat gösterimi.
 */
export default function MembershipPricing() {
  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {membershipPlans.map((plan) => {
          const featured = plan.id === bestPlanId;
          const perMonth = Math.round(monthlyCost(plan));
          const savings = savingsPercent(plan);

          return (
            <li
              key={plan.id}
              className={`group relative flex flex-col rounded-3xl border p-6 transition-transform duration-200 hover:-translate-y-1 ${
                featured
                  ? "border-brand bg-brand/[0.07] shadow-[0_0_60px_-20px_var(--color-brand)]"
                  : "border-line bg-surface"
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
                  En Avantajlı
                </span>
              )}

              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
                {plan.label}
              </h3>

              <p className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl tracking-tight tabular-nums">
                  {formatTRY(plan.standardPrice)}
                </span>
              </p>
              <p className="mt-2 text-xs text-foreground/55 tabular-nums">
                ≈ {formatTRY(perMonth)} / ay
              </p>

              {/* Taban planda (aylık) kıyas anlamsız; satır yer tutsun diye boş kalır. */}
              <p
                className={`mt-3 min-h-5 text-xs font-semibold ${
                  featured ? "text-brand" : "text-brand/80"
                }`}
              >
                {savings > 0 && <>Aylığa göre {formatPercent(savings)} avantaj</>}
              </p>

              <div className="mt-6 flex items-center justify-between gap-2 rounded-2xl border border-line bg-background/60 px-4 py-3">
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

      <p className="mt-6 text-sm text-foreground/55">
        Öğrenci ücreti geçerli öğrenci belgesi ile uygulanır.
      </p>

      <div className="mt-10 rounded-3xl border border-line bg-surface p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
          Ek Ücretler
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {extraFees.map((fee) => (
            <li
              key={fee.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-background/60 px-4 py-3"
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
