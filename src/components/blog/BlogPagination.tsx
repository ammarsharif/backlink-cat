'use client';

import { cn } from '@/lib/utils';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  hasMore,
  onPrev,
  onNext,
  onPageSelect,
}: BlogPaginationProps) {
  if (totalPages <= 1 && !hasMore) return null;

  // Build visible page range (max 5 pages shown)
  const getVisiblePages = () => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Blog pagination" className="flex items-center gap-2 mt-12 mb-4 flex-wrap">
      {/* Previous button */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={cn(
          'w-[42px] h-[42px] rounded-full border flex items-center justify-center transition-all',
          currentPage === 1
            ? 'border-[#EEEEEE] text-[#CCCCCC] cursor-not-allowed bg-white'
            : 'border-[#DCDCDC] text-[#555] bg-white hover:border-[#6EBD44] hover:text-[#6EBD44] cursor-pointer active:scale-95'
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Page number buttons */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageSelect(1)}
            className="w-[42px] h-[42px] rounded-full border border-[#DCDCDC] text-[#555] bg-white text-[16px] font-medium hover:border-[#6EBD44] hover:text-[#6EBD44] transition-all cursor-pointer"
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="w-[42px] h-[42px] flex items-center justify-center text-[#999] text-[18px]">
              •••
            </span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageSelect(page)}
          aria-current={currentPage === page ? 'page' : undefined}
          className={cn(
            'w-[42px] h-[42px] rounded-full border text-[16px] font-medium transition-all cursor-pointer active:scale-95',
            currentPage === page
              ? 'border-[#6EBD44] text-[#6EBD44] bg-white shadow-sm font-bold'
              : 'border-[#DCDCDC] text-[#555] bg-white hover:border-[#6EBD44] hover:text-[#6EBD44]'
          )}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="w-[42px] h-[42px] flex items-center justify-center text-[#999] text-[18px]">
              •••
            </span>
          )}
          <button
            onClick={() => onPageSelect(totalPages)}
            className="w-[42px] h-[42px] rounded-full border border-[#DCDCDC] text-[#555] bg-white text-[16px] font-medium hover:border-[#6EBD44] hover:text-[#6EBD44] transition-all cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={!hasMore && currentPage >= totalPages}
        aria-label="Next page"
        className={cn(
          'w-[42px] h-[42px] rounded-full border flex items-center justify-center transition-all',
          !hasMore && currentPage >= totalPages
            ? 'border-[#EEEEEE] text-[#CCCCCC] cursor-not-allowed bg-white'
            : 'border-[#DCDCDC] text-[#555] bg-white hover:border-[#6EBD44] hover:text-[#6EBD44] cursor-pointer active:scale-95'
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}
