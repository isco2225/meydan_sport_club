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
- Rate limit: Upstash. Bot koruması: Cloudflare Turnstile.

## Mimari
- Render: varsayılan SSG; sık değişen sayfalarda ISR. SSR'a kaçma.
- Varsayılan server component. `"use client"` sadece gerçek etkileşimde (menü, slider, form).
- Yeni bağımlılık eklemeden önce SOR.
- Redux vb. state kütüphaneleri ve MUI/Bootstrap gibi ağır UI kitleri YASAK.

## Kod yapısı (büyük resim)
- Alias: `@/*` → `src/*` (tsconfig + vitest). Göreli `../../` yerine `@/` kullan.
- İçerik veri odaklı: `src/data/*` (trainers, membership, schedule, faq) tipli dizilerdir;
  bölüm bileşenleri bu diziyi map'ler. Metni burada değiştir, JSX'te değil.
- `src/lib/site.ts` tek kaynak: `siteConfig` (adres/telefon/sosyal) + `navItems`.
- Ana sayfa tek sayfa (one-page): `app/page.tsx`, `components/sections/*` bölümlerini
  sırayla dizer. Her `Section` ekran yüksekliğinde ve `navItems.sectionId` ile eşleşen
  bir `id` taşır; menü `/#id` çapasına yumuşak kaydırır.
- Ayrı rotalar (`hakkimizda`, `antrenorler`, `uyelik`, `ders-programi`, `iletisim`)
  aynı içeriği kendi sayfası + kendi `Metadata`'sıyla sunar.
- `app/layout.tsx`: Navbar + `main` + Footer, `lang="tr"`, Geist fontları, title şablonu.
  Tek `"use client"` bileşeni `Navbar.tsx`'tir.
- Form: `src/lib/contact.ts` → `contactSchema` (Zod) + `ContactFormValues = z.infer`.
- Testler `src/` içinde eş konumlu `*.test.ts(x)` (Vitest, jsdom); E2E `e2e/` altında.
- DURUM: Sanity/RHF/Resend/Upstash/Turnstile HENÜZ kurulmadı; içerik şu an `src/data`'da
  statik, JSON-LD eklenmedi. Bunlar hedef kararlar — kurarken CLAUDE.md'ye uy.

## Kod standartları
- `any` YASAK.
- Zod şeması tek doğruluk kaynağıdır; tipler `z.infer` ile türetilir.
- Görselde her zaman `next/image`, fontta `next/font`. `<img>` kullanma.
- Her sayfada Metadata API ile özgün title/description.
- Ana sayfada JSON-LD (ExerciseGym) yapılandırılmış verisi.
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
- Form endpoint'i; rate limit + honeypot + Turnstile üçlüsü olmadan bitmiş sayılmaz.

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