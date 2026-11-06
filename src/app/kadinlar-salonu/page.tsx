import Link from "next/link";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import HighlightGrid from "@/components/HighlightGrid";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import TrialCallout from "@/components/TrialCallout";
import WeeklySchedule from "@/components/WeeklySchedule";
import WorkingHours from "@/components/WorkingHours";
import {
  womensSalonFaq,
  womensSalonHighlights,
  womensSalonIntro,
} from "@/data/womens-salon";
import {
  formatAddress,
  mapsHref,
  whatsappHref,
  WHATSAPP_WOMENS_MESSAGE,
} from "@/lib/links";
import { pageMetadata, pages } from "@/lib/metadata";

export const metadata = pageMetadata(pages.womens);

const infoCard = "flex flex-col rounded-2xl border border-line bg-surface p-6";
const infoTitle =
  "self-start bg-brand px-2 py-0.5 text-sm font-semibold uppercase tracking-wide text-black";
const infoLink =
  "mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand transition-opacity hover:opacity-80";

/**
 * Kadınlara özel salon sayfası — "beykoz kadınlar spor salonu" gibi yerel
 * aramaların hedef sayfası. Tüm içerik veri katmanından gelir (saatler,
 * ders programı, SSS); bu sayfa yalnızca kadınlar salonuna ait olanları
 * seçer. FAQPage JSON-LD'si basılmaz: sitede tek kopya ana sayfadadır.
 */
export default function WomensSalonPage() {
  return (
    <>
      <PageHeader title={pages.womens.title} description={womensSalonIntro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappHref(WHATSAPP_WOMENS_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <Icon name="message" className="size-4" />
            WhatsApp&apos;tan bilgi alın
          </a>
          <Link
            href="#ders-programi"
            className="rounded-full border border-line px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            Ders programı
          </Link>
        </div>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Neden kadınlar salonu?"
            title="Size Ayrılmış Bir Alan"
          />
          <HighlightGrid
            items={womensSalonHighlights}
            headingLevel={3}
            className="mt-10"
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className={infoCard}>
              <h2 className={infoTitle}>Çalışma Saatleri</h2>
              <WorkingHours salon="kadinlar" className="mt-4" />
            </div>

            <div className={infoCard}>
              <h2 className={infoTitle}>Konum</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {formatAddress()}
              </p>
              <a
                href={mapsHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={infoLink}
              >
                Yol tarifi al
                <Icon name="arrow-up-right" className="size-4" />
              </a>
            </div>

            <div className={infoCard}>
              <h2 className={infoTitle}>Üyelik Ücretleri</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                Aylık, 3, 6 ve 12 aylık üyelik seçeneklerimizi ve öğrenci
                fiyatlarımızı inceleyin.
              </p>
              <Link href={pages.membership.path} className={infoLink}>
                Ücretleri görün
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="ders-programi"
        className="border-y border-line bg-foreground/[0.02] py-16 sm:py-20"
      >
        <Container>
          <SectionHeader
            eyebrow="Grup dersleri"
            title="Haftalık Ders Programı"
            description="Pilates, zumba ve core board dersleri yalnızca kadınlar salonunda yapılır."
          />
          <div className="mt-10">
            <WeeklySchedule headingLevel={3} />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Merak edilenler" title="Sıkça Sorulan Sorular" />
          <div className="mt-10 max-w-3xl">
            <FaqList items={womensSalonFaq} />
          </div>
          <div className="mt-16">
            <TrialCallout />
          </div>
        </Container>
      </section>
    </>
  );
}
