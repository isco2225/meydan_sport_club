/**
 * Site görselleri (dosyalar `public/images/<alan>/` altında; kurallar
 * `public/images/README.md`'de). Görsel listesi veri katmanında yaşar;
 * bileşenler yalnızca map'ler.
 */

export type GalleryImage = {
  src: string;
  /** Erişilebilirlik + SEO için zorunlu, görseli anlatan alt metin. */
  alt: string;
  width: number;
  height: number;
};

/**
 * Hero slideshow'u. Kaynaklar dikey (≈ 9:16) telefon çekimleri: mobilde tam
 * ekran arka plan, masaüstünde dikey çerçeve içinde gösterilir — yatay tam
 * genişlikte büyütülüp bulanıklaşmasın diye. Dekoratiftir (alt boş).
 */
export const heroImages: string[] = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
  "/images/hero/hero-5.jpg",
  "/images/hero/hero-6.jpg",
];

/** Salon içi fotoğrafları (dikey, 1170 × 1558). */
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/galeri/salon-power-rack.jpg",
    alt: "Yüklü bar ve sehpanın bulunduğu power rack istasyonu; arkada salonun sarı kolonları",
    width: 1170,
    height: 1558,
  },
  {
    src: "/images/galeri/salon-serbest-agirlik.jpg",
    alt: "Ayarlanabilir sehpa ve bumper plakalı barlarla serbest ağırlık alanı",
    width: 1170,
    height: 1558,
  },
  {
    src: "/images/galeri/salon-kablolu-istasyon.jpg",
    alt: "Ağırlık yığınlı kablolu makine istasyonu ve arkada antrenman alanı",
    width: 1170,
    height: 1558,
  },
  {
    src: "/images/galeri/salon-agirlik-plakalari.jpg",
    alt: "Rack üzerinde 15 ve 10 kiloluk bumper ağırlık plakaları",
    width: 1170,
    height: 1558,
  },
];
