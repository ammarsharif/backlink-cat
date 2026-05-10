import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full pt-[60px] pb-[10px] lg:pt-[90px] lg:pb-[10px]">

      <Container size="wide" className="relative z-10">
        {/* Floating Search Bar (Desktop) */}
        <div className="hidden lg:flex w-full max-w-[1100px] h-[66px] bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 items-center absolute top-[-130px] left-1/2 -translate-x-1/2 z-20 border border-gray-100">
          <div className="w-[30%] h-full flex flex-col justify-center px-8 border-r border-gray-200">
            <label className="block text-[11px] font-extrabold text-[#000000] mb-0.5">WEBSITE URL</label>
            <input
              type="text"
              placeholder="https://backlinkcat.com"
              className="w-full text-[13px] text-[#000000] bg-transparent focus:outline-none placeholder:text-[#d1d1d1]"
            />
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
            <button className="bg-[#6EBD44] text-white px-8 xl:px-10 h-[45px] rounded-full text-[15px] font-bold hover:bg-[#5da539] transition-colors flex items-center justify-center gap-2">
              LET'S GO <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="flex lg:hidden flex-col w-full bg-white rounded-2xl shadow-lg p-4 gap-3 mb-8 border border-gray-100">
          <div className="w-full">
            <label className="block text-[11px] font-extrabold text-[#000000] mb-1">WEBSITE URL</label>
            <input
              type="text"
              placeholder="https://backlinkcat.com"
              className="w-full h-10 px-4 rounded-lg bg-gray-50 text-[13px] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["DA", "DR", "TRAFFIC", "PRICE"].map((label) => (
              <div key={label}>
                <label className="block text-[11px] font-extrabold text-[#000000] mb-1">{label}</label>
                <input
                  type="text"
                  placeholder="Range"
                  className="w-full h-10 px-4 rounded-lg bg-gray-50 text-[13px] focus:outline-none"
                />
              </div>
            ))}
          </div>
          <button className="w-full bg-[#6EBD44] text-white h-12 rounded-lg text-[15px] font-bold mt-2">
            LET'S GO
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0 mt-20 lg:mt-24">
          {/* Left - text content */}
          <div className="flex-1 w-full max-w-[747px] text-[#000000] text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-bold font-[var(--font-inter)] leading-[1.1] mb-2 tracking-normal">
              Backlink Market Place
            </h1>
            <p className="text-xl lg:text-[54px] font-light mb-4 leading-[1.1] text-[#000000] font-[var(--font-inter)] tracking-normal">
              Buy & Sell Guest Post with us<br />at Best Prices.
            </p>
            <p className="text-[16px] lg:text-[21px] font-light text-[#000000] mb-4 max-w-[747px] leading-[1.1] font-[var(--font-inter)] tracking-normal">
              Join BACKLINKCAT and monetize your blog with great recurring
              commissions. We have more than 100K bloggers and more than 1000
              clients.
            </p>
            <p className="text-[16px] lg:text-[21px] font-light text-[#000000] mb-4 font-[var(--font-inter)] leading-[1.2] tracking-normal">
              Just SIgnUp and Subscribe for all updates!
            </p>

            {/* Email subscribe */}
            <div className="flex w-full max-w-[659px] h-[57px] mb-6 shadow-sm mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Enter your email!"
                className="flex-1 px-6 bg-white text-[16px] text-[#000000] border border-r-0 border-[#6EBD44] rounded-l-[6px] focus:outline-none placeholder:text-[#999999]"
              />
              <button className="bg-[#6EBD44] text-white px-10 h-full rounded-r-[6px] text-[18px] font-bold hover:bg-[#5da539] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>

            {/* Auth buttons */}
            <div className="flex gap-4 w-full max-w-[375px] mx-auto lg:mx-0">
              <button className="flex-1 bg-[#6EBD44] text-white h-[43px] rounded-[22px] text-[15px] font-bold hover:bg-[#5da539] transition-colors uppercase">
                SIGN IN
              </button>
              <button className="flex-1 bg-[#84E84F] text-white h-[43px] rounded-[22px] text-[15px] font-bold hover:bg-[#6EBD44] transition-colors uppercase">
                SIGN UP
              </button>
            </div>
          </div>

          {/* Right - cat illustration */}
          <div className="hidden lg:flex flex-1 justify-center lg:justify-end items-start relative w-full mt-10 lg:mt-0">
            <div className="relative w-[280px] h-[325px] sm:w-[340px] sm:h-[395px] md:w-[420px] md:h-[485px] lg:w-[480px] lg:h-[555px] xl:w-[578px] xl:h-[670px] lg:translate-y-[40px] xl:translate-y-[60px] lg:-translate-x-10 xl:-translate-x-20">
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
