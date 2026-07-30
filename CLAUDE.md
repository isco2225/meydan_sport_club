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
- `src/lib/site.ts` tek kaynak: `siteConfig` (adres/telefon/sosyal) + `navItems`.
- Ana sayfa tek sayfa (one-page): `app/page.tsx`, `components/sections/*` bölümlerini
  sırayla dizer. Her `Section` ekran yüksekliğinde ve `navItems.sectionId` ile eşleşen
  bir `id` taşır; menü `/#id` çapasına yumuşak kaydırır. İstisna: `HeroSection`
  `Section`'ı sarmaz, `id="ust"` ile kendi `<section>`'ını kurar (tam ekran arka plan).
- Ayrı rotalar (`hakkimizda`, `antrenorler`, `uyelik`, `ders-programi`, `iletisim`)
  aynı içeriği kendi sayfası + kendi `Metadata`'sıyla sunar. Alt sayfalar
  `PageHeader` (tek `h1`) + `Container` ile kurulur.
- İki sunumun (one-page bölümü ve ayrı rota) ortak gövdesi paylaşılan bileşenlerdir:
  `WorkingHours`, `MembershipPricing`, `SocialLinks`. Aynı bilgi iki yerde
  görünüyorsa JSX'i kopyalama — bu bileşenlerden birini kullan ya da yenisini çıkar.
- `app/layout.tsx`: Navbar + `main` + Footer, `lang="tr"`, Geist fontları, title şablonu.
  Tek `"use client"` bileşenleri `Navbar.tsx` ve `sections/HeroSlideshow.tsx`'tir;
  bir üçüncüsünü eklemeden önce etkileşimin gerçekten JS gerektirdiğini doğrula
  (ör. `FaqSection` yerleşik `<details>` ile server component kalıyor).
- Form: `src/lib/contact.ts` → `contactSchema` (Zod) + `ContactFormValues = z.infer`.
- Görseller `public/images/<alan>/` altında; klasör/ölçü/isimlendirme kuralları
  `public/images/README.md`'de — yeni görsel eklemeden önce oraya bak.
- Testler `src/` içinde eş konumlu `*.test.ts(x)` (Vitest, jsdom); E2E `e2e/` altında.
- DURUM: RHF kuruldu; form `ContactForm` + `src/lib/contact-action.ts` (server
  action, Zod + honeypot) ile çalışıyor. Resend anahtar bekliyor (action'daki
  TODO). Sanity henüz kurulmadı; içerik şu an `src/data`'da statik. JSON-LD'den
  yalnızca `FaqSection`'daki FAQPage var; ExerciseGym eklenmedi.

## Yayın yol haritası (bekleyen işler — Tem 2026)
- ⚠️ ACİL: `meydansportclub.com` süresi 8 Ağustos 2026'da doluyor — salon
  sahibi İsimtescil'den YENİLEMELİ, yoksa alan adı düşer.
- Alan adı: İsimtescil'de kayıtlı (isimtescil.net), DNS şu an Keyubu
  (keyubu.net) isim sunucularında. Salon sahibinden İsimtescil ve/veya Keyubu
  panel erişimi alınacak (alternatif: DNS kayıtlarını sahibi kendisi ekler).
- Vercel: site test için `*.vercel.app` adresinde; `main`'e push otomatik
  deploy tetikler. Alan adı erişimi gelince Settings → Domains'e
  `meydansportclub.com` bağlanacak (isim sunucularını Vercel'e taşımak
  DNS'i tek panelde toplar — önerilen yol).
- Resend: hesap kişisel Gmail ile açık; alan adı doğrulanmadan yalnızca hesap
  adresine gönderebiliyor. Domain doğrulaması (resend.com/domains, 2 TXT +
  1 MX kaydı) sonrası: `contact-action.ts`'de `from` adresini
  `info@meydansportclub.com` yap, `CONTACT_TO_EMAIL` salonun adresi olabilir.
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
  veriden türetilir (elle ikinci kopya yazma) ve `<` kaçışlanır — örnek: `FaqSection`.
- Semantik HTML: sayfa başına tek `h1`, hiyerarşik başlıklar, alt metni zorunlu.
- Tailwind v4: ayrı `tailwind.config.js` YOK. Tema `src/app/globals.css` içinde
  `@import "tailwindcss"` + `@theme inline` ile CSS değişkenlerinden tanımlanır.
  Renkleri oradan al; keyfî hex yazma.
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