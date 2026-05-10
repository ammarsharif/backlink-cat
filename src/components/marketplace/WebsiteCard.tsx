'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FirestoreWebsite, formatTraffic, formatLinkType } from '@/lib/websiteService';
import Image from 'next/image';

// ─── Metric Ring ─────────────────────────────────────────────────────────────
interface MetricRingProps {
  value: number;
  color: string;
}

function MetricRing({ value, color }: MetricRingProps) {
  const clamped = Math.min(Math.max(value ?? 0, 0), 100);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const filled = (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[44px] h-[44px] flex items-center justify-center">
        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
          <circle cx="22" cy="22" r={radius} fill="none" stroke="#F3F3F3" strokeWidth="2.5" />
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
          {clamped}
        </span>
      </div>
    </div>
  );
}

// ─── Domain Favicon ───────────────────────────────────────────────────────────
function DomainFavicon({ domain, icoUrl }: { domain: string; icoUrl: string | null }) {
  const fallbackSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  const src = icoUrl || fallbackSrc;

  return (
    <div className="w-5 h-5 relative shrink-0 rounded-sm overflow-hidden bg-[#f5f5f5]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={domain}
        width={20}
        height={20}
        className="w-full h-full object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = fallbackSrc;
        }}
      />
    </div>
  );
}

// ─── Link Type Badge ──────────────────────────────────────────────────────────
function LinkTypeBadge({ linkType }: { linkType: string }) {
  const isDoFollow = linkType === 'DO_FOLLOW';
  return (
    <span
      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase leading-none ${
        isDoFollow
          ? 'bg-[#E8F5E9] text-[#388E3C]'
          : 'bg-[#FFF3E0] text-[#E65100]'
      }`}
    >
      {formatLinkType(linkType)}
    </span>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
export function WebsiteCardSkeleton() {
  return (
    <div className="bg-white border border-[#D9D9D9] shadow-sm rounded-[4px] h-[169px] animate-pulse overflow-hidden">
      <div className="flex h-full">
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div className="h-4 w-48 bg-[#E8E8E8] rounded" />
          <div className="h-[80px] w-full bg-[#F5F5F5] rounded" />
        </div>
        <div className="w-[220px] border-l border-[#E0E0E0] p-4 flex flex-col gap-4 justify-center">
          <div className="h-5 w-24 bg-[#E8E8E8] rounded mx-auto" />
          <div className="h-12 w-full bg-[#E8E8E8] rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Main WebsiteCard ─────────────────────────────────────────────────────────
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
  /** Pass either a raw `FirestoreWebsite` from Firebase… */
  firestoreData?: FirestoreWebsite;
  /** …or the legacy mock-data shape (backward compat). */
  site?: Website;
}

export function WebsiteCard({ firestoreData, site }: WebsiteCardProps) {
  // Normalise to a common display shape
  const display = firestoreData
    ? {
        id: firestoreData.id,
        domain: firestoreData.domain,
        domainIcoUrl: firestoreData.domainIcoUrl,
        da: firestoreData.moz_da ?? 0,
        ss: firestoreData.moz_ss ?? 0,
        dr: firestoreData.ahref_dr ?? 0,
        traffic: formatTraffic(firestoreData.ahref_traffic),
        linkType: firestoreData.link_type,
        niches: firestoreData.niches ?? [],
        gpPrice: firestoreData.gp_price != null ? `$${firestoreData.gp_price}` : 'N/A',
        liPrice: firestoreData.li_price != null ? `$${firestoreData.li_price}` : 'N/A',
        cryptoPrice:
          firestoreData.cbd_or_crypto_price != null
            ? `$${firestoreData.cbd_or_crypto_price}`
            : 'N/A',
        reviews: firestoreData.review ?? 0,
      }
    : site
    ? {
        id: site.id,
        domain: site.url,
        domainIcoUrl: null,
        da: site.da,
        ss: site.ss,
        dr: site.dr,
        traffic: site.traffic,
        linkType: site.linkType === 'DF' ? 'DO_FOLLOW' : 'NO_FOLLOW',
        niches: site.niches,
        gpPrice: site.gpPrice,
        liPrice: site.liPrice,
        cryptoPrice: site.cryptoPrice,
        reviews: site.reviews,
      }
    : null;

  if (!display) return null;

  const TABLE_HEADERS = [
    'MOZ DA',
    'MOZ SS',
    'Ahref DR',
    'Ahref Traffic',
    'Link Type',
    'Niche',
    'GP Price',
    'LI Price',
    'CBD/Crypto',
  ];

  return (
    <div className="bg-white border border-[#D9D9D9] shadow-sm flex flex-col xl:flex-row overflow-hidden rounded-[4px] h-auto xl:h-[169px] max-w-full transition-shadow hover:shadow-md">
      {/* Left: URL + Data Table */}
      <div className="flex-1 p-3 md:p-4 flex flex-col justify-between overflow-hidden">
        {/* URL Row */}
        <div className="mb-2 flex items-center gap-2">
          <DomainFavicon domain={display.domain} icoUrl={display.domainIcoUrl} />
          <span className="text-[16px] font-bold text-black leading-none">Website URL:</span>
          <span className="text-[16px] text-[#444444] leading-none underline decoration-1 underline-offset-4 truncate">
            {display.domain}
          </span>
        </div>

        {/* Scrollable Data Table */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[880px] border border-[#E0E0E0] rounded-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[80px_80px_80px_100px_80px_1fr_80px_80px_100px] bg-[#E8F5E9] border-b border-[#E0E0E0]">
              {TABLE_HEADERS.map((header) => (
                <div
                  key={header}
                  className="py-1 px-1 text-center text-[10px] font-bold text-black border-r border-[#E0E0E0] last:border-r-0 uppercase"
                >
                  {header}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="grid grid-cols-[80px_80px_80px_100px_80px_1fr_80px_80px_100px] bg-[#FDFDFD] items-stretch h-[80px]">
              {/* MOZ DA */}
              <div className="py-1 flex justify-center border-r border-[#E0E0E0]">
                <MetricRing value={display.da} color="#FF0000" />
              </div>
              {/* MOZ SS */}
              <div className="py-1 flex justify-center border-r border-[#E0E0E0]">
                <MetricRing value={display.ss} color="#00C853" />
              </div>
              {/* Ahref DR */}
              <div className="py-1 flex justify-center border-r border-[#E0E0E0]">
                <MetricRing value={display.dr} color="#7C4DFF" />
              </div>
              {/* Traffic */}
              <div className="flex items-center justify-center text-[12px] font-medium text-black border-r border-[#E0E0E0]">
                {display.traffic}
              </div>
              {/* Link Type */}
              <div className="flex items-center justify-center border-r border-[#E0E0E0] px-1">
                <LinkTypeBadge linkType={display.linkType} />
              </div>
              {/* Niche */}
              <div className="py-1 px-2 flex flex-col gap-0.5 border-r border-[#E0E0E0] justify-center overflow-hidden">
                {(display.niches ?? []).slice(0, 5).map((niche) => (
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
                    <span className="text-[9px] font-medium leading-none text-[#444444] truncate">
                      {niche}
                    </span>
                  </div>
                ))}
                {display.niches?.length === 0 && (
                  <span className="text-[9px] text-[#999]">—</span>
                )}
              </div>
              {/* GP Price */}
              <div className="flex items-center justify-center text-[12px] font-bold text-black border-r border-[#E0E0E0]">
                {display.gpPrice}
              </div>
              {/* LI Price */}
              <div className="flex items-center justify-center text-[12px] font-bold text-black border-r border-[#E0E0E0]">
                {display.liPrice}
              </div>
              {/* CBD/Crypto */}
              <div className="flex items-center justify-center text-[12px] font-bold text-black">
                {display.cryptoPrice}
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
            {display.reviews} {display.reviews === 1 ? 'Review' : 'Reviews'}
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
