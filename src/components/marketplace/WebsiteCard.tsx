import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    <div className="flex flex-col items-center">
      <div className="relative w-[44px] h-[44px] flex items-center justify-center">
        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#F3F3F3"
            strokeWidth="2.5"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray={`${filled} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-black">
          {value}
        </span>
      </div>
    </div>
  );
}

export interface Website {
  id: string;
  url: string;
  da: number;
  ss: number;
  dr: number;
  traffic: string;
  linkType: string;
  niches: string[];
  gpPrice: string;
  liPrice: string;
  cryptoPrice: string;
  reviews: number;
}

interface WebsiteCardProps {
  site: Website;
}

export function WebsiteCard({ site }: WebsiteCardProps) {
  return (
    <div className="bg-white border border-[#D9D9D9] shadow-sm flex flex-col xl:flex-row overflow-hidden rounded-[4px] h-auto xl:h-[169px] max-w-full">
      {/* Left Side: URL and Data Table */}
      <div className="flex-1 p-3 md:p-4 flex flex-col justify-between overflow-hidden">
        {/* URL Header */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[16px] font-bold text-black leading-none">
            Website URL:
          </span>
          <span className="text-[16px] text-[#444444] leading-none underline decoration-1 underline-offset-4">
            {site.url}
          </span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[880px] border border-[#E0E0E0] rounded-sm overflow-hidden no-scrollbar">
            {/* Table Header */}
            <div className="grid grid-cols-[80px_80px_80px_100px_80px_1fr_80px_80px_100px] bg-[#E8F5E9] border-b border-[#E0E0E0]">
              {[
                "MOZ DA",
                "MOZ SS",
                "Ahref DR",
                "Ahref Traffic",
                "Link Type",
                "Niche",
                "GP Price",
                "LI Price",
                "CBD/Crypto",
              ].map((header) => (
                <div
                  key={header}
                  className="py-1 px-1 text-center text-[10px] font-bold text-black border-r border-[#E0E0E0] last:border-r-0 uppercase"
                >
                  {header}
                </div>
              ))}
            </div>
            {/* Table Body */}
            <div className="grid grid-cols-[80px_80px_80px_100px_80px_1fr_80px_80px_100px] bg-[#FDFDFD] items-stretch h-[80px]">
              {/* MOZ DA */}
              <div className="py-1 flex justify-center border-r border-[#E0E0E0]">
                <MetricRing value={site.da} color="#FF0000" label="" />
              </div>
              {/* MOZ SS */}
              <div className="py-1 flex justify-center border-r border-[#E0E0E0]">
                <MetricRing value={site.ss} color="#00FF00" label="" />
              </div>
              {/* Ahref DR */}
              <div className="py-1 flex justify-center border-r border-[#E0E0E0]">
                <MetricRing value={site.dr} color="#FF00FF" label="" />
              </div>
              {/* Ahref Traffic */}
              <div className="flex items-center justify-center text-[12px] font-medium text-black border-r border-[#E0E0E0]">
                {site.traffic}
              </div>
              {/* Link Type */}
              <div className="flex items-center justify-center text-[12px] font-medium text-black border-r border-[#E0E0E0]">
                {site.linkType}
              </div>
              {/* Niche */}
              <div className="py-1 px-2 flex flex-col gap-0.5 border-r border-[#E0E0E0] justify-center">
                {site.niches.slice(0, 5).map((niche) => (
                  <div key={niche} className="flex items-center gap-1">
                    <svg
                      className="w-2 h-2 text-[#7FC142] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-[9px] font-medium leading-none text-[#444444]">
                      {niche}
                    </span>
                  </div>
                ))}
              </div>
              {/* GP Price */}
              <div className="flex items-center justify-center text-[12px] font-bold text-black border-r border-[#E0E0E0]">
                {site.gpPrice}
              </div>
              {/* LI Price */}
              <div className="flex items-center justify-center text-[12px] font-bold text-black border-r border-[#E0E0E0]">
                {site.liPrice}
              </div>
              {/* CBD/Crypto */}
              <div className="flex items-center justify-center text-[12px] font-bold text-black">
                {site.cryptoPrice}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[220px] bg-white border-t xl:border-t-0 xl:border-l border-[#E0E0E0] p-4 flex flex-col justify-center gap-4 shrink-0">
        <div className="flex items-center justify-center gap-3">
          <div className="bg-[#f0f0f0] p-1.5 rounded-sm">
            <svg
              className="w-4 h-4 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-[18px] font-medium text-black whitespace-nowrap">
            {site.reviews} Reviews
          </span>
        </div>

        <Button className="w-full h-[48px] bg-[#7FC142] hover:bg-[#6EBD44] text-white text-[18px] font-bold rounded-[4px] flex items-center justify-between px-5 transition-all border-none">
          <span>BUY NOW</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
