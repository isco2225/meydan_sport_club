export type ClassSession = {
  time: string;
  title: string;
};

export type DaySchedule = {
  day: string;
  sessions: ClassSession[];
};

/**
 * Haftalık grup ders programı — yalnızca Kadınlar Salonu için geçerlidir.
 * Erkek veya karma salon için ders programı bulunmamaktadır.
 */
export const weeklySchedule: DaySchedule[] = [
  {
    day: "Pazartesi",
    sessions: [{ time: "18:30", title: "Grup Pilates" }],
  },
  {
    day: "Salı",
    sessions: [
      { time: "16:30", title: "Grup Zumba" },
      { time: "20:00", title: "Grup Zumba" },
    ],
  },
  {
    day: "Çarşamba",
    sessions: [{ time: "18:30", title: "Grup Pilates" }],
  },
  {
    day: "Perşembe",
    sessions: [
      { time: "16:30", title: "Grup Zumba" },
      { time: "20:00", title: "Grup Zumba" },
    ],
  },
  {
    day: "Cuma",
    sessions: [
      { time: "10:30", title: "Core Board" },
      { time: "18:30", title: "Core Board" },
    ],
  },
];
