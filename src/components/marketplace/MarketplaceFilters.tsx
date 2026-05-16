'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, X, SlidersHorizontal, Search } from 'lucide-react';
import { WebsiteFilters } from '@/lib/websiteService';

// ─── Constants ────────────────────────────────────────────────────────────────
const FILTER_OPTIONS = {
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
};

// ─── Generic range option ─────────────────────────────────────────────────────
interface FilterSelectProps {
  placeholder: string;
  min: string;
  max: string;
  onMinChange: (val: string) => void;
  onMaxChange: (val: string) => void;
}

function FilterSelect({ placeholder, min, max, onMinChange, onMaxChange }: FilterSelectProps) {
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

  const hasValue = min || max;

  const getDisplayText = () => {
    if (!min && !max) return placeholder;
    if (min && max) return `${min}-${max}`;
    if (min) return `${min}+`;
    return `< ${max}`;
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
          <span className={`text-[14px] truncate ${hasValue ? 'text-black font-semibold' : 'text-[#A0A0A0]'}`}>
            {getDisplayText()}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {hasValue && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinChange('');
                  onMaxChange('');
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
          <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E0E0E0] shadow-xl z-50 rounded-[4px] p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Min</label>
                  <input
                    type="number"
                    value={min}
                    onChange={(e) => onMinChange(e.target.value)}
                    placeholder="0"
                    className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] focus:outline-none focus:border-[#7FC142]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Max</label>
                  <input
                    type="number"
                    value={max}
                    onChange={(e) => onMaxChange(e.target.value)}
                    placeholder="Any"
                    className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] focus:outline-none focus:border-[#7FC142]"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full h-9 bg-[#7FC142] text-white rounded text-[13px] font-bold hover:bg-[#6EBD44] transition-colors"
              >
                Apply
              </button>
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
  initialFilters?: WebsiteFilters;
}

export function MarketplaceFilters({ onFiltersChange, initialFilters }: MarketplaceFiltersProps) {
  const [domainSearch, setDomainSearch] = useState(initialFilters?.domainSearch ?? '');
  const [daMin, setDaMin] = useState(initialFilters?.da?.min?.toString() ?? '');
  const [daMax, setDaMax] = useState(initialFilters?.da?.max === Infinity ? '' : initialFilters?.da?.max?.toString() ?? '');
  
  const [ssMin, setSsMin] = useState(initialFilters?.ss?.min?.toString() ?? '');
  const [ssMax, setSsMax] = useState(initialFilters?.ss?.max === Infinity ? '' : initialFilters?.ss?.max?.toString() ?? '');
  
  const [drMin, setDrMin] = useState(initialFilters?.dr?.min?.toString() ?? '');
  const [drMax, setDrMax] = useState(initialFilters?.dr?.max === Infinity ? '' : initialFilters?.dr?.max?.toString() ?? '');
  
  const [trafficMin, setTrafficMin] = useState(initialFilters?.traffic?.min?.toString() ?? '');
  const [trafficMax, setTrafficMax] = useState(initialFilters?.traffic?.max === Infinity ? '' : initialFilters?.traffic?.max?.toString() ?? '');
  
  const [gpPriceMin, setGpPriceMin] = useState(initialFilters?.gpPrice?.min?.toString() ?? '');
  const [gpPriceMax, setGpPriceMax] = useState(initialFilters?.gpPrice?.max === Infinity ? '' : initialFilters?.gpPrice?.max?.toString() ?? '');
  
  const [liPriceMin, setLiPriceMin] = useState(initialFilters?.liPrice?.min?.toString() ?? '');
  const [liPriceMax, setLiPriceMax] = useState(initialFilters?.liPrice?.max === Infinity ? '' : initialFilters?.liPrice?.max?.toString() ?? '');
  
  const [cbdPriceMin, setCbdPriceMin] = useState(initialFilters?.cbdPrice?.min?.toString() ?? '');
  const [cbdPriceMax, setCbdPriceMax] = useState(initialFilters?.cbdPrice?.max === Infinity ? '' : initialFilters?.cbdPrice?.max?.toString() ?? '');

  const [niche, setNiche] = useState<string | null>(initialFilters?.niche ?? null);
  const [linkType, setLinkType] = useState<'DO_FOLLOW' | 'NO_FOLLOW' | null>(initialFilters?.linkType ?? null);


  const [isAdvancedOpen, setIsAdvancedOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState({
    addition: true,
    price: true,
    traffic: true,
    authority: true,
  });

  const activeFilterCount = [
    domainSearch, 
    (daMin || daMax), 
    (ssMin || ssMax), 
    (drMin || drMax), 
    (trafficMin || trafficMax), 
    niche, 
    linkType, 
    (gpPriceMin || gpPriceMax), 
    (liPriceMin || liPriceMax), 
    (cbdPriceMin || cbdPriceMax)
  ].filter(Boolean).length;



  const buildFilters = useCallback((): WebsiteFilters => {
    return {
      domainSearch: domainSearch.trim() || undefined,
      da: daMin || daMax ? { min: Number(daMin) || 0, max: daMax ? Number(daMax) : Infinity } : null,
      ss: ssMin || ssMax ? { min: Number(ssMin) || 0, max: ssMax ? Number(ssMax) : Infinity } : null,
      dr: drMin || drMax ? { min: Number(drMin) || 0, max: drMax ? Number(drMax) : Infinity } : null,
      traffic: trafficMin || trafficMax ? { min: Number(trafficMin) || 0, max: trafficMax ? Number(trafficMax) : Infinity } : null,
      niche: niche ?? null,
      linkType: linkType ?? null,
      gpPrice: gpPriceMin || gpPriceMax ? { min: Number(gpPriceMin) || 0, max: gpPriceMax ? Number(gpPriceMax) : Infinity } : null,
      liPrice: liPriceMin || liPriceMax ? { min: Number(liPriceMin) || 0, max: liPriceMax ? Number(liPriceMax) : Infinity } : null,
      cbdPrice: cbdPriceMin || cbdPriceMax ? { min: Number(cbdPriceMin) || 0, max: cbdPriceMax ? Number(cbdPriceMax) : Infinity } : null,
    };
  }, [domainSearch, daMin, daMax, ssMin, ssMax, drMin, drMax, trafficMin, trafficMax, niche, linkType, gpPriceMin, gpPriceMax, liPriceMin, liPriceMax, cbdPriceMin, cbdPriceMax]);


  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(buildFilters());
    }, 400);
    return () => clearTimeout(timer);
  }, [buildFilters, onFiltersChange]);

  const resetAll = () => {
    setDomainSearch('');
    setDaMin(''); setDaMax('');
    setSsMin(''); setSsMax('');
    setDrMin(''); setDrMax('');
    setTrafficMin(''); setTrafficMax('');
    setNiche(null);
    setLinkType(null);
    setGpPriceMin(''); setGpPriceMax('');
    setLiPriceMin(''); setLiPriceMax('');
    setCbdPriceMin(''); setCbdPriceMax('');
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
                  <FilterSelect placeholder="Spam Score" min={ssMin} max={ssMax} onMinChange={setSsMin} onMaxChange={setSsMax} />

                  
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
                  <FilterSelect placeholder="Guest Post Price" min={gpPriceMin} max={gpPriceMax} onMinChange={setGpPriceMin} onMaxChange={setGpPriceMax} />
                  <FilterSelect placeholder="Link Insertion Price" min={liPriceMin} max={liPriceMax} onMinChange={setLiPriceMin} onMaxChange={setLiPriceMax} />
                  <FilterSelect placeholder="CBD/Crypto Price" min={cbdPriceMin} max={cbdPriceMax} onMinChange={setCbdPriceMin} onMaxChange={setCbdPriceMax} />
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
                  <FilterSelect placeholder="Organic Traffic" min={trafficMin} max={trafficMax} onMinChange={setTrafficMin} onMaxChange={setTrafficMax} />

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
                  <FilterSelect placeholder="Domain Authority" min={daMin} max={daMax} onMinChange={setDaMin} onMaxChange={setDaMax} />
                  <FilterSelect placeholder="Domain Rating" min={drMin} max={drMax} onMinChange={setDrMin} onMaxChange={setDrMax} />
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
