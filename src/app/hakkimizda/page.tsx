import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

const values = [
  {
    title: "Misyonumuz",
    description:
      "Her yaştan ve seviyeden üyeye sağlıklı bir yaşam tarzı kazandırmak.",
  },
  {
    title: "Vizyonumuz",
    description:
      "Bölgenin en çok tercih edilen, topluluk odaklı spor kulübü olmak.",
  },
  {
    title: "Değerlerimiz",
    description:
      "Disiplin, samimiyet ve sürekli gelişim ilkelerimizin temelini oluşturur.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Hakkımızda"
        description="Meydan Spor Kulübü olarak sağlıklı yaşamı herkes için erişilebilir kılmayı hedefliyoruz."
      />

      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <h2 className="text-lg font-semibold">{value.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">
                {value.description}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-20">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold">Hikayemiz</h2>
          <p className="mt-4 text-foreground/70">
            Kapılarımızı açtığımız günden bu yana, üyelerimizin hedeflerine
            ulaşmasına yardımcı olmayı önceliğimiz haline getirdik. Modern
            ekipmanlarımız ve deneyimli antrenör kadromuzla, herkes için güvenli
            ve motive edici bir antrenman ortamı sunuyoruz.
          </p>
        </Container>
      </section>
    </>
  );
}
