import { Play } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const PUBLISHER_FEATURES = [
  'Maximum guest post orders',
  'High earning commissions',
  'Lifetime monetization',
  'HQ SEO-optimized articles',
  'Payment security',
  'Payment within 24 hours',
  '24/7 support',
];

export function WhyPublishers() {
  return (
    <section className="py-16 bg-[var(--color-bg-primary)]">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] text-center mb-12">
          Why <span className="text-[var(--color-text-accent)]">Publishers</span> Choose Us?
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Feature list */}
          <div className="flex-1">
            <ul className="space-y-4">
              {PUBLISHER_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-cta-bg)] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[var(--color-text-secondary)] text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Video placeholder */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative rounded-[var(--radius-xl)] overflow-hidden bg-gray-900 aspect-video flex items-center justify-center shadow-[var(--shadow-lg)]">
              {/* TODO: asset — place publishers-video-thumbnail.jpg in /public/images/ */}
              <img
                src="/images/publishers-video-thumb.jpg"
                alt="Why Publishers Choose Us video"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <button
                className="relative z-10 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                aria-label="Play video"
              >
                <Play size={22} className="text-[var(--color-cta-bg)] ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
