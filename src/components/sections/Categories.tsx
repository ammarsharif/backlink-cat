'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Monitor, Plane, Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';

const CATEGORIES = [
  { id: 'health', label: 'Health', icon: Heart },
  { id: 'technology', label: 'Technology', icon: Monitor },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
];

export function Categories() {
  const [active, setActive] = useState('health');

  return (
    <section className="py-14 bg-[var(--color-bg-primary)]">
      <Container>
        <SectionTitle title="All Categories" className="mb-8" />

        <div className="relative flex items-center gap-2">
          {/* Prev arrow */}
          <button
            className="shrink-0 w-8 h-8 rounded-full border border-[var(--color-border-default)] bg-white flex items-center justify-center hover:bg-[var(--color-state-hover)] transition-colors shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft size={16} className="text-[var(--color-text-muted)]" />
          </button>

          {/* Category cards */}
          <div className="flex-1 flex justify-center gap-3 flex-wrap sm:flex-nowrap overflow-x-auto scrollbar-none pb-1">
            {CATEGORIES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 w-28 h-24 rounded-[var(--radius-lg)] border transition-all duration-200 shadow-sm text-sm font-semibold shrink-0',
                  active === id
                    ? 'bg-[var(--color-cta-bg)] border-[var(--color-cta-bg)] text-white'
                    : 'bg-white border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-cta-bg)] hover:text-[var(--color-cta-bg)]'
                )}
              >
                <Icon size={28} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            className="shrink-0 w-8 h-8 rounded-full border border-[var(--color-border-default)] bg-white flex items-center justify-center hover:bg-[var(--color-state-hover)] transition-colors shadow-sm"
            aria-label="Next"
          >
            <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
          </button>
        </div>
      </Container>
    </section>
  );
}
