'use client';

import { useState, useCallback } from 'react';
import { SidebarFilter } from '@/components/marketplace/SidebarFilter';
import { WebsiteList } from '@/components/marketplace/WebsiteList';
import { WebsiteFilters } from '@/lib/websiteService';

const RELATED_CATEGORIES = [
  { name: 'Education', href: '/category/education' },
  { name: 'Insurance', href: '/category/insurance' },
  { name: 'Business', href: '/category/business' },
  { name: 'Lifestyle', href: '/category/lifestyle' },
];

interface CategoryPageClientProps {
  slug: string;
}

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const [filters, setFilters] = useState<WebsiteFilters>({});

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

      {/* Main Grid: Listings + Sidebar */}
      <div className="flex flex-col-reverse lg:flex-row gap-0 pb-20 items-start overflow-visible">
        {/* Left: Listing + Pagination */}
        <div className="w-full lg:flex-1 overflow-visible">
          <WebsiteList filters={filters} />
        </div>

        {/* Right: Filters */}
        <div className="w-full lg:w-[391px] lg:pl-8 mb-12 lg:mb-0 shrink-0">
          <SidebarFilter onFiltersChange={handleFiltersChange} />
        </div>
      </div>
    </>
  );
}
