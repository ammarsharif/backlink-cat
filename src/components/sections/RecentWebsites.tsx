'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { WebsiteCard, WebsiteCardSkeleton } from '@/components/marketplace/WebsiteCard';
import { fetchRecentWebsites, FirestoreWebsite, FirestoreIndexError } from '@/lib/websiteService';

// ─── Generic Error State ──────────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-[18px] font-semibold text-[#333]">Failed to load websites</p>
        <p className="text-[14px] text-[#888] mt-1">There was a problem fetching the latest listings.</p>
      </div>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-[#7FC142] text-white text-[14px] font-bold rounded-[4px] hover:bg-[#6EBD44] transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 bg-[#F0F7E8] rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-[#7FC142]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <p className="text-[18px] font-semibold text-[#333]">No websites yet</p>
        <p className="text-[14px] text-[#888] mt-1">New listings will appear here once approved.</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function RecentWebsites() {
  const [websites, setWebsites] = useState<FirestoreWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecentWebsites(4);
      setWebsites(data);
    } catch (err) {
      // Log for debugging but never expose technical details to users
      console.error('[RecentWebsites] fetch error:', err);
      setError('Unable to load recent websites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <section className="py-20 bg-[#F9F9F9]">
      <Container className="max-w-[1534px]">
        <h2 className="text-[32px] md:text-[54px] font-bold text-center mb-16 font-[var(--font-heading)]">
          <span className="text-[#7FC142]">Recently Added</span> Websites
        </h2>

        <div className="flex flex-col gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <WebsiteCardSkeleton key={i} />)
          ) : error ? (
            <ErrorState onRetry={load} />
          ) : websites.length === 0 ? (
            <EmptyState />
          ) : (
            websites.map((site) => <WebsiteCard key={site.id} firestoreData={site} />)
          )}
        </div>
      </Container>
    </section>
  );
}
