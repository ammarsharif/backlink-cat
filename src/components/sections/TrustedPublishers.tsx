'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';

const PUBLISHERS = [
  { id: '1', name: 'TechCrunch', logo: '/images/logo-techcrunch.png' },
  { id: '2', name: 'Elite Daily', logo: '/images/logo-elitedaily.png' },
  { id: '3', name: 'Inc.', logo: '/images/logo-inc.png' },
  { id: '4', name: 'Lifehack', logo: '/images/logo-lifehack.png' },
  { id: '5', name: 'The Guardian', logo: '/images/logo-guardian.png' },
  { id: '6', name: 'Fast Company', logo: '/images/logo-fastcompany.png' },
  { id: '7', name: 'The Guardian 2', logo: '/images/logo-guardian.png' },
  { id: '8', name: 'Fast Company 2', logo: '/images/logo-fastcompany.png' },
  { id: '9', name: 'Inc. 2', logo: '/images/logo-inc.png' },
  { id: '10', name: 'TechCrunch 2', logo: '/images/logo-techcrunch.png' },
  { id: '11', name: 'Elite Daily 2', logo: '/images/logo-elitedaily.png' },
  { id: '12', name: 'Inc. 3', logo: '/images/logo-inc.png' },
];

const PER_PAGE = 6;

export function TrustedPublishers() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(PUBLISHERS.length / PER_PAGE);
  const visible = PUBLISHERS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section className="py-16 bg-[var(--color-bg-secondary)]">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] text-center mb-2">
          100K+ Trusted Publishers{' '}
          <span className="text-[var(--color-text-accent)]">Worldwide</span>
        </h2>
        <p className="text-center text-[var(--color-text-muted)] text-sm mb-10">
          {/* TODO: copy — subtitle if any */}
        </p>

        <div className="relative flex items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="shrink-0 w-9 h-9 rounded-full border border-[var(--color-border-default)] bg-white shadow-sm flex items-center justify-center hover:bg-[var(--color-state-hover)] transition-colors disabled:opacity-40"
            aria-label="Previous"
          >
            <ChevronLeft size={18} className="text-[var(--color-text-muted)]" />
          </button>

          <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
            {visible.map((pub) => (
              <div key={pub.id} className="flex items-center justify-center h-12 grayscale hover:grayscale-0 transition-all">
                {/* TODO: asset — place publisher logo images in /public/images/ */}
                <img
                  src={pub.logo}
                  alt={pub.name}
                  className="max-h-10 max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="shrink-0 w-9 h-9 rounded-full border border-[var(--color-border-default)] bg-white shadow-sm flex items-center justify-center hover:bg-[var(--color-state-hover)] transition-colors disabled:opacity-40"
            aria-label="Next"
          >
            <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Page dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                i === page ? 'bg-[var(--color-cta-bg)]' : 'bg-[var(--color-border-default)]'
              )}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
