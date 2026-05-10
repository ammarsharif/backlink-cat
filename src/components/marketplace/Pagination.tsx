'use client';

import { ChevronRight, ChevronDown } from "lucide-react";

export function Pagination() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 mt-8 border-t border-[#F2F2F2] flex-wrap md:flex-nowrap">
      {/* Items per page */}
      <div className="flex items-center gap-4">
        <span className="text-[16px] text-black">Website Per Page</span>
        <div className="relative">
          <div className="min-w-[120px] h-[44px] border border-[#E0E0E0] rounded-[4px] px-4 flex items-center justify-between cursor-pointer hover:border-[#7FC142] transition-colors">
            <span className="text-[16px] text-black">10 - 100</span>
            <ChevronDown className="w-5 h-5 text-[#A0A0A0]" />
          </div>
        </div>
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((page) => (
          <button 
            key={page}
            className={`w-[44px] h-[44px] rounded-full border flex items-center justify-center text-[16px] transition-all
              ${page === 1 
                ? 'border-[#7FC142] text-[#7FC142] font-bold' 
                : 'border-[#E0E0E0] text-[#444444] hover:border-[#7FC142] hover:text-[#7FC142]'
              }`}
          >
            {page}
          </button>
        ))}
        <button className="w-[44px] h-[44px] rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#444444] hover:border-[#7FC142] hover:text-[#7FC142] transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
        <button className="w-[44px] h-[44px] rounded-full border border-[#E0E0E0] flex items-center justify-center text-[16px] text-[#444444] hover:border-[#7FC142] hover:text-[#7FC142] transition-all">
          50
        </button>
      </div>
    </div>
  );
}
