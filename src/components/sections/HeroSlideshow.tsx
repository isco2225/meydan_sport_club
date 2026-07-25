"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlideshowProps = {
  /** Arka planda sırayla gösterilecek görsellerin yol listesi. */
  images: string[];
  /** Bir görselin ekranda kalma süresi (ms). */
  intervalMs?: number;
};

/**
 * Hero arka planında görselleri yumuşak crossfade ile sırayla döndürür.
 * İlk görsel `priority` ile yüklenir (LCP); diğerleri sonradan iner. Görseller
 * yalnızca dekoratif arka plan olduğu için kapsayıcı `aria-hidden`'dır ve alt
 * metinleri boştur — sayfanın anlamını `h1` taşır. Hareket azaltma tercihinde
 * döngü kurulmaz; yalnızca ilk görsel sabit kalır.
 */
export default function HeroSlideshow({
  images,
  intervalMs = 6000,
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
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
