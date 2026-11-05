import { salonSchedules } from "@/data/hours";
import { weeklySchedule } from "@/data/schedule";

export type Fact = {
  /** Büyük yazılan değer, ör. "6 gün". */
  value: string;
  label: string;
};

/** Ders adlarından "Grup " önekini atar: "Grup Pilates" → "Pilates". */
const classTypes = [
  ...new Set(
    weeklySchedule.flatMap((day) =>
      day.sessions.map((session) => session.title.replace(/^Grup /, "")),
    ),
  ),
];

/** Salonların en çok açık olduğu gün sayısı (haftada). */
const openDays = Math.max(
  ...salonSchedules.map((salon) => salon.week.filter(Boolean).length),
);

/**
 * Hero'daki kısa bilgi şeridi. Rakamlar elle yazılmaz; saatler ve ders
 * programından türetilir — veri değişince şerit kendiliğinden güncellenir.
 */
export const heroFacts: Fact[] = [
  { value: `${openDays} gün`, label: "haftada açık" },
  { value: `${salonSchedules.length} salon`, label: "karma ve kadınlara özel" },
  {
    value: `${classTypes.length} grup dersi`,
    label: classTypes.join(" · ").toLocaleLowerCase("tr"),
  },
];
