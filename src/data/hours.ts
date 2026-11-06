/**
 * Çalışma saatleri. Salon karma ve kadınlara özel olarak iki farklı program
 * uygular. Kaynak veri gün gün, makinece okunur biçimdedir (`salonSchedules`);
 * hem görünen satırlar (`workingHours`, aynı saatli günler gruplanır, ör.
 * "Hafta içi") hem de JSON-LD `openingHoursSpecification` buradan
 * türetilir — saati yalnızca burada değiştir.
 */

/** Haftanın günleri, Pazartesi'den başlayarak (Türkiye'deki hafta düzeni). */
export const DAY_NAMES = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
] as const;

/** schema.org gün adları — `DAY_NAMES` ile aynı sırada. */
const SCHEMA_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type OpeningHours = {
  /** "HH:MM" */
  opens: string;
  /** "HH:MM" */
  closes: string;
};

/** Pazartesi'den Pazar'a 7 gün; `null` = o gün kapalı. */
export type Week = [
  OpeningHours | null,
  OpeningHours | null,
  OpeningHours | null,
  OpeningHours | null,
  OpeningHours | null,
  OpeningHours | null,
  OpeningHours | null,
];

export type SalonSchedule = {
  id: "karma" | "kadinlar";
  /** Salonun görünen adı, ör. "Karma Salon". */
  name: string;
  week: Week;
};

const open = (opens: string, closes: string): OpeningHours => ({ opens, closes });

const karmaWeekday = open("09:00", "23:50");
const kadinlarDay = open("09:00", "22:00");

export const salonSchedules: SalonSchedule[] = [
  {
    id: "karma",
    name: "Karma Salon",
    week: [
      karmaWeekday, // Pazartesi
      karmaWeekday, // Salı
      karmaWeekday, // Çarşamba
      karmaWeekday, // Perşembe
      karmaWeekday, // Cuma
      open("09:00", "22:50"), // Cumartesi
      null, // Pazar
    ],
  },
  {
    id: "kadinlar",
    name: "Kadınlar Salonu",
    week: [
      kadinlarDay,
      kadinlarDay,
      kadinlarDay,
      kadinlarDay,
      kadinlarDay,
      kadinlarDay,
      null, // Pazar
    ],
  },
];

/** Ardışık ve aynı saatli günlerden oluşan blok; gün indeksleri 0 = Pazartesi. */
export type DayGroup = {
  from: number;
  to: number;
  hours: OpeningHours | null;
};

function sameHours(a: OpeningHours | null, b: OpeningHours | null): boolean {
  if (a === null || b === null) return a === b;
  return a.opens === b.opens && a.closes === b.closes;
}

/** Haftayı ardışık, aynı saatli gün bloklarına ayırır. */
export function groupWeek(week: Week): DayGroup[] {
  const groups: DayGroup[] = [];
  week.forEach((hours, day) => {
    const last = groups.at(-1);
    if (last && sameHours(last.hours, hours)) {
      last.to = day;
    } else {
      groups.push({ from: day, to: day, hours });
    }
  });
  return groups;
}

// ---- Görünen satırlar --------------------------------------------------------

export type HoursRow = {
  /** Gün ya da gün aralığı, ör. "Hafta içi", "Pazartesi – Cumartesi", "Pazar". */
  days: string;
  /** Saat aralığı (ör. "09:00 – 23:50") ya da {@link CLOSED}. */
  hours: string;
};

export type SalonHours = {
  id: SalonSchedule["id"];
  /** Salonun görünen adı, ör. "Karma Salon". */
  name: string;
  rows: HoursRow[];
};

/** Kapalı günleri işaretlemek için tek kaynak (arayüzde vurgulamak için de kullanılır). */
export const CLOSED = "Kapalı";

/**
 * Yerleşik adı olan gün aralıkları. Pazartesi–Cuma (0–4) "Hafta içi" diye
 * yazılır; diğer aralıklar "Pazartesi – Cumartesi" gibi uç günlerle gösterilir.
 */
const RANGE_LABELS: Record<string, string> = {
  "0-4": "Hafta içi",
};

/** Bir gün bloğunun görünen adı: tek gün, adlı aralık ya da "X – Y". */
export function dayRangeLabel(from: number, to: number): string {
  if (from === to) return DAY_NAMES[from];
  return RANGE_LABELS[`${from}-${to}`] ?? `${DAY_NAMES[from]} – ${DAY_NAMES[to]}`;
}

function toRow(group: DayGroup): HoursRow {
  const days = dayRangeLabel(group.from, group.to);
  const hours = group.hours
    ? `${group.hours.opens} – ${group.hours.closes}`
    : CLOSED;
  return { days, hours };
}

/** Arayüzde gösterilen, gruplanmış saat satırları (`salonSchedules`'tan türetilir). */
export const workingHours: SalonHours[] = salonSchedules.map((salon) => ({
  id: salon.id,
  name: salon.name,
  rows: groupWeek(salon.week).map(toRow),
}));

/**
 * Bir salonun saatlerini tek satırlık düz metne indirger; SSS gibi cümle içi
 * bağlamlarda kullanılır. Örn: "Karma Salon: Hafta içi 09:00 – 23:50,
 * Cumartesi 09:00 – 22:50, Pazar Kapalı".
 */
export function summarizeHours(salon: SalonHours): string {
  const rows = salon.rows.map((row) => `${row.days} ${row.hours}`).join(", ");
  return `${salon.name}: ${rows}`;
}

// ---- Yapılandırılmış veri (JSON-LD) ------------------------------------------

export type OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

/** schema.org `openingHoursSpecification`; kapalı günler listelenmez. */
export function openingHoursSpecification(
  week: Week,
): OpeningHoursSpecification[] {
  return groupWeek(week).flatMap((group) =>
    group.hours
      ? [
          {
            "@type": "OpeningHoursSpecification" as const,
            dayOfWeek: SCHEMA_DAYS.slice(group.from, group.to + 1),
            opens: group.hours.opens,
            closes: group.hours.closes,
          },
        ]
      : [],
  );
}
