export type ClassSession = {
  time: string;
  title: string;
  trainer: string;
};

export type DaySchedule = {
  day: string;
  sessions: ClassSession[];
};

export const weeklySchedule: DaySchedule[] = [
  {
    day: "Pazartesi",
    sessions: [
      { time: "09:00", title: "Sabah Yoga", trainer: "Zeynep Kaya" },
      { time: "18:00", title: "Fonksiyonel Antrenman", trainer: "Ayşe Yılmaz" },
      { time: "20:00", title: "Crossfit", trainer: "Can Öztürk" },
    ],
  },
  {
    day: "Salı",
    sessions: [
      { time: "10:00", title: "Pilates", trainer: "Zeynep Kaya" },
      { time: "19:00", title: "HIIT", trainer: "Can Öztürk" },
    ],
  },
  {
    day: "Çarşamba",
    sessions: [
      { time: "09:00", title: "Sabah Yoga", trainer: "Zeynep Kaya" },
      { time: "18:00", title: "Kuvvet Antrenmanı", trainer: "Mehmet Demir" },
    ],
  },
  {
    day: "Perşembe",
    sessions: [
      { time: "10:00", title: "Pilates", trainer: "Zeynep Kaya" },
      { time: "20:00", title: "Crossfit", trainer: "Can Öztürk" },
    ],
  },
  {
    day: "Cuma",
    sessions: [
      { time: "18:00", title: "Fonksiyonel Antrenman", trainer: "Ayşe Yılmaz" },
      { time: "19:30", title: "HIIT", trainer: "Can Öztürk" },
    ],
  },
  {
    day: "Cumartesi",
    sessions: [
      { time: "11:00", title: "Hafta Sonu Yoga", trainer: "Zeynep Kaya" },
      { time: "13:00", title: "Vücut Geliştirme", trainer: "Mehmet Demir" },
    ],
  },
];
