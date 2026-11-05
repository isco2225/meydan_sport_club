import Icon, { type IconName } from "@/components/Icon";
import { mapsHref, telHref, whatsappHref } from "@/lib/links";

type Action = {
  label: string;
  href: string;
  icon: IconName;
  external?: boolean;
  primary?: boolean;
};

/**
 * Mobilde ekranın altına sabitlenen hızlı iletişim çubuğu: Ara · WhatsApp ·
 * Yol Tarifi. Ziyaretçinin bir numaralı eylemi salona ulaşmaktır; iletişim
 * bölümüne kaydırmadan tek dokunuşla yapılabilsin diye her sayfada durur.
 * Yalnızca bağlantılardan oluşur — JS gerektirmez, server component kalır.
 * Yüksekliği `--action-bar-h`'tır; `body` mobilde o kadar alt boşluk bırakır.
 */
export default function MobileActionBar() {
  const actions: Action[] = [
    { label: "Ara", href: telHref(), icon: "phone" },
    {
      label: "WhatsApp",
      href: whatsappHref(),
      icon: "message",
      external: true,
      primary: true,
    },
    { label: "Yol Tarifi", href: mapsHref(), icon: "map-pin", external: true },
  ];

  return (
    <nav
      aria-label="Hızlı iletişim"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid h-[var(--action-bar-h)] grid-cols-3 gap-2 px-3 py-2">
        {actions.map((action) => (
          <li key={action.label}>
            <a
              href={action.href}
              {...(action.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`flex h-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors ${
                action.primary
                  ? "bg-brand text-black"
                  : "bg-white/[0.06] text-white/85 hover:bg-white/10"
              }`}
            >
              <Icon name={action.icon} className="size-[18px]" />
              {action.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
