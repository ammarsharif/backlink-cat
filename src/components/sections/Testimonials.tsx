'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Paratha',
    avatar: '/images/avatar-1.jpg', // TODO: asset
    rating: 5,
    review:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, making it look like readable English.',
  },
  {
    id: '2',
    name: 'Paratha',
    avatar: '/images/avatar-2.jpg', // TODO: asset
    rating: 5,
    review:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, content here, making it look like readable English.',
  },
  {
    id: '3',
    name: 'John Doe',
    avatar: '/images/avatar-3.jpg', // TODO: asset
    rating: 5,
    review:
      'Exceptional service! BacklinkCAT helped me grow my site traffic significantly. The publishers are professional and the articles are well-written with proper SEO optimization throughout.',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const getVisible = () => {
    const indices = [];
    for (let i = 0; i < 2; i++) {
      indices.push((current + i) % TESTIMONIALS.length);
    }
    return indices;
  };

  return (
    <section className="py-16 bg-[var(--color-bg-primary)]">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] text-center mb-10">
          Customer <span className="text-[var(--color-text-accent)]">Reviews</span>
        </h2>

        <div className="relative flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            className="shrink-0 w-9 h-9 rounded-full border border-[var(--color-border-default)] bg-white shadow-sm flex items-center justify-center hover:bg-[var(--color-state-hover)] transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} className="text-[var(--color-text-muted)]" />
          </button>

          {/* Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {getVisible().map((idx) => {
              const t = TESTIMONIALS[idx];
              return (
                <div
                  key={t.id}
                  className="bg-white border border-[var(--color-border-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                      {/* TODO: asset — user avatar */}
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-text-heading)] text-sm">{t.name}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-5">
                    {t.review}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="shrink-0 w-9 h-9 rounded-full border border-[var(--color-border-default)] bg-white shadow-sm flex items-center justify-center hover:bg-[var(--color-state-hover)] transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                i === current ? 'bg-[var(--color-cta-bg)]' : 'bg-[var(--color-border-default)]'
              )}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
