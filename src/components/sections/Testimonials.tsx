"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Paratha",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, making it look like readable English.",
  },
  {
    id: "2",
    name: "Paratha",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, content here, making it look like readable English.",
  },
  {
    id: "3",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    review:
      "Exceptional service! BacklinkCAT helped me grow my site traffic significantly. The publishers are professional and the articles are well-written with proper SEO optimization throughout.",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Adjust for loop display - show 3 items on desktop, 2 on tablet, 1 on mobile
  const displayTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].slice(current, current + 3);

  return (
    <section className="pt-10 pb-20 bg-[#F9F9F9] overflow-hidden">
      <Container>
        <h2 className="text-[32px] md:text-[54px] font-bold text-center mb-16 font-[var(--font-heading)]">
          Customer <span className="text-[#7FC142]">Reviews</span>
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Controls */}
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20">
            <button
              onClick={prev}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#7FC142] hover:text-white transition-all group"
            >
              <ChevronLeft size={28} className="text-[#444444] group-hover:text-white" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20">
            <button
              onClick={next}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#7FC142] hover:text-white transition-all group"
            >
              <ChevronRight size={28} className="text-[#444444] group-hover:text-white" />
            </button>
          </div>

          {/* Slider Container */}
          <div className="px-4 overflow-hidden">
            <motion.div 
              className="flex gap-6"
              initial={false}
              animate={{ x: 0 }}
              key={current}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {displayTestimonials.map((t, idx) => (
                  <motion.div
                    key={`${t.id}-${idx}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shrink-0 bg-white border border-[#E0E0E0] rounded-[24px] p-6 lg:p-8 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 border-4 border-[#7FC142]/10 p-1 shrink-0">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[20px] md:text-[24px] text-black">
                          {t.name}
                        </p>
                        <div className="flex gap-1 mt-1.5">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-[#FFC107] fill-[#FFC107]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] md:text-[18px] text-[#555555] leading-relaxed italic line-clamp-4">
                      "{t.review}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === current
                  ? "w-10 bg-[#7FC142]"
                  : "w-2.5 bg-[#D0D0D0] hover:bg-[#B0B0B0]"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
