'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Monitor, Plane, Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';

const CATEGORIES = [
  { id: 'health', label: 'Health', icon: '/images/health.svg' },
  { id: 'technology', label: 'Technology', icon: '/images/technology.svg' },
  { id: 'travel', label: 'Travel', icon: '/images/travel.svg' },
  { id: 'business', label: 'Business', icon: '/images/business.svg' },
  { id: 'education', label: 'Education', icon: '/images/education.svg' },
];

export function Categories() {
  const [active, setActive] = useState('health');
  const [index, setIndex] = useState(CATEGORIES.length); // Start at the middle set
  const [isAnimating, setIsAnimating] = useState(false);
  
  const cardWidth = 280;
  const gap = 30;
  const totalWidth = cardWidth + gap;

  // Triple the items for infinite effect
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
    // Reset to middle set if we reach the ends
    if (index <= 0) {
      setIndex(CATEGORIES.length);
    } else if (index >= CATEGORIES.length * 2 - 1) {
      setIndex(CATEGORIES.length - 1);
    }
  };

  // Calculate centered offset
  // We want the middle of the viewport to be the focus
  // Container is max-w-[1521px]
  return (
    <section className="py-12 bg-transparent relative z-10 overflow-hidden">
      <Container size="wide" className="max-w-[1580px]">
        <h2 className="text-[32px] md:text-[40px] font-bold text-center mb-10 text-[#000000]">
          All Categories
        </h2>

        <div className="relative w-full max-w-[1521px] mx-auto">
          {/* Prev arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-[-22px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-[#6EBD44] flex items-center justify-center hover:bg-[#5da539] transition-all shadow-md z-20 cursor-pointer"
            aria-label="Previous"
          >
            <img src="/images/left-arrow.svg" alt="Prev" className="w-[18px] h-[12px]" />
          </button>

          {/* Sliding container */}
          <div className="overflow-hidden px-4">
            <motion.div
              className="flex gap-[30px]"
              initial={false}
              animate={{ x: -(index * totalWidth) + (1521 / 2) - (cardWidth / 2) - 16 }} // -16 for px-4 padding adjustment
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onAnimationComplete={onAnimationComplete}
            >
              {tripledItems.map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-4 w-[280px] h-[202px] rounded-[15px] transition-all duration-300 shadow-md shrink-0 bg-white hover:shadow-lg',
                    active === item.id ? 'shadow-lg border border-[#6EBD44]/50' : 'border border-transparent'
                  )}
                >
                  <div className="w-[60px] h-[60px] flex items-center justify-center mb-1">
                    <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[18px] md:text-[20px] font-medium text-[#000000]">{item.label}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Next arrow */}
          <button
            onClick={handleNext}
            className="absolute right-[-22px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-[#6EBD44] flex items-center justify-center hover:bg-[#5da539] transition-all shadow-md z-20 cursor-pointer"
            aria-label="Next"
          >
            <img src="/images/right-arrow.svg" alt="Next" className="w-[18px] h-[12px]" />
          </button>
        </div>
      </Container>
    </section>
  );
}
