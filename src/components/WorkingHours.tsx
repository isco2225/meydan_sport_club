import { CLOSED, workingHours } from "@/data/hours";

type WorkingHoursProps = {
  className?: string;
  /** Footer gibi dar alanlar için salonları yan yana değil alt alta dizer. */
  compact?: boolean;
};

/**
 * Karma ve kadınlar salonunun çalışma saatlerini gruplanmış olarak gösterir.
 * Sunucu bileşeni — etkileşim yoktur. Kapalı günler soluk vurguyla ayrışır.
 */
export default function WorkingHours({
  className = "",
  compact = false,
}: WorkingHoursProps) {
  return (
    <div
      className={`${compact ? "space-y-4" : "grid gap-6 sm:grid-cols-2"} ${className}`}
    >
      {workingHours.map((salon) => (
        <div key={salon.name}>
          <p className="text-sm font-semibold">{salon.name}</p>
          <dl className="mt-2 space-y-1">
            {salon.rows.map((row) => {
              const closed = row.hours === CLOSED;
              return (
                <div
                  key={row.days}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <dt className="text-foreground/60">{row.days}</dt>
                  <dd
                    className={
                      closed
                        ? "font-medium text-foreground/45"
                        : "tabular-nums text-foreground/90"
                    }
                  >
                    {row.hours}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
    </div>
  );
}
