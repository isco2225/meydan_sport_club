/**
 * Ders programının yalnızca kadınlar salonu için geçerli olduğunu belirten
 * uyarı. Bölüm ve `/ders-programi` sayfası aynı metni gösterir.
 */
export default function ScheduleNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-line border-l-4 border-l-brand bg-surface p-4 text-sm text-foreground/70 ${className}`}
    >
      <strong className="font-semibold text-foreground">Kadınlar Salonu</strong>{" "}
      — Aşağıdaki grup ders programı yalnızca kadınlar salonu için geçerlidir.
      Erkek veya karma salon için ders programı bulunmamaktadır.
    </div>
  );
}
