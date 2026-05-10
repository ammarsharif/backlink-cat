'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { WebsiteCard, WebsiteCardSkeleton } from '@/components/marketplace/WebsiteCard';
import {
  fetchWebsites,
  FirestoreWebsite,
  WebsiteFilters,
} from '@/lib/websiteService';
import { ChevronLeft, ChevronRight, AlertCircle, RefreshCw, SearchX } from 'lucide-react';

const PAGE_SIZE = 10;

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState({ onRetry, message }: { onRetry: () => void; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-red-400" />
      </div>
      <div>
        <p className="text-[20px] font-semibold text-[#333]">Something went wrong</p>
        <p className="text-[15px] text-[#888] mt-1 max-w-sm">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#7FC142] text-white text-[14px] font-bold rounded-[4px] hover:bg-[#6EBD44] transition-colors cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
      <div className="w-20 h-20 bg-[#F0F7E8] rounded-full flex items-center justify-center">
        <SearchX className="w-10 h-10 text-[#7FC142]" />
      </div>
      <div>
        <p className="text-[20px] font-semibold text-[#333]">
          {hasFilters ? 'No results found' : 'No listings yet'}
        </p>
        <p className="text-[15px] text-[#888] mt-1">
          {hasFilters
            ? 'Try adjusting your filters to see more results.'
            : 'New approved listings will appear here.'}
        </p>
      </div>
    </div>
  );
}

// ─── Pagination Controls ──────────────────────────────────────────────────────
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 mt-8 border-t border-[#F2F2F2] flex-wrap md:flex-nowrap">
      <span className="text-[14px] text-[#888]">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-[44px] h-[44px] rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#444444] hover:border-[#7FC142] hover:text-[#7FC142] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="w-[44px] text-center text-[#888]">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-[44px] h-[44px] rounded-full border flex items-center justify-center text-[16px] transition-all cursor-pointer ${
                page === currentPage
                  ? 'border-[#7FC142] text-[#7FC142] font-bold bg-[#F0F7E8]'
                  : 'border-[#E0E0E0] text-[#444444] hover:border-[#7FC142] hover:text-[#7FC142]'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-[44px] h-[44px] rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#444444] hover:border-[#7FC142] hover:text-[#7FC142] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <span className="text-[14px] text-[#888]">
        Showing up to {PAGE_SIZE} listings
      </span>
    </div>
  );
}

// ─── Main List Component ──────────────────────────────────────────────────────
interface WebsiteListProps {
  filters: WebsiteFilters;
}

export function WebsiteList({ filters }: WebsiteListProps) {
  const [websites, setWebsites] = useState<FirestoreWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // We cache page cursors so navigating back is instant
  const pageCursors = useRef<Map<number, DocumentSnapshot | null>>(new Map([[1, null]]));

  const hasFilters =
    !!filters.domainSearch ||
    !!filters.niche ||
    !!filters.linkType ||
    !!filters.da ||
    !!filters.dr ||
    !!filters.ss ||
    !!filters.traffic ||
    !!filters.gpPrice ||
    !!filters.liPrice ||
    !!filters.cbdPrice;

  const loadPage = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const cursorForPage = pageCursors.current.get(page) ?? null;
        const result = await fetchWebsites(filters, PAGE_SIZE, cursorForPage);

        setWebsites(result.websites);

        if (result.lastDoc) {
          pageCursors.current.set(page + 1, result.lastDoc);
        }

        if (result.hasMore) {
          setTotalPages(Math.max(totalPages, page + 1));
        } else {
          setTotalPages(page);
        }

        setCurrentPage(page);
      } catch (err) {
        // Log for dev debugging — users never see technical details
        console.error('[WebsiteList] fetch error:', err);
        setError('Failed to load listings. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  // Reset to page 1 whenever filters change
  useEffect(() => {
    pageCursors.current = new Map([[1, null]]);
    setTotalPages(1);
    loadPage(1);
  }, [filters, loadPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    loadPage(page);
    // Scroll to top of list smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Result count badge */}
      {!loading && !error && (
        <p className="text-[13px] text-[#888] mb-4">
          {websites.length === 0
            ? 'No results'
            : `Showing ${websites.length} listing${websites.length !== 1 ? 's' : ''}`}
          {hasFilters && ' — filtered'}
        </p>
      )}

      <div className="flex flex-col gap-6">
        {loading ? (
          Array.from({ length: PAGE_SIZE }).map((_, i) => <WebsiteCardSkeleton key={i} />)
        ) : error ? (
          <ErrorState onRetry={() => loadPage(currentPage)} message={error} />
        ) : websites.length === 0 ? (
          <EmptyState hasFilters={hasFilters} />
        ) : (
          websites.map((site) => <WebsiteCard key={site.id} firestoreData={site} />)
        )}
      </div>

      {!loading && !error && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
