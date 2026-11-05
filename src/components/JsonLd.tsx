type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Yapılandırılmış veriyi `<script type="application/ld+json">` olarak basar.
 * `JSON.stringify` HTML'e karşı güvenli değildir; `<` karakteri `<`
 * olarak kaçışlanır ki veri içindeki bir `</script>` etiketi kapatamasın
 * (Next.js JSON-LD rehberindeki öneri).
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
