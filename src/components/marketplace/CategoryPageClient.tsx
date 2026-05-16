'use client';

import { useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { WebsiteList } from '@/components/marketplace/WebsiteList';
import { WebsiteFilters } from '@/lib/websiteService';

const RELATED_CATEGORIES = [
  { name: 'Education', href: '/category/education' },
  { name: 'Insurance', href: '/category/insurance' },
  { name: 'Business', href: '/category/business' },
  { name: 'Lifestyle', href: '/category/lifestyle' },
];

function parseInitialFilters(searchParams: ReturnType<typeof useSearchParams>): WebsiteFilters {
  const filters: WebsiteFilters = {};

  const domain = searchParams.get('domain');
  if (domain) filters.domainSearch = domain;

  const daMin = searchParams.get('da_min');
  const daMax = searchParams.get('da_max');
  if (daMin !== null) {
    filters.da = { min: Number(daMin), max: daMax !== null ? Number(daMax) : Infinity };
  }

  const drMin = searchParams.get('dr_min');
  const drMax = searchParams.get('dr_max');
  if (drMin !== null) {
    filters.dr = { min: Number(drMin), max: drMax !== null ? Number(drMax) : Infinity };
  }

  const trafficMin = searchParams.get('traffic_min');
  const trafficMax = searchParams.get('traffic_max');
  if (trafficMin !== null) {
    filters.traffic = { min: Number(trafficMin), max: trafficMax !== null ? Number(trafficMax) : Infinity };
  }

  const priceMin = searchParams.get('price_min');
  const priceMax = searchParams.get('price_max');
  if (priceMin !== null) {
    filters.gpPrice = { min: Number(priceMin), max: priceMax !== null ? Number(priceMax) : Infinity };
  }

  return filters;
}

interface CategoryPageClientProps {
  slug: string;
}

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const searchParams = useSearchParams();
  const initialFilters = useRef(parseInitialFilters(searchParams)).current;
  const [filters, setFilters] = useState<WebsiteFilters>(initialFilters);

  const handleFiltersChange = useCallback((newFilters: WebsiteFilters) => {
    setFilters(newFilters);
  }, []);

  const safeSlug = slug && slug !== 'undefined' ? slug : 'all';
  const categoryName =
    safeSlug === 'all'
      ? 'Marketplace'
      : decodeURIComponent(safeSlug).replace(/-/g, ' ');
  const formattedName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-[54px] font-bold font-[var(--font-heading)] mb-6">
          {safeSlug === 'all' ? (
            <>
              Linkbuilding <span className="text-[#7FC142]">Marketplace</span>
            </>
          ) : (
            <>
              <span className="text-[#7FC142]">Category</span> {formattedName}
            </>
          )}
        </h1>
        <p className="text-[20px] text-[#444444] leading-relaxed max-w-[1100px]">
          {safeSlug === 'all' ? (
            <>
              Browse through our extensive list of high-quality websites. Filter by metrics,
              price, and niche to find the perfect backlink opportunities for your SEO strategy.
            </>
          ) : (
            <>
              Browse premium websites in the{' '}
              <strong className="text-[#7FC142]">{formattedName}</strong> category and find
              the perfect backlink opportunity. Filter by metrics, price, and niche to find
              the exact match for your SEO strategy.
            </>
          )}
        </p>
      </div>

      {/* Related Categories */}
      <div className="mb-12">
        <h2 className="text-[44px] font-bold font-[var(--font-heading)] mb-8">
          <span className="text-[#7FC142]">Related</span> Categories
        </h2>
        <div className="flex flex-col gap-4">
          {RELATED_CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="flex items-center gap-3 group transition-all"
            >
              <span className="text-[#7FC142] text-[24px] font-bold">{'>'}</span>
              <span className="text-[24px] font-medium text-[#7FC142] underline decoration-1 underline-offset-4 group-hover:text-[#6EBD44] transition-colors">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Container: Top Filters + Full width Listing */}
      <div className="flex flex-col gap-8 pb-20 items-stretch overflow-visible">
        {/* Top: Filters */}
        <div className="w-full relative z-20">
          <MarketplaceFilters onFiltersChange={handleFiltersChange} initialFilters={initialFilters} />
        </div>

        {/* Full width Listing + Pagination */}
        <div className="w-full overflow-visible">
          <WebsiteList filters={filters} />
        </div>
      </div>
    </>
  );
}
