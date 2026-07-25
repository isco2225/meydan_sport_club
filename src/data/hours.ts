/**
 * Çalışma saatleri. Salon karma ve kadınlara özel olarak iki farklı program
 * uygular; her ikisi de burada tek kaynak olarak tanımlanır. Aynı saatlere
 * sahip günler tek satırda gruplanır (ör. "Pazartesi – Cuma").
 */

export type HoursRow = {
  /** Gün ya da gün aralığı, ör. "Pazartesi – Cuma". */
  days: string;
  /** Saat aralığı (ör. "09:00 – 23:50") ya da {@link CLOSED}. */
  hours: string;
};

export type SalonHours = {
  /** Salonun görünen adı, ör. "Karma Salon". */
  name: string;
  rows: HoursRow[];
};

/** Kapalı günleri işaretlemek için tek kaynak (arayüzde vurgulamak için de kullanılır). */
export const CLOSED = "Kapalı";

export const workingHours: SalonHours[] = [
  {
    name: "Karma Salon",
    rows: [
      { days: "Pazartesi – Cuma", hours: "09:00 – 23:50" },
      { days: "Cumartesi", hours: "09:00 – 22:50" },
      { days: "Pazar", hours: CLOSED },
    ],
  },
  {
    name: "Kadınlar Salonu",
    rows: [
      { days: "Pazartesi – Cumartesi", hours: "09:00 – 22:00" },
      { days: "Pazar", hours: CLOSED },
    ],
  },
];

/**
 * Bir salonun saatlerini tek satırlık düz metne indirger; SSS gibi cümle içi
 * bağlamlarda kullanılır. Örn: "Karma Salon: Pazartesi – Cuma 09:00 – 23:50,
 * Cumartesi 09:00 – 22:50, Pazar Kapalı".
 */
export function summarizeHours(salon: SalonHours): string {
  const rows = salon.rows.map((row) => `${row.days} ${row.hours}`).join(", ");
  return `${salon.name}: ${rows}`;
}
