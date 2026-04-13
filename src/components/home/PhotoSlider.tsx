"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    src: "/images/avnIjrGMrtgaIPbrHLOM.jpg",
    alt: "DEHUB 졸업식 단체사진",
    caption: "졸업식",
  },
  {
    src: "/images/rufuobANNJCVNXEjUQBH.jpg",
    alt: "DEHUB 학회 참석 단체사진",
    caption: "학회 참석",
  },
  {
    src: "/images/mMVevVTOhLWbmRrwsjcC.png",
    alt: "Best Paper Award 수상",
    caption: "Best Paper Award",
  },
  {
    src: "/images/qCfGHAQQKvUbbpDWGjhw.png",
    alt: "Research Methodology Seminar",
    caption: "연구방법론 세미나",
  },
];

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative">
      <div className="relative overflow-hidden bg-secondary-900">
        {/* Slides */}
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          ))}

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white font-medium text-lg">{slides[current].caption}</p>
            </div>
          </div>

          {/* Prev/Next buttons */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-secondary-700 shadow transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-secondary-700 shadow transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
      </div>
    </section>
  );
}
