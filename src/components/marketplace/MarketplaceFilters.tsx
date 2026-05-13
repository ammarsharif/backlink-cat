'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, X, SlidersHorizontal, Search } from 'lucide-react';
import { WebsiteFilters } from '@/lib/websiteService';

// ─── Constants ────────────────────────────────────────────────────────────────
const FILTER_OPTIONS = {
  da: [
    { label: 'DA 0–20', min: 0, max: 20 },
    { label: 'DA 20–40', min: 20, max: 40 },
    { label: 'DA 40–60', min: 40, max: 60 },
    { label: 'DA 60–80', min: 60, max: 80 },
    { label: 'DA 80+', min: 80, max: 100 },
  ],
  ss: [
    { label: 'SS 0–1', min: 0, max: 1 },
    { label: 'SS 1–5', min: 1, max: 5 },
    { label: 'SS 5–10', min: 5, max: 10 },
    { label: 'SS 10+', min: 10, max: 100 },
  ],
  dr: [
    { label: 'DR 0–20', min: 0, max: 20 },
    { label: 'DR 20–40', min: 20, max: 40 },
    { label: 'DR 40–60', min: 40, max: 60 },
    { label: 'DR 60–80', min: 60, max: 80 },
    { label: 'DR 80+', min: 80, max: 100 },
  ],
  traffic: [
    { label: '0–1K', min: 0, max: 1_000 },
    { label: '1K–5K', min: 1_000, max: 5_000 },
    { label: '5K–10K', min: 5_000, max: 10_000 },
    { label: '10K–50K', min: 10_000, max: 50_000 },
    { label: '50K–100K', min: 50_000, max: 100_000 },
    { label: '100K+', min: 100_000, max: Infinity },
  ],
  niche: [
    'Technology',
    'Fashion',
    'Health & Fitness',
    'Business',
    'Education',
    'Travel & Tourism',
    'Food & Drink',
    'Lifestyle',
    'Real Estate',
    'Finance',
    'Gaming',
    'Entertainment',
    'Digital Marketing & Advertising',
    'Kitchen, Cooking And Recipes',
  ],
  price: [
    { label: '$0–$50', min: 0, max: 50 },
    { label: '$50–$100', min: 50, max: 100 },
    { label: '$100–$250', min: 100, max: 250 },
    { label: '$250–$500', min: 250, max: 500 },
    { label: '$500–$1K', min: 500, max: 1_000 },
    { label: '$1K+', min: 1_000, max: Infinity },
  ],
};

// ─── Generic range option ─────────────────────────────────────────────────────
interface RangeOption {
  label: string;
  min: number;
  max: number;
}

// ─── FilterSelect (Range) ─────────────────────────────────────────────────────
interface FilterSelectProps {
  placeholder: string;
  options: RangeOption[];
  value: RangeOption | null;
  onChange: (option: RangeOption | null) => void;
}

function FilterSelect({ placeholder, options, value, onChange }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt: RangeOption) => {
    onChange(value?.label === opt.label ? null : opt);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full" ref={dropdownRef}>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[46px] border rounded-[4px] px-4 flex items-center justify-between cursor-pointer transition-colors bg-white select-none ${
            isOpen ? 'border-[#7FC142] ring-1 ring-[#7FC142]/10' : 'border-[#CCCCCC] hover:border-[#7FC142]'
          }`}
        >
          <span className={`text-[14px] truncate ${value ? 'text-black font-medium' : 'text-[#A0A0A0]'}`}>
            {value?.label ?? placeholder}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {value && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
                className="p-0.5 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-[#7FC142]' : 'text-[#A0A0A0]'
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E0E0E0] shadow-xl z-50 rounded-[4px] py-1">
            <div className="max-h-[200px] overflow-y-auto no-scrollbar">
              {options.map((opt) => (
                <div
                  key={opt.label}
                  onClick={() => handleSelect(opt)}
                  className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors ${
                    value?.label === opt.label
                      ? 'bg-[#E8F5E9] text-[#7FC142] font-bold'
                      : 'text-[#444444] hover:bg-[#F9F9F9]'
                  }`}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NicheSelect ──────────────────────────────────────────────────────────────
interface NicheSelectProps {
  value: string | null;
  onChange: (niche: string | null) => void;
}

function NicheSelect({ value, onChange }: NicheSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full" ref={dropdownRef}>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[46px] border rounded-[4px] px-4 flex items-center justify-between cursor-pointer transition-colors bg-white select-none ${
            isOpen ? 'border-[#7FC142] ring-1 ring-[#7FC142]/10' : 'border-[#CCCCCC] hover:border-[#7FC142]'
          }`}
        >
          <span className={`text-[14px] truncate ${value ? 'text-black font-medium' : 'text-[#A0A0A0]'}`}>
            {value ?? 'Select Niche'}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {value && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
                className="p-0.5 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-[#7FC142]' : 'text-[#A0A0A0]'
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E0E0E0] shadow-xl z-50 rounded-[4px] py-1">
            <div className="max-h-[200px] overflow-y-auto no-scrollbar">
              {FILTER_OPTIONS.niche.map((niche) => (
                <div
                  key={niche}
                  onClick={() => {
                    onChange(value === niche ? null : niche);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors ${
                    value === niche
                      ? 'bg-[#E8F5E9] text-[#7FC142] font-bold'
                      : 'text-[#444444] hover:bg-[#F9F9F9]'
                  }`}
                >
                  {niche}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main MarketplaceFilters ───────────────────────────────────────────────────────
interface MarketplaceFiltersProps {
  onFiltersChange: (filters: WebsiteFilters) => void;
}

export function MarketplaceFilters({ onFiltersChange }: MarketplaceFiltersProps) {
  const [domainSearch, setDomainSearch] = useState('');
  const [da, setDa] = useState<(typeof FILTER_OPTIONS.da)[0] | null>(null);
  const [ss, setSs] = useState<(typeof FILTER_OPTIONS.ss)[0] | null>(null);
  const [dr, setDr] = useState<(typeof FILTER_OPTIONS.dr)[0] | null>(null);
  const [traffic, setTraffic] = useState<(typeof FILTER_OPTIONS.traffic)[0] | null>(null);
  const [niche, setNiche] = useState<string | null>(null);
  const [linkType, setLinkType] = useState<'DO_FOLLOW' | 'NO_FOLLOW' | null>(null);
  const [gpPrice, setGpPrice] = useState<(typeof FILTER_OPTIONS.price)[0] | null>(null);
  const [liPrice, setLiPrice] = useState<(typeof FILTER_OPTIONS.price)[0] | null>(null);
  const [cbdPrice, setCbdPrice] = useState<(typeof FILTER_OPTIONS.price)[0] | null>(null);

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({
    addition: false,
    price: false,
    traffic: false,
    authority: false,
  });

  const activeFilterCount = [domainSearch, da, ss, dr, traffic, niche, linkType, gpPrice, liPrice, cbdPrice].filter(Boolean).length;

  const buildFilters = useCallback((): WebsiteFilters => {
    return {
      domainSearch: domainSearch.trim() || undefined,
      da: da ? { min: da.min, max: da.max } : null,
      ss: ss ? { min: ss.min, max: ss.max } : null,
      dr: dr ? { min: dr.min, max: dr.max } : null,
      traffic: traffic ? { min: traffic.min, max: traffic.max } : null,
      niche: niche ?? null,
      linkType: linkType ?? null,
      gpPrice: gpPrice ? { min: gpPrice.min, max: gpPrice.max } : null,
      liPrice: liPrice ? { min: liPrice.min, max: liPrice.max } : null,
      cbdPrice: cbdPrice ? { min: cbdPrice.min, max: cbdPrice.max } : null,
    };
  }, [domainSearch, da, ss, dr, traffic, niche, linkType, gpPrice, liPrice, cbdPrice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(buildFilters());
    }, 400);
    return () => clearTimeout(timer);
  }, [buildFilters, onFiltersChange]);

  const resetAll = () => {
    setDomainSearch('');
    setDa(null);
    setSs(null);
    setDr(null);
    setTraffic(null);
    setNiche(null);
    setLinkType(null);
    setGpPrice(null);
    setLiPrice(null);
    setCbdPrice(null);
  };

  const toggleCategory = (cat: keyof typeof openCategories) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-white border border-[#F2F2F2] rounded-[8px] p-4 lg:p-6 shadow-sm">
        {/* Top Controls: Search and Toggle */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0]" />
            <input
              type="text"
              placeholder="Search Domain..."
              value={domainSearch}
              onChange={(e) => setDomainSearch(e.target.value)}
              className="w-full h-[54px] pl-12 pr-10 border border-[#CCCCCC] rounded-[4px] text-[15px] focus:outline-none focus:border-[#7FC142] transition-colors"
            />
            {domainSearch && (
              <button
                onClick={() => setDomainSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`h-[54px] px-6 rounded-[4px] border flex items-center justify-center gap-2 font-bold transition-all shrink-0 cursor-pointer ${
              isAdvancedOpen
                ? 'bg-[#6EBD44] text-white border-[#6EBD44] shadow-inner'
                : 'bg-[#7FC142] text-white border-[#7FC142] hover:bg-[#6EBD44] hover:border-[#6EBD44] shadow-sm'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Advanced Filters
          </button>
        </div>

        {/* Filters Count and Reset */}
        {activeFilterCount > 0 && (
          <div className="flex items-center justify-between mt-4">
            <span className="text-[14px] font-semibold text-[#7FC142]">
              {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
            </span>
            <button
              onClick={resetAll}
              className="text-[13px] text-[#888] hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer font-medium"
            >
              <X className="w-4 h-4" />
              Reset all
            </button>
          </div>
        )}

        {/* Accordions Area */}
        {isAdvancedOpen && (
          <div className="mt-6 border-t border-[#F2F2F2] pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            {/* Category: Addition Filter */}
            <div className={`flex flex-col border rounded-[4px] ${openCategories.addition ? 'border-[#CCCCCC]' : 'border-[#E0E0E0]'}`}>
              <button
                onClick={() => toggleCategory('addition')}
                className={`w-full px-5 py-3.5 text-left font-bold text-[15px] flex items-center justify-between rounded-[4px] cursor-pointer ${openCategories.addition ? 'text-[#333333] bg-[#F9F9F9] rounded-b-none border-b border-[#E0E0E0]' : 'text-[#444444] bg-white hover:bg-[#F9F9F9]'}`}
              >
                Addition Filter
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openCategories.addition ? 'rotate-180 text-[#444444]' : 'text-[#A0A0A0]'}`} />
              </button>
              {openCategories.addition && (
                <div className="p-5 bg-white flex flex-col gap-4 rounded-b-[4px]">
                  <NicheSelect value={niche} onChange={setNiche} />
                  <FilterSelect placeholder="Spam Score" options={FILTER_OPTIONS.ss} value={ss} onChange={setSs} />
                  
                  <div className="flex flex-col gap-3 mt-1">
                    <span className="text-[13px] font-semibold text-[#444444] uppercase tracking-wide">Link Type</span>
                    <div className="flex items-center gap-5">
                      <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input
                          type="radio"
                          name="linkType"
                          className="w-4 h-4 accent-[#7FC142]"
                          checked={linkType === 'DO_FOLLOW'}
                          onChange={() => setLinkType(linkType === 'DO_FOLLOW' ? null : 'DO_FOLLOW')}
                        />
                        <span className="text-[14px] text-[#444444] group-hover:text-[#333333] transition-colors">Do Follow</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input
                          type="radio"
                          name="linkType"
                          className="w-4 h-4 accent-[#7FC142]"
                          checked={linkType === 'NO_FOLLOW'}
                          onChange={() => setLinkType(linkType === 'NO_FOLLOW' ? null : 'NO_FOLLOW')}
                        />
                        <span className="text-[14px] text-[#444444] group-hover:text-[#333333] transition-colors">No Follow</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Category: Price */}
            <div className={`flex flex-col border rounded-[4px] ${openCategories.price ? 'border-[#CCCCCC]' : 'border-[#E0E0E0]'}`}>
              <button
                onClick={() => toggleCategory('price')}
                className={`w-full px-5 py-3.5 text-left font-bold text-[15px] flex items-center justify-between rounded-[4px] cursor-pointer ${openCategories.price ? 'text-[#333333] bg-[#F9F9F9] rounded-b-none border-b border-[#E0E0E0]' : 'text-[#444444] bg-white hover:bg-[#F9F9F9]'}`}
              >
                Price
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openCategories.price ? 'rotate-180 text-[#444444]' : 'text-[#A0A0A0]'}`} />
              </button>
              {openCategories.price && (
                <div className="p-5 bg-white flex flex-col gap-4 rounded-b-[4px]">
                  <FilterSelect placeholder="Guest Post Price" options={FILTER_OPTIONS.price} value={gpPrice} onChange={setGpPrice} />
                  <FilterSelect placeholder="Link Insertion Price" options={FILTER_OPTIONS.price} value={liPrice} onChange={setLiPrice} />
                  <FilterSelect placeholder="CBD/Crypto Price" options={FILTER_OPTIONS.price} value={cbdPrice} onChange={setCbdPrice} />
                </div>
              )}
            </div>

            {/* Category: Traffic */}
            <div className={`flex flex-col border rounded-[4px] ${openCategories.traffic ? 'border-[#CCCCCC]' : 'border-[#E0E0E0]'}`}>
              <button
                onClick={() => toggleCategory('traffic')}
                className={`w-full px-5 py-3.5 text-left font-bold text-[15px] flex items-center justify-between rounded-[4px] cursor-pointer ${openCategories.traffic ? 'text-[#333333] bg-[#F9F9F9] rounded-b-none border-b border-[#E0E0E0]' : 'text-[#444444] bg-white hover:bg-[#F9F9F9]'}`}
              >
                Traffic
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openCategories.traffic ? 'rotate-180 text-[#444444]' : 'text-[#A0A0A0]'}`} />
              </button>
              {openCategories.traffic && (
                <div className="p-5 bg-white flex flex-col gap-4 rounded-b-[4px]">
                  <FilterSelect placeholder="Organic Traffic" options={FILTER_OPTIONS.traffic} value={traffic} onChange={setTraffic} />
                </div>
              )}
            </div>

            {/* Category: Website Authority */}
            <div className={`flex flex-col border rounded-[4px] ${openCategories.authority ? 'border-[#CCCCCC]' : 'border-[#E0E0E0]'}`}>
              <button
                onClick={() => toggleCategory('authority')}
                className={`w-full px-5 py-3.5 text-left font-bold text-[15px] flex items-center justify-between rounded-[4px] cursor-pointer ${openCategories.authority ? 'text-[#333333] bg-[#F9F9F9] rounded-b-none border-b border-[#E0E0E0]' : 'text-[#444444] bg-white hover:bg-[#F9F9F9]'}`}
              >
                Website Authority
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openCategories.authority ? 'rotate-180 text-[#444444]' : 'text-[#A0A0A0]'}`} />
              </button>
              {openCategories.authority && (
                <div className="p-5 bg-white flex flex-col gap-4 rounded-b-[4px]">
                  <FilterSelect placeholder="Domain Authority" options={FILTER_OPTIONS.da} value={da} onChange={setDa} />
                  <FilterSelect placeholder="Domain Rating" options={FILTER_OPTIONS.dr} value={dr} onChange={setDr} />
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
