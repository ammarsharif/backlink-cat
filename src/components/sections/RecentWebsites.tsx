import { ChevronRight, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface MetricRingProps {
  value: number;
  color: string;
  label: string;
}

function MetricRing({ value, color, label }: MetricRingProps) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const filled = (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative w-11 h-11">
        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
          <circle cx="22" cy="22" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={`${filled} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[var(--color-text-primary)]">
          {value}
        </span>
      </div>
      <span className="text-[9px] text-[var(--color-text-muted)] font-medium">{label}</span>
    </div>
  );
}

const MOCK_WEBSITES = [
  {
    id: 'site-1',
    url: 'www.techinsight.com',
    da: 52,
    dr: 48,
    traffic: 35,
    spam: 2,
    linkType: 'Do-Follow',
    niche: 'Technology',
    opPrice: 350,
    listPrice: 90,
    cryptoPrice: 250,
    reviews: 5,
  },
  {
    id: 'site-2',
    url: 'www.financenow.net',
    da: 45,
    dr: 42,
    traffic: 28,
    spam: 1,
    linkType: 'Do-Follow',
    niche: 'Finance',
    opPrice: 420,
    listPrice: 110,
    cryptoPrice: 300,
    reviews: 5,
  },
  {
    id: 'site-3',
    url: 'www.healthylife.org',
    da: 38,
    dr: 35,
    traffic: 42,
    spam: 4,
    linkType: 'Do-Follow',
    niche: 'Health',
    opPrice: 280,
    listPrice: 75,
    cryptoPrice: 200,
    reviews: 4,
  },
  {
    id: 'site-4',
    url: 'www.travelbug.com',
    da: 31,
    dr: 29,
    traffic: 50,
    spam: 3,
    linkType: 'Do-Follow',
    niche: 'Travel',
    opPrice: 150,
    listPrice: 45,
    cryptoPrice: 120,
    reviews: 5,
  },
  {
    id: 'site-5',
    url: 'www.businessdaily.com',
    da: 62,
    dr: 58,
    traffic: 15,
    spam: 1,
    linkType: 'Do-Follow',
    niche: 'Business',
    opPrice: 550,
    listPrice: 180,
    cryptoPrice: 450,
    reviews: 5,
  },
];


export function RecentWebsites() {
  return (
    <section className="py-16 bg-[var(--color-bg-primary)]">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] text-center mb-10">
          Recently <span className="text-[var(--color-text-accent)]">Added</span> Websites
        </h2>

        <div className="flex flex-col gap-3">
          {MOCK_WEBSITES.map((site) => (
            <div
              key={site.id}
              className="bg-white border border-[var(--color-border-card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* URL */}
              <div className="sm:w-40 shrink-0">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Website URL:</p>
                <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">{site.url}</p>
              </div>

              {/* Metrics */}
              <div className="flex items-end gap-3 flex-wrap">
                <MetricRing value={site.da} color="#ef4444" label="MOZ DA" />
                <MetricRing value={site.dr} color="#f59e0b" label="MOZ DR" />
                <MetricRing value={site.traffic} color="#22c55e" label="Alexa Traffic" />
                <MetricRing value={site.spam} color="#8b5cf6" label="Spam Score" />
              </div>

              {/* Link info */}
              <div className="hidden md:flex flex-col gap-1 sm:w-32 shrink-0">
                <div>
                  <p className="text-[9px] text-[var(--color-text-muted)]">Link Type</p>
                  <p className="text-xs font-medium text-[var(--color-text-primary)]">{site.linkType}</p>
                </div>
                <div>
                  <p className="text-[9px] text-[var(--color-text-muted)]">Niche</p>
                  <p className="text-xs font-medium text-[var(--color-text-primary)] line-clamp-1">{site.niche}</p>
                </div>
              </div>

              {/* Prices */}
              <div className="hidden lg:flex items-center gap-4 shrink-0">
                {[
                  { label: 'OP Price', value: site.opPrice },
                  { label: 'L.Price', value: site.listPrice },
                  { label: 'CRD/Crypto', value: site.cryptoPrice },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-[9px] text-[var(--color-text-muted)]">{label}</p>
                    <p className="text-xs font-bold text-[var(--color-text-primary)]">${value}</p>
                  </div>
                ))}
              </div>

              {/* Reviews + CTA */}
              <div className="flex items-center gap-3 sm:ml-auto shrink-0">
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[9px] text-[var(--color-text-muted)] mt-0.5">{site.reviews} Reviews</span>
                </div>
                <Button variant="primary" size="sm" className="flex items-center gap-1 text-xs px-4 py-2">
                  BUY NOW
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
