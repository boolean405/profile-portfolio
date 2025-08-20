"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export default function ProjectGallery({ images, alt }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 2000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!images?.length) return null;

  return (
    <div className="group relative">
      <div
        className="overflow-hidden rounded-2xl border border-black/10 shadow-sm"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((src, idx) => (
            <div key={src + idx} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={src}
                  alt={`${alt} – ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  // Serve smaller images on small screens
                  sizes="(min-width:1280px) 1024px, (min-width:1024px) 840px, (min-width:768px) 720px, 100vw"
                  className="rounded-none object-cover"
                  quality={80}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))/0.9] px-3 py-2 text-sm shadow-sm backdrop-blur transition hover:bg-[rgb(var(--card))] md:opacity-0 md:group-hover:opacity-100"
        aria-label="Previous image"
      >
        ◀
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))/0.9] px-3 py-2 text-sm shadow-sm backdrop-blur transition hover:bg-[rgb(var(--card))] md:opacity-0 md:group-hover:opacity-100"
        aria-label="Next image"
      >
        ▶
      </button>

      {/* Dots (simple, neutral) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {images.map((_, i) => (
          <span key={i} className="h-1.5 w-6 rounded-full bg-black/20 backdrop-blur first:bg-black/35" />
        ))}
      </div>
    </div>
  );
}
