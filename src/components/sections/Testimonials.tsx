"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { fetchReviews, type Review } from "@/lib/reviewsService";

function ReviewSkeleton() {
  return (
    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shrink-0 bg-white border border-[#E0E0E0] rounded-[24px] p-6 lg:p-8 shadow-sm flex flex-col gap-6 animate-pulse">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-5 w-32 bg-gray-200 rounded-md" />
          <div className="h-4 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-gray-200 rounded-md" />
        <div className="h-4 w-full bg-gray-200 rounded-md" />
        <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchReviews()
      .then(setReviews)
      .finally(() => setLoading(false));
  }, []);

  const total = reviews.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  const displayReviews = total > 0
    ? [...reviews, ...reviews, ...reviews].slice(current, current + 3)
    : [];

  return (
    <section className="pt-10 pb-20 bg-[#F9F9F9] overflow-hidden">
      <Container>
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-center mb-16 font-[var(--font-heading)]">
          Customer <span className="text-[#7FC142]">Reviews</span>
        </h2>

        <div className="relative max-w-[1350px] mx-auto">
          {/* Controls — hidden during loading or when not enough reviews */}
          {!loading && total > 0 && (
            <>
              <div className="absolute top-1/2 -left-4 md:-left-14 -translate-y-1/2 z-20">
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
            </>
          )}

          {/* Slider Container */}
          <div className="px-4 overflow-hidden">
            {loading ? (
              <div className="flex gap-6">
                <ReviewSkeleton />
                <ReviewSkeleton />
                <ReviewSkeleton />
              </div>
            ) : total === 0 ? (
              <p className="text-center text-[#888] text-lg py-10">No reviews yet.</p>
            ) : (
              <motion.div
                className="flex gap-6"
                initial={false}
                animate={{ x: 0 }}
                key={current}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {displayReviews.map((t, idx) => (
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
            )}
          </div>
        </div>

        {/* Dots */}
        {!loading && total > 0 && (
          <div className="flex justify-center gap-3 mt-16">
            {reviews.map((_, i) => (
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
        )}
      </Container>
    </section>
  );
}
