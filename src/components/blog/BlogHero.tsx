'use client';

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const SLIDES = [
  {
    id: 1,
    image: "/images/blog-head-image.svg",
    category: "SEO",
    title: "What is SEO?",
    author: "darik Jen",
  },
  {
    id: 2,
    image: "/images/blog-image.svg",
    category: "Digital Marketing",
    title: "Loft Office With Vintage Decor",
    author: "darik Jen",
  },
];

export function BlogHero() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <section className="pt-8 pb-0">
      <Container size="wide" className="max-w-[1534px]">
        {/* Outer wrapper: relative + overflow-visible so arrows can protrude */}
        <div className="relative">
          {/* Slider image area - overflow hidden for rounded corners */}
          <div className="relative overflow-hidden rounded-[20px] shadow-lg">
            {/* Image */}
            <div className="aspect-[16/6] md:aspect-[1534/580] w-full relative min-h-[220px]">
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Dark overlay — strong bottom-heavy gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/5" />

              {/* Text content */}
              <div className="absolute bottom-[30px] left-[28px] md:bottom-[56px] md:left-[72px] max-w-[640px] z-10">
                <span
                  style={{ color: '#6EBD44' }}
                  className="text-[18px] md:text-[26px] font-extrabold block mb-1 font-[var(--font-poppins)] tracking-wide uppercase"
                >
                  {slide.category}
                </span>
                <h1
                  className="text-[26px] md:text-[48px] font-bold leading-snug mb-2 font-[var(--font-poppins)]"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.8)',
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-[15px] md:text-[20px] font-[var(--font-inter)]"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 1px 8px rgba(0,0,0,0.85)',
                  }}
                >
                  By: {slide.author}
                </p>
              </div>
            </div>

            {/* Dot indicators — inside the rounded container */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'bg-[#6EBD44] w-6' : 'bg-white/60 w-2'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Arrows — outside overflow-hidden, centered over the slider */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-[-24px] md:left-[-28px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] md:w-[58px] md:h-[58px] bg-[#6EBD44] rounded-full flex items-center justify-center hover:bg-[#5da539] hover:scale-110 active:scale-95 transition-all z-20 shadow-xl"
          >
            <img src="/images/left-arrow.svg" alt="" className="w-4 md:w-[20px]" />
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-[-24px] md:right-[-28px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] md:w-[58px] md:h-[58px] bg-[#6EBD44] rounded-full flex items-center justify-center hover:bg-[#5da539] hover:scale-110 active:scale-95 transition-all z-20 shadow-xl"
          >
            <img src="/images/right-arrow.svg" alt="" className="w-4 md:w-[20px]" />
          </button>
        </div>

        {/* Divider */}
        <hr className="mt-10 mb-0 border-[#E0E0E0]" />
      </Container>
    </section>
  );
}
