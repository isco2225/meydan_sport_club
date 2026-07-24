# Görseller — `public/images/`

Sitede kullanılacak tüm fotoğraflar bu klasöre, **kullanım alanına göre**
ayrılmış alt klasörlere konur. `public/` içindeki her dosya siteden kök
yoldan servis edilir: `public/images/hero/kapak.jpg` → `/images/hero/kapak.jpg`.

Görseller **her zaman `next/image`** ile gösterilir (bkz. `CLAUDE.md`); bu
sayede boyutlandırma, `webp/avif` dönüşümü ve lazy-load otomatik yapılır.
Bu yüzden kaynak dosyayı optimize etmek için uğraşma — **yüksek kaliteli,
yeterince büyük** bir görsel koyman yeterli.

## Klasörler

| Klasör          | Ne için                         | Önerilen ölçü (px) | Oran  |
| --------------- | ------------------------------- | ------------------ | ----- |
| `hero/`         | Ana sayfa kapak/arka plan       | 1920 × 1080        | 16:9  |
| `hakkimizda/`   | Salon içi, ekipman, mekân       | 1600 × 1067        | 3:2   |
| `antrenorler/`  | Antrenör portreleri             | 800 × 800          | 1:1   |
| `galeri/`       | Genel galeri / atmosfer         | 1200 × 800         | 3:2   |
| `logo/`         | Marka logosu (tercihen `.svg`)  | —                  | —     |
| `og/`           | Sosyal paylaşım (Open Graph)    | 1200 × 630         | 1.91:1|

## İsimlendirme kuralları

- Sadece küçük harf, rakam ve tire: `salon-genel-01.jpg` ✅ · `Salon Genel.JPG` ❌
- Türkçe karakter ve boşluk kullanma (`ç, ş, ı, ö` → `c, s, i, o`).
- **Antrenör fotoğrafları**, `src/data/trainers.ts` içindeki `id` ile aynı
  adlandırılır → eşleştirme kolay olur:
  - `antrenorler/ayse-yilmaz.jpg`
  - `antrenorler/mehmet-demir.jpg`
  - `antrenorler/zeynep-kaya.jpg`
  - `antrenorler/can-ozturk.jpg`

## Format

- Fotoğraf: `.jpg` (veya `.webp`). Şeffaflık gerekiyorsa `.png`.
- Logo/ikon: `.svg`.
- `next/image` çıktı formatını kendisi seçer; kaynağı `.jpg` bırakmak yeterli.

## Kod tarafında kullanım (örnek)

Bir görseli `next/image` ile göstermek:

```tsx
import Image from "next/image";

<Image
  src="/images/antrenorler/ayse-yilmaz.jpg"
  alt="Ayşe Yılmaz — Baş Antrenör"
  width={800}
  height={800}
  className="rounded-2xl object-cover"
/>;
```

> Not: `alt` metni **zorunludur** (erişilebilirlik + SEO). Boş bırakma.
> Ekran boyutuna göre esnek görsellerde `width/height` yerine `fill` +
> saran kutuya `position: relative` kullan.
