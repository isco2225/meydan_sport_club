@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Meydan Sport Club — Proje Hafızası

## Proje
- Spor salonu tanıtım/vitrin sitesi. Öncelik: yüksek hız, güçlü SEO, şık tasarım.
- Site içeriği ve commit mesajları Türkçe yazılır.
- Sayfalar: ana sayfa, hakkımızda, antrenörler, üyelik ücretleri, ders programı, SSS, iletişim.
- Çevrimiçi üye olma YOK; site yalnızca fiyat/ücret GÖSTERİR. "Paket" kavramı yok.

## Teknoloji (kesin kararlar — tartışma açma)
- Kurulu sürümler: Next.js 16, React 19, Zod 4, Tailwind 4, Vitest 4 (major'lar
  eğitim verinden yeni olabilir — AGENTS.md gereği önce `node_modules/next/dist/docs/`).
- Framework: Next.js App Router + TypeScript (strict).
- Stil: Tailwind. İçerik: Sanity. Deploy: Vercel.
- Form: React Hook Form + Zod. E-posta: Resend.
- Bot koruması: yalnızca honeypot (karar, Tem 2026: Turnstile ve Upstash rate
  limit İSTENMİYOR — site düşük trafikli; sahibi isterse ileride eklenir).

## Mimari
- Render: varsayılan SSG; sık değişen sayfalarda ISR. SSR'a kaçma.
- Varsayılan server component. `"use client"` sadece gerçek etkileşimde (menü, slider, form).
- Yeni bağımlılık eklemeden önce SOR.
- Redux vb. state kütüphaneleri ve MUI/Bootstrap gibi ağır UI kitleri YASAK.

## Kod yapısı (büyük resim)
- Alias: `@/*` → `src/*` (tsconfig + vitest). Göreli `../../` yerine `@/` kullan.
- İçerik veri odaklı: `src/data/*` (trainers, membership, schedule, faq, hours) tipli
  dizilerdir; bölüm bileşenleri bu diziyi map'ler. Metni burada değiştir, JSX'te değil.
  Sabitler de veri katmanında yaşar (ör. `hours.ts` → `CLOSED`, `summarizeHours()`).
- `src/lib/site.ts` tek kaynak: `siteConfig` (url, adres parçaları, telefon,
  WhatsApp, sosyal) + `navItems`. Bağlantılar (`tel:`, wa.me, harita, mailto)
  daima `src/lib/links.ts`'ten üretilir; numara/adres JSX'e yazılmaz.
- `src/lib/metadata.ts` → `pages` tek kaynak sayfa listesi: her sayfa
  `export const metadata = pageMetadata(pages.x)` kullanır; `sitemap.ts` da
  buradan üretilir. Yeni rota = buraya da ekle (`metadata.test.ts` yakalar).
  Open Graph sığ birleşir; paylaşım görseli (`public/images/og/`) bu yüzden
  `sharedOpenGraph` içinde açıkça verilir.
- JSON-LD: `src/lib/structured-data.ts` üretir (`gymJsonLd`, `faqPageJsonLd`),
  `components/JsonLd.tsx` basar (`<` kaçışı orada). Saatler `hours.ts`'te
  gün gün (`salonSchedules`); görünen satırlar ve `openingHoursSpecification`
  ondan türetilir.
- Ana sayfa tek sayfa (one-page): `app/page.tsx`, `components/sections/*` bölümlerini
  sırayla dizer. Her `Section` ekran yüksekliğinde ve `navItems.sectionId` ile eşleşen
  bir `id` taşır; menü `/#id` çapasına yumuşak kaydırır. İstisna: `HeroSection`
  `Section`'ı sarmaz, `id="ust"` ile kendi `<section>`'ını kurar (fotoğraflar dikey:
  mobilde tam ekran arka plan, masaüstünde sağda dikey çerçeve — tek slideshow örneği).
- Ayrı rotalar (`hakkimizda`, `antrenorler`, `uyelik`, `ders-programi`, `sss`, `iletisim`)
  aynı içeriği kendi sayfası + kendi `Metadata`'sıyla sunar. Alt sayfalar
  `PageHeader` (tek `h1`) + `Container` ile kurulur.
- İki sunumun (one-page bölümü ve ayrı rota) ortak gövdesi paylaşılan bileşenlerdir:
  `WorkingHours`, `MembershipPricing`, `SocialLinks`. Aynı bilgi iki yerde
  görünüyorsa JSX'i kopyalama — bu bileşenlerden birini kullan ya da yenisini çıkar.
  Mevcut ortak gövdeler: `AboutContent`, `WeeklySchedule`, `ScheduleNotice`,
  `FaqList`, `ContactDetails` (+ `getContactItems`, Footer da kullanır),
  `TrialCallout`, `SectionHeader`. Başlık düzeyi `headingLevel` prop'uyla
  çağırandan gelir (bölümde 3, alt sayfada 2).
- `app/layout.tsx`: Navbar + `main` + Footer, `lang="tr"`, Geist fontları, title şablonu.
  Mobilde her sayfanın altında `MobileActionBar` (Ara · WhatsApp · Yol Tarifi)
  durur; `body` mobilde `--action-bar-h` kadar alt boşluk bırakır.
  `"use client"` bileşenleri yalnızca `Navbar.tsx`, `ContactForm.tsx` ve
  `sections/HeroSlideshow.tsx`'tir; yenisini eklemeden önce etkileşimin gerçekten
  JS gerektirdiğini doğrula (ör. `FaqSection` yerleşik `<details>` ile server
  component kalıyor).
- Form: `src/lib/contact.ts` → `contactSchema` (Zod) + `ContactFormValues = z.infer`.
- Görseller `public/images/<alan>/` altında; klasör/ölçü/isimlendirme kuralları
  `public/images/README.md`'de — yeni görsel eklemeden önce oraya bak.
- Testler `src/` içinde eş konumlu `*.test.ts(x)` (Vitest, jsdom); E2E `e2e/` altında.
- DURUM: form `ContactForm` + `src/lib/contact-action.ts` (server action, Zod +
  honeypot) ile Resend'e tam bağlı; env eksikse kibar hata döner, gönderici
  geçici olarak `onboarding@resend.dev`. Form arayüzü kapalı modda —
  `ContactSection` `emailEnabled` vermiyor, açılışı yol haritasında. Sanity
  henüz kurulmadı; içerik şu an `src/data`'da statik. JSON-LD: ana sayfada
  ExerciseGym (kadınlar salonu ayrı `department`) + FAQPage. FAQPage yalnızca
  ana sayfada; `/sss` aynı listeyi JSON-LD'siz gösterir (Google tek kopya ister).
- WhatsApp numarası VARSAYIM: telefonla aynı (`siteConfig.whatsapp`). Salon
  sahibinden teyit alınmadı.

## Yayın yol haritası (bekleyen işler — Kas 2026)
- Alan adı (whois, 6 Kas 2026): `meydansportclub.com` 5 Kasım 2026'da
  GoDaddy'de YENİDEN kaydedilmiş (eski İsimtescil kaydı düşmüş); bitiş
  5 Kasım 2027. İsim sunucuları GoDaddy (`ns71/72.domaincontrol.com`).
  Vercel'e bağlı ve canlı: kök adres `www.meydansportclub.com`'a 308 ile
  yönleniyor → kanonik adres `www` (`siteConfig.url`). Yenileme hatırlatması
  ve otomatik yenileme GoDaddy'de açılmalı.
- `main`'e push otomatik olarak CANLI alan adına deploy eder. İnceleme için
  branch push'u (Vercel preview) kullan.
- E-posta: alan adında MX kaydı YOK → `info@meydansportclub.com`'a posta
  ulaşmıyor. Karar (6 Kas 2026): `siteConfig.email = null`, e-posta siteden
  ve JSON-LD'den kaldırıldı. GoDaddy e-posta / Google Workspace / Zoho vb.
  kurulunca `siteConfig.email`'e adresi yazmak yeterli; İletişim, Footer ve
  JSON-LD kendiliğinden gösterir.
- Resend: hesap kişisel Gmail ile açık; alan adı doğrulanmadan yalnızca hesap
  adresine gönderebiliyor. DNS artık GoDaddy'de: domain doğrulaması
  (resend.com/domains, 2 TXT + 1 MX kaydı) GoDaddy DNS'ine eklenir. Sonra
  `contact-action.ts`'de `from` adresini `info@meydansportclub.com` yap,
  `CONTACT_TO_EMAIL` salonun adresi olabilir.
- Site dışı en büyük SEO kaldıracı: Google İşletme Profili (Maps); ad/adres/
  telefon sitedekiyle birebir aynı olmalı.
- Vercel ortam değişkenleri: `RESEND_API_KEY` + `CONTACT_TO_EMAIL`
  (Settings → Environment Variables; değerler yerelde `.env.local`'de).
- Formu açma: `ContactSection`'da `<ContactForm emailEnabled />` yap ve
  `ContactForm.test.tsx`'teki kapalı-mod testini yeni davranışa göre düzelt.

## Kod standartları
- `any` YASAK.
- Zod şeması tek doğruluk kaynağıdır; tipler `z.infer` ile türetilir.
- Görselde her zaman `next/image`, fontta `next/font`. `<img>` kullanma.
- Her sayfada Metadata API ile özgün title/description.
- Ana sayfada JSON-LD (ExerciseGym) yapılandırılmış verisi. JSON-LD daima görünen
  veriden türetilir (elle ikinci kopya yazma) ve `<` kaçışlanır — `components/JsonLd.tsx`.
- Semantik HTML: sayfa başına tek `h1`, hiyerarşik başlıklar, alt metni zorunlu.
- Tailwind v4: ayrı `tailwind.config.js` YOK. Tema `src/app/globals.css` içinde
  `@import "tailwindcss"` + `@theme inline` ile CSS değişkenlerinden tanımlanır.
  Renkleri oradan al; keyfî hex yazma.
- Tema daima koyu (açık mod yok). `dark:` varyantı ve `border-black/10` gibi
  sabit tonlar KULLANMA; `border-line`, `bg-surface`, `text-foreground/NN`,
  `brand` token'larını kullan. Küçük metinde `text-foreground/55` altına inme
  (AA kontrast). Marka sarısı üstüne metin daima siyah.
- `Container`'a `className` ile `max-w-*` verme: kendi `max-w-6xl`'ı ile
  çakışır ve CSS sırası yüzünden uygulanmaz. Dar içerik için içine
  `<div className="max-w-3xl">` koy.
- Zod v4 API'si: e-posta gibi doğrulamalar üst düzey (`z.email()`), eski
  `z.string().email()` değil. Bkz. `src/lib/contact.ts`.

## Güvenlik
- Sırlar yalnızca `.env.local` içinde yaşar. Koda gömme, commit'leme.
- Gizli değeri asla `NEXT_PUBLIC_` önekiyle istemciye sızdırma.
- `.env.local` içeriğini terminale veya sohbete asla yazdırma.
- Form verisi sunucuda Zod ile doğrulanır.
- Form endpoint'i sunucu doğrulaması + honeypot olmadan bitmiş sayılmaz.
  (Rate limit ve Turnstile bilinçli olarak kapsam dışı — bkz. Teknoloji.)

## Komutlar
- Geliştirme: `npm run dev` · Prod derleme: `npm run build` · Sunum: `npm run start`.
- Lint: `npm run lint` · Tip kontrolü: `npm run typecheck` (`tsc --noEmit`).
- Birim test (Vitest): `npm run test` · İzleme: `npm run test:watch`.
- Tek dosya/test: `npx vitest run src/lib/contact.test.ts` veya `-t "desen"`.
- E2E (Playwright): `npm run test:e2e` (dev sunucusunu kendi başlatır; `e2e/` altında).
- Tam kapı: `npm run verify` = lint → typecheck → test. Build ayrı çalıştırılır
  (`npm run build`); verify'a dahil DEĞİLDİR. E2E de verify'a dahil değildir.

## Çalışma şekli
- Anlamlı her değişiklikten sonra lint + build çalıştır; temizse küçük, açıklayıcı commit at.
- Üçten fazla dosyaya dokunacak işlerde önce kısa plan sun, onay bekle.

## Test ve kalite kapısı
- Kod değiştiren her işin sonunda `npm run verify` çalıştır. Sonucu bana
  gerçek çıktısıyla bildir; "muhtemelen geçer" deme, çalıştır.
- Kırmızıysa: önce kök nedeni bul, KODU düzelt, tekrar çalıştır. Yeşile
  dönmeden işi tamamlanmış sayma.
- Testi geçirmek için testi değiştirmek, silmek, .skip/.only eklemek veya
  assertion gevşetmek YASAK. Test gerçekten hatalıysa dur ve bana sor.
- `git push` yalnızca verify temiz geçtikten sonra yapılır.
  `--no-verify` ile hook atlamak yasak. Şüphedeysen push etme, sor.
- Yeni özellik yeni test getirir. Zod şemaları, yardımcı fonksiyonlar ve
  iletişim formu akışı her zaman test kapsamında kalmalı.