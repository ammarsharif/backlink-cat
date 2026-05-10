'use client';

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SOCIAL_LINKS = [
  { name: 'Linkedin', icon: '/images/linkedin-colored.svg' },
  { name: 'Instagram', icon: '/images/instagram-colored.svg' },
  { name: 'Facebook', icon: '/images/facebook-colored.svg' },
  { name: 'Youtube', icon: '/images/youtube-colored.svg' },
  { name: 'Twitter', icon: '/images/twitter-colored.svg' },
];

function FilterSelect({ label, placeholder, options }: { label: string; placeholder: string; options?: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="text-[14px] font-bold text-black uppercase">{label}</label>
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[54px] border rounded-[4px] px-4 flex items-center justify-between cursor-pointer transition-colors bg-white
            ${isOpen ? 'border-[#7FC142] ring-1 ring-[#7FC142]/10' : 'border-[#CCCCCC] hover:border-[#7FC142]'}
          `}
        >
          <span className={`text-[14px] ${selected ? 'text-black font-medium' : 'text-[#A0A0A0]'}`}>
            {selected || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#7FC142]' : 'text-[#A0A0A0]'}`} />
        </div>
        
        {isOpen && options && (
          <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E0E0E0] shadow-xl z-50 rounded-[4px] py-1">
            <div className="max-h-[250px] overflow-y-auto no-scrollbar">
              {options.map((opt) => (
                <div 
                  key={opt} 
                  onClick={() => {
                    setSelected(opt);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors
                    ${selected === opt ? 'bg-[#E8F5E9] text-[#7FC142] font-bold' : 'text-[#444444] hover:bg-[#F9F9F9]'}
                  `}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MOCK_OPTIONS = {
  da: ["DA 0 - 20", "DA 20 - 40", "DA 40 - 60", "DA 60 - 80", "DA 80+"],
  ss: ["SS 0% - 1%", "SS 1% - 5%", "SS 5% - 10%", "SS 10%+"],
  dr: ["DR 0 - 20", "DR 20 - 40", "DR 40 - 60", "DR 60 - 80", "DR 80+"],
  traffic: ["0 - 1k", "1k - 5k", "5k - 10k", "10k - 50k", "50k - 100k", "100k+"],
  niche: [
    "Technology", "Fashion", "Health & Fitness", "Business", 
    "Education", "Travel", "Food & Drink", "Lifestyle", 
    "Real Estate", "Finance", "Gaming", "Entertainment"
  ],
  price: ["$0 - $50", "$50 - $100", "$100 - $250", "$250 - $500", "$500 - $1000", "$1000+"],
};

export function SidebarFilter() {
  return (
    <aside className="w-full flex flex-col gap-8 shrink-0">
      {/* Filter Section */}
      <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-6 shadow-sm">
        <h2 className="text-[28px] font-bold text-center mb-8 text-black">Filter By</h2>
        
        <div className="flex flex-col gap-6">
          {/* Website Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-black uppercase">Website Name</label>
            <input 
              type="text" 
              placeholder="Enter Website Name"
              className="w-full h-[54px] border border-[#CCCCCC] rounded-[4px] px-4 text-[14px] focus:outline-none focus:border-[#7FC142]"
            />
          </div>

          {/* Domain Authority */}
          <FilterSelect label="Domain Authority" placeholder="Range | 0 - 100" options={MOCK_OPTIONS.da} />
          
          {/* Spam Score */}
          <FilterSelect label="Spam Score" placeholder="Range | 0 - 10" options={MOCK_OPTIONS.ss} />
          
          {/* Domain Rating */}
          <FilterSelect label="Domain Rating" placeholder="Range | 0 - 100" options={MOCK_OPTIONS.da} />
          
          {/* Traffic */}
          <FilterSelect label="Traffic" placeholder="Range | 0 - (∞)" options={MOCK_OPTIONS.traffic} />
          
          {/* Niche */}
          <FilterSelect label="Niche" placeholder="Select Niche" options={MOCK_OPTIONS.niche} />

          {/* Link Type */}
          <div className="flex flex-col gap-3">
            <label className="text-[14px] font-bold text-black uppercase">Link Type</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="linkType" className="w-4 h-4 accent-[#7FC142]" />
                <span className="text-[12px] font-medium text-[#444444]">Do Follow</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="linkType" className="w-4 h-4 accent-[#7FC142]" />
                <span className="text-[12px] font-medium text-[#444444]">No Follow</span>
              </label>
            </div>
          </div>

          {/* Guest Post Price */}
          <FilterSelect label="Guest Post Price" placeholder="Range | $0 - max" options={MOCK_OPTIONS.price} />
          
          {/* Link Insertion Price */}
          <FilterSelect label="Link Insertion Price" placeholder="Range | $0 - max" options={MOCK_OPTIONS.price} />
          
          {/* CBD/CRYPTO/CASINO Price */}
          <FilterSelect label="CBD/CRYPTO/CASINO Price" placeholder="Range | $0 - max" options={MOCK_OPTIONS.price} />
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-6 shadow-sm">
        <h2 className="text-[28px] font-bold text-center mb-10 text-black">Follow Us</h2>
        <div className="flex flex-col gap-6 items-center px-4">
          {SOCIAL_LINKS.map((social) => (
            <a 
              key={social.name} 
              href="#" 
              className="flex items-center gap-6 w-full group transition-all"
            >
              <div className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
                <img src={social.icon} alt={social.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[24px] font-medium text-[#444444] group-hover:text-[#7FC142]">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
