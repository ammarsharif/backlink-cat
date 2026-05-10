import { ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
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

const MOCK_WEBSITES = [
  {
    id: "site-1",
    url: "www.website.com",
    da: 70,
    ss: 7,
    dr: 70,
    traffic: "50,000",
    linkType: "DF",
    niches: ["Tech", "Life Style", "Travelling", "Education", "Business"],
    gpPrice: "$100",
    liPrice: "$50",
    cryptoPrice: "$250",
    reviews: 5,
  },
  {
    id: "site-2",
    url: "www.website.com",
    da: 70,
    ss: 7,
    dr: 70,
    traffic: "50,000",
    linkType: "DF",
    niches: ["Tech", "Life Style", "Travelling", "Education", "Business"],
    gpPrice: "$100",
    liPrice: "$50",
    cryptoPrice: "$250",
    reviews: 5,
  },
  {
    id: "site-3",
    url: "www.website.com",
    da: 70,
    ss: 7,
    dr: 70,
    traffic: "50,000",
    linkType: "DF",
    niches: ["Tech", "Life Style", "Travelling", "Education", "Business"],
    gpPrice: "$100",
    liPrice: "$50",
    cryptoPrice: "$250",
    reviews: 5,
  },
  {
    id: "site-4",
    url: "www.website.com",
    da: 70,
    ss: 7,
    dr: 70,
    traffic: "50,000",
    linkType: "DF",
    niches: ["Tech", "Life Style", "Travelling", "Education", "Business"],
    gpPrice: "$100",
    liPrice: "$50",
    cryptoPrice: "$250",
    reviews: 5,
  },
];

export function RecentWebsites() {
  return (
    <section className="py-20 bg-[#F9F9F9]">
      <Container className="max-w-[1534px]">
        <h2 className="text-[32px] md:text-[54px] font-bold text-center mb-16 font-[var(--font-heading)]">
          <span className="text-[#7FC142]">Recently Added</span> Websites
        </h2>

        <div className="flex flex-col gap-6">
          {MOCK_WEBSITES.map((site) => (
            <div
              key={site.id}
              className="bg-white border border-[#D9D9D9] shadow-sm flex flex-col xl:flex-row overflow-hidden"
            >
              {/* Left Side: URL and Data Table */}
              <div className="flex-1 p-4 md:p-6">
                {/* URL Header */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-[20px] font-bold text-black leading-none">
                    Website URL:
                  </span>
                  <span className="text-[20px] text-[#444444] leading-none">
                    {site.url}
                  </span>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <div className="min-w-[957px] border border-[#E0E0E0] rounded-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[repeat(9,1fr)] bg-[#E8F5E9] border-b border-[#E0E0E0]">
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
                          className="py-1.5 px-1 text-center text-[11px] font-bold text-black border-r border-[#E0E0E0] last:border-r-0"
                        >
                          {header}
                        </div>
                      ))}
                    </div>
                    {/* Table Body */}
                    <div className="grid grid-cols-[repeat(9,1fr)] bg-[#FDFDFD] items-stretch min-h-[65px]">
                      {/* MOZ DA */}
                      <div className="py-2 flex justify-center border-r border-[#E0E0E0]">
                        <MetricRing value={site.da} color="#FF0000" label="" />
                      </div>
                      {/* MOZ SS */}
                      <div className="py-2 flex justify-center border-r border-[#E0E0E0]">
                        <MetricRing value={site.ss} color="#00FF00" label="" />
                      </div>
                      {/* Ahref DR */}
                      <div className="py-2 flex justify-center border-r border-[#E0E0E0]">
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
                      <div className="py-1.5 px-2 flex flex-col gap-0.5 border-r border-[#E0E0E0]">
                        {site.niches.map((niche) => (
                          <div key={niche} className="flex items-center gap-1">
                            <svg
                              className="w-2.5 h-2.5 text-[#7FC142] shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
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
                      <div className="flex items-center justify-center text-[12px] font-medium text-black border-r border-[#E0E0E0]">
                        {site.gpPrice}
                      </div>
                      {/* LI Price */}
                      <div className="flex items-center justify-center text-[12px] font-medium text-black border-r border-[#E0E0E0]">
                        {site.liPrice}
                      </div>
                      {/* CBD/Crypto */}
                      <div className="flex items-center justify-center text-[12px] font-medium text-black">
                        {site.cryptoPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-full xl:w-[280px] bg-white border-t xl:border-t-0 xl:border-l border-[#E0E0E0] p-4 flex flex-col justify-center gap-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-black"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="text-[20px] font-medium text-black">
                      {site.reviews} Reviews
                    </span>
                  </div>
                </div>

                <Button className="w-full h-[54px] bg-[#7FC142] hover:bg-[#6EBD44] text-white text-[20px] font-bold rounded-[8px] flex items-center justify-between px-6 transition-all">
                  <span>BUY NOW</span>
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
