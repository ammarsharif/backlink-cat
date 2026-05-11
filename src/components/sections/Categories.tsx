'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const CATEGORIES = [
  { id: 'health', label: 'Health', icon: '/images/health.svg' },
  { id: 'technology', label: 'Technology', icon: '/images/technology.svg' },
  { id: 'travel', label: 'Travel', icon: '/images/travel.svg' },
  { id: 'business', label: 'Business', icon: '/images/business.svg' },
  { id: 'education', label: 'Education', icon: '/images/education.svg' },
];

export function Categories() {
  const [active, setActive] = useState('health');
  const [index, setIndex] = useState(CATEGORIES.length); // Start at the middle set for seamless looping
  const [isAnimating, setIsAnimating] = useState(false);
  
  const cardWidth = 220;
  const gap = 24;
  const totalWidth = cardWidth + gap;
  // Make the mask fit exactly 5 items: (5 * 220) + (4 * 24) = 1196px
  const visibleItems = 5;
  const sliderWidth = (cardWidth * visibleItems) + (gap * (visibleItems - 1));

  // Triple the items so we have [1,2,3,4,5] [1,2,3,4,5] [1,2,3,4,5]
  const tripledItems = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev + 1);
  };

  const onAnimationComplete = () => {
    setIsAnimating(false);
    // Reset index seamlessly to inner group
    if (index === 0) {
      setIndex(CATEGORIES.length);
    } else if (index === CATEGORIES.length * 2) {
      setIndex(CATEGORIES.length);
    }
  };

  return (
    <section className="py-8 bg-transparent relative z-10">
      <Container size="wide" className="max-w-[1580px]">
        <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-8 text-[#000000]">
          All Categories
        </h2>

        <div className="relative mx-auto w-full max-w-[1196px]">
          {/* Prev arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-[#6EBD44] flex items-center justify-center hover:bg-[#5da539] transition-all shadow-md z-20 cursor-pointer hidden md:flex"
            aria-label="Previous"
          >
            <img src="/images/left-arrow.svg" alt="Prev" className="w-[18px] h-[12px]" />
          </button>

          {/* Sliding container mask */}
          <div className="overflow-hidden mx-auto py-6 -my-6" style={{ maxWidth: `${sliderWidth}px` }}>
            <motion.div
              className="flex gap-[24px]"
              initial={false}
              animate={{ x: -(index * totalWidth) }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onAnimationComplete={onAnimationComplete}
            >
              {tripledItems.map((item, idx) => (
                <Link
                  key={`${item.id}-${idx}`}
                  href={`/category/${item.id}`}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-3 w-[220px] h-[160px] rounded-[15px] transition-all duration-300 shrink-0 bg-white/90 backdrop-blur-sm border-[1px] shadow-[0px_7px_14px_rgba(0,0,0,0.1)] hover:shadow-md hover:-translate-y-1',
                    active === item.id 
                      ? 'border-[#6EBD44] ring-1 ring-[#6EBD44]/20' 
                      : 'border-[#E0E0E0]'
                  )}
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[18px] font-medium text-[#000000]">{item.label}</span>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Next arrow */}
          <button
            onClick={handleNext}
            className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-[#6EBD44] flex items-center justify-center hover:bg-[#5da539] transition-all shadow-md z-20 cursor-pointer hidden md:flex"
            aria-label="Next"
          >
            <img src="/images/right-arrow.svg" alt="Next" className="w-[18px] h-[12px]" />
          </button>
        </div>
      </Container>
    </section>
  );
}

