'use client';

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Search, AlertCircle } from "lucide-react";

export function Hero() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      return "Please enter a website URL";
    }
    
    // Professional URL regex that supports with or without protocol
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return "Please enter a valid website address";
    }
    
    return null;
  };

  const handleSearch = () => {
    const validationError = validateUrl(websiteUrl);
    setError(validationError);
    
    if (!validationError) {
      console.log("Searching for:", websiteUrl);
      // Proceed with search logic
    }
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
          {["DA", "DR", "TRAFFIC", "PRICE"].map((label) => (
            <div key={label} className="flex-1 h-full flex flex-col justify-center px-4 xl:px-6 border-r border-gray-200">
              <label className="block text-[11px] font-extrabold text-[#000000] mb-0.5">{label}</label>
              <input
                type="text"
                placeholder="Select Range"
                className="w-full text-[13px] text-[#707070] bg-transparent focus:outline-none placeholder:text-[#d1d1d1]"
              />
            </div>
          ))}
          <div className="px-2 pl-4 shrink-0">
            <button 
              onClick={handleSearch}
              className="bg-[#6EBD44] text-white cursor-pointer px-8 h-[40px] rounded-full text-[14px] font-bold hover:bg-[#5da539] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              LET'S GO <Search size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
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
              placeholder="https://backlinkcat.com"
              className={`w-full h-10 px-4 rounded-lg text-[13px] focus:outline-none transition-colors ${error ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-transparent focus:bg-white focus:border-[#6EBD44]'}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["DA", "DR", "TRAFFIC", "PRICE"].map((label) => (
              <div key={label}>
                <label className="block text-[11px] font-extrabold text-[#000000] mb-1">{label}</label>
                <input
                  type="text"
                  placeholder="Range"
                  className="w-full h-10 px-4 rounded-lg bg-gray-50 text-[13px] focus:outline-none border border-transparent focus:bg-white focus:border-[#6EBD44]"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={handleSearch}
            className="w-full bg-[#6EBD44] text-white h-12 rounded-lg text-[15px] font-bold mt-2 cursor-pointer active:scale-95 transition-transform"
          >
            LET'S GO
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
            <div className="flex w-full max-w-[550px] h-[50px] mb-6 shadow-sm mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Enter your email!"
                className="flex-1 px-5 bg-white text-[15px] text-[#000000] border border-r-0 border-[#6EBD44] rounded-l-[6px] focus:outline-none placeholder:text-[#999999]"
              />
              <button className="bg-[#6EBD44] text-white px-8 h-full rounded-r-[6px] text-[16px] font-bold hover:bg-[#5da539] transition-colors whitespace-nowrap cursor-pointer">
                Subscribe
              </button>
            </div>

            {/* Auth buttons */}
            <div className="flex gap-4 w-full max-w-[375px] mx-auto lg:mx-0">
              <button className="flex-1 bg-[#6EBD44] text-white h-[43px] rounded-[22px] text-[15px] font-bold hover:bg-[#5da539] transition-colors uppercase cursor-pointer">
                SIGN IN
              </button>
              <a href="https://app.backlinkcat.com/#/signup" className="flex-1">
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
