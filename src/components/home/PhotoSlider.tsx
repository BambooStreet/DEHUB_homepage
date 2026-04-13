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

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-secondary-900 py-6 md:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          {/* Main slide */}
          <div className="relative flex-1 overflow-hidden rounded-xl">
            <div className="relative aspect-[16/10]">
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
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-medium">{slides[current].caption}</p>
              </div>
            </div>
          </div>

          {/* Vertical thumbnail list */}
          <div className="hidden md:flex flex-col gap-2 w-40 shrink-0">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                onClick={() => setCurrent(index)}
                className={`relative rounded-lg overflow-hidden flex-1 transition-all ${
                  index === current
                    ? "ring-2 ring-primary-400 opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                  <span className="text-white text-xs font-medium leading-tight">
                    {slide.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
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
