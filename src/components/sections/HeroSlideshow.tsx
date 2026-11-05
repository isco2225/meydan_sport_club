"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlideshowProps = {
  /** Arka planda sırayla gösterilecek görsellerin yol listesi. */
  images: string[];
  /** Bir görselin ekranda kalma süresi (ms). */
  intervalMs?: number;
  /** Kapsayıcının konumu; varsayılan: bulunduğu kutuyu tamamen kaplayan arka plan. */
  className?: string;
  /** next/image `sizes`: görselin gerçek gösterim genişliği (gereksiz büyük indirmeyi önler). */
  sizes?: string;
};

/**
 * Hero arka planında görselleri yumuşak crossfade ile sırayla döndürür.
 * İlk görsel `fetchPriority="high"` ile hemen yüklenir (LCP); diğerleri düşük
 * öncelikle iner ve ilk görselle bant genişliği için yarışmaz. Görseller
 * yalnızca dekoratif olduğu için kapsayıcı `aria-hidden`'dır ve alt metinleri
 * boştur — sayfanın anlamını `h1` taşır. Hareket azaltma tercihinde döngü
 * kurulmaz; yalnızca ilk görsel sabit kalır.
 */
export default function HeroSlideshow({
  images,
  intervalMs = 6000,
  className = "absolute inset-0 -z-10",
  sizes = "100vw",
}: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div aria-hidden="true" className={className}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes={sizes}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
