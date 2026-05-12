'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { WebsiteFilters } from '@/lib/websiteService';

// ─── Constants ────────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { name: 'Linkedin', icon: '/images/linkedin-colored.svg' },
  { name: 'Instagram', icon: '/images/instagram-colored.svg' },
  { name: 'Facebook', icon: '/images/facebook-colored.svg' },
  { name: 'Youtube', icon: '/images/youtube-colored.svg' },
  { name: 'Twitter', icon: '/images/twitter-colored.svg' },
];

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
  label: string;
  placeholder: string;
  options: RangeOption[];
  value: RangeOption | null;
  onChange: (option: RangeOption | null) => void;
}

function FilterSelect({ label, placeholder, options, value, onChange }: FilterSelectProps) {
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
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="text-[14px] font-bold text-black uppercase">{label}</label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[54px] border rounded-[4px] px-4 flex items-center justify-between cursor-pointer transition-colors bg-white select-none ${
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
            <div className="max-h-[250px] overflow-y-auto no-scrollbar">
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
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="text-[14px] font-bold text-black uppercase">Niche</label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[54px] border rounded-[4px] px-4 flex items-center justify-between cursor-pointer transition-colors bg-white select-none ${
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
            <div className="max-h-[250px] overflow-y-auto no-scrollbar">
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

// ─── Active Filter Chip ───────────────────────────────────────────────────────
function ActiveFiltersBar({
  count,
  onReset,
}: {
  count: number;
  onReset: () => void;
}) {
  if (count === 0) return null;
  return (
    <div className="flex items-center justify-between px-1 py-2 mb-4">
      <span className="text-[13px] font-semibold text-[#7FC142]">
        {count} filter{count !== 1 ? 's' : ''} active
      </span>
      <button
        onClick={onReset}
        className="text-[12px] text-[#888] hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
        Reset all
      </button>
    </div>
  );
}

// ─── Main SidebarFilter ───────────────────────────────────────────────────────
interface SidebarFilterProps {
  onFiltersChange: (filters: WebsiteFilters) => void;
}

export function SidebarFilter({ onFiltersChange }: SidebarFilterProps) {
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

  // Debounce filter emission so fast typing doesn't hammer Firestore
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

  return (
    <aside className="w-full flex flex-col gap-8 shrink-0">
      {/* Filter Section */}
      <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-6 shadow-sm">
        <h2 className="text-[20px] font-bold text-center mb-4 text-black">Filter By</h2>

        <ActiveFiltersBar count={activeFilterCount} onReset={resetAll} />

        <div className="flex flex-col gap-6">
          {/* Website Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-black uppercase">Website Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Website Name"
                value={domainSearch}
                onChange={(e) => setDomainSearch(e.target.value)}
                className="w-full h-[54px] border border-[#CCCCCC] rounded-[4px] px-4 pr-9 text-[14px] focus:outline-none focus:border-[#7FC142] transition-colors"
              />
              {domainSearch && (
                <button
                  onClick={() => setDomainSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <FilterSelect
            label="Domain Authority"
            placeholder="Range | 0–100"
            options={FILTER_OPTIONS.da}
            value={da}
            onChange={setDa}
          />
          <FilterSelect
            label="Spam Score"
            placeholder="Range | 0–100"
            options={FILTER_OPTIONS.ss}
            value={ss}
            onChange={setSs}
          />
          <FilterSelect
            label="Domain Rating"
            placeholder="Range | 0–100"
            options={FILTER_OPTIONS.dr}
            value={dr}
            onChange={setDr}
          />
          <FilterSelect
            label="Traffic"
            placeholder="Range | 0–∞"
            options={FILTER_OPTIONS.traffic}
            value={traffic}
            onChange={setTraffic}
          />
          <NicheSelect value={niche} onChange={setNiche} />

          {/* Link Type */}
          <div className="flex flex-col gap-3">
            <label className="text-[14px] font-bold text-black uppercase">Link Type</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="linkType"
                  className="w-4 h-4 accent-[#7FC142]"
                  checked={linkType === 'DO_FOLLOW'}
                  onChange={() => setLinkType(linkType === 'DO_FOLLOW' ? null : 'DO_FOLLOW')}
                />
                <span className="text-[12px] font-medium text-[#444444]">Do Follow</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="linkType"
                  className="w-4 h-4 accent-[#7FC142]"
                  checked={linkType === 'NO_FOLLOW'}
                  onChange={() => setLinkType(linkType === 'NO_FOLLOW' ? null : 'NO_FOLLOW')}
                />
                <span className="text-[12px] font-medium text-[#444444]">No Follow</span>
              </label>
            </div>
          </div>

          <FilterSelect
            label="Guest Post Price"
            placeholder="Range | $0–max"
            options={FILTER_OPTIONS.price}
            value={gpPrice}
            onChange={setGpPrice}
          />
          <FilterSelect
            label="Link Insertion Price"
            placeholder="Range | $0–max"
            options={FILTER_OPTIONS.price}
            value={liPrice}
            onChange={setLiPrice}
          />
          <FilterSelect
            label="CBD/Crypto/Casino Price"
            placeholder="Range | $0–max"
            options={FILTER_OPTIONS.price}
            value={cbdPrice}
            onChange={setCbdPrice}
          />
        </div>
      </div>

      {/* Follow Us */}
      <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-6 shadow-sm">
        <h2 className="text-[20px] font-bold text-center mb-8 text-black">Follow Us</h2>
        <div className="flex flex-col gap-4 items-center px-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href="#"
              className="flex items-center gap-6 w-full group transition-all"
            >
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-[16px] md:text-[18px] font-medium text-[#444444] group-hover:text-[#7FC142] transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
