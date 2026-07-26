# Meydan Sport Club

Spor salonu tanıtım (vitrin) sitesi. Öncelikler: yüksek hız, güçlü SEO ve şık
tasarım. Site **yalnızca bilgi ve ücret gösterir** — çevrimiçi üyelik/ödeme akışı
yoktur.

Arayüz metinleri ve commit mesajları Türkçe yazılır.

## Teknoloji

| Alan       | Seçim                                    |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16 (App Router)                  |
| Dil        | TypeScript (`strict`)                    |
| UI         | React 19                                 |
| Stil       | Tailwind CSS 4 (ayrı config dosyası yok) |
| Doğrulama  | Zod 4                                    |
| Birim test | Vitest 4 + Testing Library (jsdom)       |
| E2E test   | Playwright                               |
| Font       | `next/font` ile Geist / Geist Mono       |
| Deploy     | Vercel                                   |

Gereksinim: Node.js 20.9+ (geliştirme `v22` ile yapılıyor).

## Başlarken

```bash
npm install
npm run dev
```

Ardından http://localhost:3000 adresini açın.

## Komutlar

| Komut                | Ne yapar                                         |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Geliştirme sunucusu                              |
| `npm run build`      | Prod derleme                                     |
| `npm run start`      | Derlenmiş çıktıyı sunar                          |
| `npm run lint`       | ESLint                                           |
| `npm run typecheck`  | `tsc --noEmit`                                   |
| `npm run test`       | Birim testler (tek seferlik)                     |
| `npm run test:watch` | Birim testler (izleme modu)                      |
| `npm run test:e2e`   | Playwright E2E (dev sunucusunu kendisi başlatır) |
| `npm run verify`     | Kalite kapısı: lint → typecheck → test           |

Tek bir test dosyası ya da tek bir test:

```bash
npx vitest run src/lib/contact.test.ts
npx vitest run -t "desen"
```

`npm run verify`; `build` ve `test:e2e` içermez — onları ayrıca çalıştırın.

## Yapı

```
src/
  app/            # App Router rotaları + globals.css
  components/     # Paylaşılan bileşenler
    sections/     # Ana sayfanın (one-page) bölümleri
  data/           # Site içeriği: tipli diziler
  lib/            # site.ts (siteConfig, navItems), contact.ts (Zod şeması)
e2e/              # Playwright testleri
public/images/    # Görseller (kurallar: public/images/README.md)
```

**Ana sayfa tek sayfadır (one-page).** `src/app/page.tsx`, `components/sections/*`
bölümlerini sırayla dizer; her bölüm ekran yüksekliğinde olur ve menüdeki `/#id`
çapasına karşılık gelen bir `id` taşır. Menü bağlantıları `src/lib/site.ts`
içindeki `navItems`'tan gelir.

Aynı içerik ayrıca kendi rotasında, kendi `Metadata`'sıyla erişilebilir:
`/hakkimizda`, `/antrenorler`, `/uyelik`, `/ders-programi`, `/iletisim`.
İki sunumun ortak gövdesi paylaşılan bileşenlerdir (`WorkingHours`,
`MembershipPricing`, `SocialLinks`) — böylece bilgi tek yerde durur.

Bileşenler varsayılan olarak server component'tir; `"use client"` yalnızca
`Navbar` ve `HeroSlideshow`'da kullanılır.

## İçeriği düzenleme

Metinler JSX içinde değil, veri katmanında durur. Değişiklikleri buradan yapın:

| Dosya                    | İçerik                                              |
| ------------------------ | --------------------------------------------------- |
| `src/lib/site.ts`        | Ad, açıklama, adres, telefon, e-posta, sosyal, menü |
| `src/data/trainers.ts`   | Antrenör kadrosu                                    |
| `src/data/membership.ts` | Üyelik ücretleri, ek ücretler, `formatTRY()`        |
| `src/data/schedule.ts`   | Haftalık ders programı                              |
| `src/data/hours.ts`      | Çalışma saatleri (karma + kadınlar salonu)          |
| `src/data/faq.ts`        | SSS — ana sayfadaki FAQPage JSON-LD'sini de besler   |

Görsel eklerken klasör, ölçü ve isimlendirme kuralları için
[`public/images/README.md`](public/images/README.md)'ye bakın. Görseller her zaman
`next/image` ile gösterilir ve `alt` metni zorunludur.

## Test

Birim testleri kaynakla eş konumludur (`src/**/*.test.ts(x)`), E2E testleri `e2e/`
altındadır. Veri dosyaları, yardımcı fonksiyonlar ve Zod şemaları test kapsamında
tutulur; yeni özellik yeni test getirir.

Kod değiştiren her işin sonunda `npm run verify` yeşil olmalıdır.

## Geliştirme notları

Mimari kararlar, kod standartları ve çalışma kuralları [`CLAUDE.md`](CLAUDE.md)
dosyasındadır. Next.js'in kurulu sürümü eğitim verisinden yeni olabileceği için,
kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili rehbere bakılır
(bkz. [`AGENTS.md`](AGENTS.md)).
