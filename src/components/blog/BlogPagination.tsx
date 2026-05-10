'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";

export function BlogPagination({ totalPages = 50 }: { totalPages?: number }) {
  const [activePage, setActivePage] = useState(1);

  const visiblePages = [1, 2, 3, 4, 5];

  return (
    <nav aria-label="Blog pagination" className="flex items-center gap-2 mt-12 mb-4 flex-wrap">
      {/* Page number buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => setActivePage(page)}
          aria-current={activePage === page ? "page" : undefined}
          className={cn(
            "w-[42px] h-[42px] rounded-full border text-[16px] font-medium transition-all hover:border-[#6EBD44] hover:text-[#6EBD44] cursor-pointer",
            activePage === page
              ? "border-[#6EBD44] text-[#6EBD44] bg-white shadow-sm font-semibold"
              : "border-[#DCDCDC] text-[#555] bg-white"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next chevron */}
      <button
        onClick={() => setActivePage((p) => Math.min(p + 1, totalPages))}
        aria-label="Next page"
        className="w-[42px] h-[42px] rounded-full border border-[#DCDCDC] bg-white flex items-center justify-center text-[#555] hover:border-[#6EBD44] hover:text-[#6EBD44] transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Last page */}
      <button
        onClick={() => setActivePage(totalPages)}
        className={cn(
          "w-[42px] h-[42px] rounded-full border text-[16px] font-medium transition-all hover:border-[#6EBD44] hover:text-[#6EBD44] cursor-pointer",
          activePage === totalPages
            ? "border-[#6EBD44] text-[#6EBD44] bg-white shadow-sm font-semibold"
            : "border-[#DCDCDC] text-[#555] bg-white"
        )}
      >
        {totalPages}
      </button>
    </nav>
  );
}
