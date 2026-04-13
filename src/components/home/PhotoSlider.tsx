"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { news } from "@/data/news";

const slides = news.filter((item) => item.image);

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (slides.length === 0) return null;

  return (
    <section className="bg-secondary-900 py-6 md:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          {/* Main slide */}
          <Link
            href={`/news/${slides[current].id}`}
            className="relative flex-1 overflow-hidden rounded-xl group"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={slides[current].image!}
                alt={slides[current].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary-600 text-white mb-2">
                  {slides[current].category}
                </span>
                <h3 className="text-white font-semibold text-lg leading-snug">
                  {slides[current].title}
                </h3>
                <p className="text-white/60 text-sm mt-1">{slides[current].date}</p>
              </div>
            </div>
          </Link>

          {/* Vertical thumbnail list */}
          <div className="hidden md:flex flex-col gap-2 w-40 shrink-0">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrent(index)}
                className={`relative rounded-lg overflow-hidden flex-1 transition-all ${
                  index === current
                    ? "ring-2 ring-primary-400 opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={slide.image!}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                  <span className="text-white text-xs font-medium leading-tight line-clamp-2">
                    {slide.title}
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
