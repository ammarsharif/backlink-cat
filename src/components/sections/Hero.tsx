'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, AlertCircle, ChevronDown, X, CheckCircle, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { db, auth } from "@/lib/firebase";

// Types for range filters
interface RangeValue {
  min: string;
  max: string;
}


// Removed FILTER_OPTIONS as we are moving to custom range inputs


// Compact dropdown cell for the desktop horizontal search bar
function HeroFilterCell({
  label,
  min,
  max,
  onMinChange,
  onMaxChange,
  isLast = false,
}: {
  label: string;
  min: string;
  max: string;
  onMinChange: (val: string) => void;
  onMaxChange: (val: string) => void;
  isLast?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const hasValue = min || max;

  const getDisplayText = () => {
    if (!min && !max) return 'Any';
    if (min && max) return `${min}-${max}`;
    if (min) return `${min}+`;
    return `< ${max}`;
  };

  return (
    <div
      ref={ref}
      className={`flex-1 h-full flex flex-col justify-center px-4 xl:px-6 relative ${!isLast ? 'border-r border-gray-200' : ''}`}
    >
      <label className="block text-[11px] font-extrabold text-[#000000] mb-0.5 select-none cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {label}
      </label>
      <div
        className="flex items-center justify-between cursor-pointer gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-[13px] truncate ${hasValue ? 'text-[#000000] font-semibold' : 'text-[#d1d1d1]'}`}>
          {getDisplayText()}
        </span>
        <div className="flex items-center gap-0.5 shrink-0">
          {hasValue && (
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                onMinChange(''); 
                onMaxChange(''); 
              }}
              className="p-0.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X size={11} />
            </button>
          )}
          <ChevronDown
            size={13}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] left-0 min-w-[180px] bg-white border border-gray-200 shadow-xl z-50 rounded-lg p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-gray-400 block mb-1">MIN</label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => onMinChange(e.target.value)}
                  placeholder="0"
                  className="w-full h-8 px-2 border border-gray-200 rounded text-[12px] focus:outline-none focus:border-[#6EBD44]"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-gray-400 block mb-1">MAX</label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => onMaxChange(e.target.value)}
                  placeholder="Any"
                  className="w-full h-8 px-2 border border-gray-200 rounded text-[12px] focus:outline-none focus:border-[#6EBD44]"
                />
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full h-8 bg-[#6EBD44] text-white rounded text-[12px] font-bold hover:bg-[#5da539] transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Dropdown for the mobile card layout
function MobileFilterSelect({
  label,
  min,
  max,
  onMinChange,
  onMaxChange,
}: {
  label: string;
  min: string;
  max: string;
  onMinChange: (val: string) => void;
  onMaxChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const hasValue = min || max;

  const getDisplayText = () => {
    if (!min && !max) return 'Any';
    if (min && max) return `${min}-${max}`;
    if (min) return `${min}+`;
    return `< ${max}`;
  };

  return (
    <div ref={ref} className="relative">
      <label className="block text-[11px] font-extrabold text-[#000000] mb-1 select-none">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-10 px-4 rounded-lg text-[13px] border flex items-center justify-between cursor-pointer transition-colors ${
          hasValue ? 'bg-white border-[#6EBD44]' : 'bg-gray-50 border-transparent focus:border-[#6EBD44]'
        }`}
      >
        <span className={hasValue ? 'text-[#000] font-semibold' : 'text-[#d1d1d1]'}>{getDisplayText()}</span>
        <div className="flex items-center gap-1">
          {hasValue && (
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                onMinChange(''); 
                onMaxChange(''); 
              }}
              className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
            >
              <X size={12} />
            </button>
          )}
          <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-200 shadow-xl z-50 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] font-bold text-gray-400 block mb-1">MIN</label>
              <input
                type="number"
                value={min}
                onChange={(e) => onMinChange(e.target.value)}
                placeholder="0"
                className="w-full h-9 px-2 border border-gray-200 rounded text-[12px] focus:outline-none focus:border-[#6EBD44]"
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-gray-400 block mb-1">MAX</label>
              <input
                type="number"
                value={max}
                onChange={(e) => onMaxChange(e.target.value)}
                placeholder="Any"
                className="w-full h-9 px-2 border border-gray-200 rounded text-[12px] focus:outline-none focus:border-[#6EBD44]"
              />
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full h-9 bg-[#6EBD44] text-white rounded text-[12px] font-bold mt-3 hover:bg-[#5da539]"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const router = useRouter();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [daMin, setDaMin] = useState("");
  const [daMax, setDaMax] = useState("");
  const [drMin, setDrMin] = useState("");
  const [drMax, setDrMax] = useState("");
  const [trafficMin, setTrafficMin] = useState("");
  const [trafficMax, setTrafficMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");


  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  const handleSubscribe = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!subscribeEmail.trim() || !emailPattern.test(subscribeEmail.trim())) {
      setSubscribeStatus('error');
      return;
    }

    setSubscribeStatus('loading');
    try {
      // Always call signInAnonymously — Firebase returns the existing anonymous user
      // if already signed in, so this is safe and guarantees auth before any write.
      await signInAnonymously(auth);

      const email = subscribeEmail.trim().toLowerCase();

      // Check if already subscribed
      const existing = await getDocs(
        query(collection(db, 'subscribers'), where('email', '==', email))
      );
      if (!existing.empty) {
        setSubscribeStatus('duplicate');
        return;
      }

      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: serverTimestamp(),
      });

      setSubscribeStatus('success');
      setSubscribeEmail('');
    } catch (err) {
      console.error('[Subscribe error]', err);
      setSubscribeStatus('error');
    }
  };

  // URL is optional; if provided it must look like a domain/URL
  const validateUrl = (url: string): string | null => {
    if (!url.trim()) return null;
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;
    if (!pattern.test(url.trim())) return "Please enter a valid website address";
    return null;
  };

  const handleSearch = () => {
    const validationError = validateUrl(websiteUrl);
    setError(validationError);
    if (validationError) return;

    const params = new URLSearchParams();

    if (websiteUrl.trim()) {
      let domain = websiteUrl.trim();
      try {
        const withProtocol = /^https?:\/\//i.test(domain) ? domain : `https://${domain}`;
        domain = new URL(withProtocol).hostname;
      } catch {
        // keep as-is if URL parsing fails
      }
      params.set('domain', domain);
    }

    if (daMin) params.set('da_min', daMin);
    if (daMax) params.set('da_max', daMax);
    if (drMin) params.set('dr_min', drMin);
    if (drMax) params.set('dr_max', drMax);
    if (trafficMin) params.set('traffic_min', trafficMin);
    if (trafficMax) params.set('traffic_max', trafficMax);
    if (priceMin) params.set('price_min', priceMin);
    if (priceMax) params.set('price_max', priceMax);


    const qs = params.toString();
    router.push(`/category${qs ? `?${qs}` : ''}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
    if (error) setError(null);
  };

  return (
    <section className="relative w-full pt-[40px] pb-[10px] lg:pt-[60px] lg:pb-[10px]">

      <Container size="wide" className="relative z-10">
        {/* Floating Search Bar (Desktop) */}
        <div className={`hidden lg:flex w-full max-w-[1000px] h-[58px] bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 items-center absolute top-[-100px] left-1/2 -translate-x-1/2 z-20 border transition-all duration-300 ${error ? 'border-red-400 ring-4 ring-red-50' : 'border-gray-100'}`}>
          {/* URL input */}
          <div className="w-[30%] h-full flex flex-col justify-center px-6 border-r border-gray-200 relative">
            <label className={`block text-[11px] font-extrabold mb-0.5 transition-colors ${error ? 'text-red-500' : 'text-[#000000]'}`}>
              {error ? 'INVALID URL' : 'WEBSITE URL'}
            </label>
            <input
              type="text"
              value={websiteUrl}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="https://backlinkcat.com"
              className="w-full text-[13px] text-[#000000] bg-transparent focus:outline-none placeholder:text-[#d1d1d1]"
            />
            {error && (
              <div className="absolute -bottom-10 left-8 bg-red-500 text-white text-[11px] py-1 px-3 rounded-md animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                <AlertCircle size={12} />
                {error}
                <div className="absolute -top-1 left-4 w-2 h-2 bg-red-500 rotate-45" />
              </div>
            )}
          </div>

          <HeroFilterCell label="DA" min={daMin} max={daMax} onMinChange={setDaMin} onMaxChange={setDaMax} />
          <HeroFilterCell label="DR" min={drMin} max={drMax} onMinChange={setDrMin} onMaxChange={setDrMax} />
          <HeroFilterCell label="TRAFFIC" min={trafficMin} max={trafficMax} onMinChange={setTrafficMin} onMaxChange={setTrafficMax} />
          <HeroFilterCell label="PRICE" min={priceMin} max={priceMax} onMinChange={setPriceMin} onMaxChange={setPriceMax} isLast />


          <div className="px-2 pl-4 shrink-0">
            <button
              onClick={handleSearch}
              className="bg-[#6EBD44] text-white cursor-pointer px-8 h-[40px] rounded-full text-[14px] font-bold hover:bg-[#5da539] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              LET&apos;S GO <Search size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Search Card */}
        <div className={`flex lg:hidden flex-col w-full bg-white rounded-2xl shadow-lg p-4 gap-3 mb-8 border transition-all duration-300 ${error ? 'border-red-400' : 'border-gray-100'}`}>
          <div className="w-full relative">
            <div className="flex justify-between items-center mb-1">
              <label className={`block text-[11px] font-extrabold transition-colors ${error ? 'text-red-500' : 'text-[#000000]'}`}>WEBSITE URL</label>
              {error && <span className="text-[10px] text-red-500 font-bold animate-pulse">{error}</span>}
            </div>
            <input
              type="text"
              value={websiteUrl}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="https://backlinkcat.com"
              className={`w-full h-10 px-4 rounded-lg text-[13px] focus:outline-none transition-colors ${error ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-transparent focus:bg-white focus:border-[#6EBD44]'}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MobileFilterSelect label="DA" min={daMin} max={daMax} onMinChange={setDaMin} onMaxChange={setDaMax} />
            <MobileFilterSelect label="DR" min={drMin} max={drMax} onMinChange={setDrMin} onMaxChange={setDrMax} />
            <MobileFilterSelect label="TRAFFIC" min={trafficMin} max={trafficMax} onMinChange={setTrafficMin} onMaxChange={setTrafficMax} />
            <MobileFilterSelect label="PRICE" min={priceMin} max={priceMax} onMinChange={setPriceMin} onMaxChange={setPriceMax} />

          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-[#6EBD44] text-white h-12 rounded-lg text-[15px] font-bold mt-2 cursor-pointer active:scale-95 transition-transform"
          >
            LET&apos;S GO
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0 mt-16 lg:mt-20">
          {/* Left - text content */}
          <div className="flex-1 w-full max-w-[747px] text-[#000000] text-center lg:text-left">
            <h1 className="text-[26px] sm:text-[36px] lg:text-[46px] font-bold font-[var(--font-inter)] leading-[1.2] mb-3 tracking-tight text-balance px-4 lg:px-0">
              Backlink Market Place
            </h1>
            <p className="text-[18px] sm:text-[24px] lg:text-[38px] font-light mb-4 leading-tight text-[#000000] font-[var(--font-inter)] tracking-normal px-4 lg:px-0">
              Buy & Sell Guest Post with us <br className="hidden sm:block" />at Best Prices.
            </p>
            <p className="text-[15px] lg:text-[18px] font-light text-[#000000] mb-4 max-w-[747px] leading-[1.3] font-[var(--font-inter)] tracking-normal">
              Join BACKLINKCAT and monetize your blog with great recurring
              commissions. We have more than 100K bloggers and more than 1000
              clients.
            </p>
            <p className="text-[15px] lg:text-[18px] font-light text-[#000000] mb-6 font-[var(--font-inter)] leading-[1.2] tracking-normal">
              Just SIgnUp and Subscribe for all updates!
            </p>

            {/* Email subscribe */}
            <div className="w-full max-w-[550px] mb-6 mx-auto lg:mx-0">
              {subscribeStatus === 'success' ? (
                <div className="flex items-center gap-2 h-[50px] px-5 bg-green-50 border border-[#6EBD44] rounded-[6px] text-[#4a8f27] font-semibold text-[15px]">
                  <CheckCircle size={18} className="text-[#6EBD44] shrink-0" />
                  You&apos;re subscribed! Thank you.
                </div>
              ) : (
                <>
                  <div className="flex w-full h-[50px] shadow-sm">
                    <input
                      type="email"
                      value={subscribeEmail}
                      onChange={(e) => { setSubscribeEmail(e.target.value); if (subscribeStatus !== 'idle') setSubscribeStatus('idle'); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                      placeholder="Enter your email!"
                      className={`flex-1 px-5 bg-white text-[15px] text-[#000000] border border-r-0 rounded-l-[6px] focus:outline-none placeholder:text-[#999999] transition-colors ${
                        subscribeStatus === 'error' ? 'border-red-400' : 'border-[#6EBD44]'
                      }`}
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={subscribeStatus === 'loading'}
                      className="bg-[#6EBD44] text-white px-8 h-full rounded-r-[6px] text-[16px] font-bold hover:bg-[#5da539] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-70 flex items-center gap-2"
                    >
                      {subscribeStatus === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 'Subscribe'}
                    </button>
                  </div>
                  {subscribeStatus === 'error' && (
                    <p className="text-red-500 text-[12px] mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> Please enter a valid email address.
                    </p>
                  )}
                  {subscribeStatus === 'duplicate' && (
                    <p className="text-amber-600 text-[12px] mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> This email is already subscribed.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Auth buttons */}
            <div className="flex gap-4 w-full max-w-[375px] mx-auto lg:mx-0">
              <a href="https://app.backlinkcat.com/#/login" target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full bg-[#6EBD44] text-white h-[43px] rounded-[22px] text-[15px] font-bold hover:bg-[#5da539] transition-colors uppercase cursor-pointer">
                  SIGN IN
                </button>
              </a>
              <a href="https://app.backlinkcat.com/#/signup" target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full bg-[#84E84F] text-white h-[43px] rounded-[22px] text-[15px] font-bold hover:bg-[#6EBD44] transition-colors uppercase cursor-pointer">
                  SIGN UP
                </button>
              </a>
            </div>
          </div>

          {/* Right - cat illustration */}
          <div className="hidden lg:flex flex-1 justify-center lg:justify-end items-start relative w-full mt-6 lg:mt-0">
            <div className="relative w-[280px] h-[325px] sm:w-[340px] sm:h-[395px] md:w-[380px] md:h-[440px] lg:w-[420px] lg:h-[485px] xl:w-[480px] xl:h-[555px] lg:translate-y-[20px] xl:translate-y-[30px] lg:-translate-x-5 xl:-translate-x-10">
              <img
                src="/images/main-cat-image.svg"
                alt="BacklinkCAT mascot"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
