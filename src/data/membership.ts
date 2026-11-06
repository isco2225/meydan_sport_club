/** Üyelik ücretleri için para birimi. Tüm fiyatlar bu birim cinsindendir. */
export const CURRENCY = "TRY" as const;

const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

/** Sayısal fiyatı "₺2.500" biçiminde Türkçe para birimine çevirir. */
export function formatTRY(amount: number): string {
  return priceFormatter.format(amount);
}

export type MembershipPlan = {
  id: string;
  /** Kullanıcıya gösterilen süre etiketi, ör. "3 Aylık". */
  label: string;
  months: number;
  standardPrice: number;
  studentPrice: number;
};

/**
 * Üyelik ücretleri. Site yalnızca fiyatları GÖSTERİR; çevrimiçi üye olma yoktur.
 * Öğrenci fiyatı geçerli öğrenci belgesi ile uygulanır.
 */
export const membershipPlans: MembershipPlan[] = [
  { id: "aylik", label: "Aylık", months: 1, standardPrice: 2500, studentPrice: 2000 },
  { id: "3-aylik", label: "3 Aylık", months: 3, standardPrice: 6500, studentPrice: 5000 },
  { id: "6-aylik", label: "6 Aylık", months: 6, standardPrice: 10000, studentPrice: 8500 },
  { id: "12-aylik", label: "12 Aylık", months: 12, standardPrice: 18000, studentPrice: 15000 },
];

export type ExtraFee = {
  id: string;
  label: string;
  price: number;
  /** İsteğe bağlı açıklama, ör. "tek seferlik". */
  note?: string;
};

/** Üyelik dışındaki ek ücretler. */
export const extraFees: ExtraFee[] = [
  { id: "kart-barkod", label: "Kart veya barkod ücreti", price: 50, note: "tek seferlik" },
  { id: "gunluk-giris", label: "Günlük giriş", price: 300 },
];

/**
 * Tüm üyelik fiyatlarının (standart + öğrenci) en düşüğü ve en yükseği;
 * JSON-LD `priceRange` buradan türetilir.
 */
export function membershipPriceBounds(
  plans: MembershipPlan[] = membershipPlans,
): { min: number; max: number } {
  const prices = plans.flatMap((plan) => [plan.standardPrice, plan.studentPrice]);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Bir planın standart fiyatla aylık maliyeti. */
export function monthlyCost(plan: MembershipPlan): number {
  return plan.standardPrice / plan.months;
}

/** Kıyas tabanı: en kısa süreli plan (aylık üyelik). */
export const basePlan: MembershipPlan = membershipPlans.reduce((shortest, plan) =>
  plan.months < shortest.months ? plan : shortest,
);

/**
 * Planın aylık maliyetinin, en kısa süreli plana göre yüzde kaç düşük olduğu
 * (tam sayıya yuvarlanır). Taban planın kendisi için 0 döner.
 */
export function savingsPercent(plan: MembershipPlan, base: MembershipPlan = basePlan): number {
  return Math.round((1 - monthlyCost(plan) / monthlyCost(base)) * 100);
}

const percentFormatter = new Intl.NumberFormat("tr-TR", {
  style: "percent",
  maximumFractionDigits: 0,
});

/** Yüzdeyi Türkçe biçimde verir: 40 → "%40". */
export function formatPercent(percent: number): string {
  return percentFormatter.format(percent / 100);
}
