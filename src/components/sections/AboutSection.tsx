import Section from "./Section";

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

export default function AboutSection() {
  return (
    <Section id="hakkimizda">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Hakkımızda
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-foreground/70">
        Meydan Sport Club olarak sağlıklı yaşamı herkes için erişilebilir
        kılmayı hedefliyoruz.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
          >
            <h3 className="text-lg font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm text-foreground/70">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
