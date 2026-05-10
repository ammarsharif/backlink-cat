'use client';

import { useState } from "react";

export function BlogSidebar() {
  const [email, setEmail] = useState("");

  return (
    <aside className="w-full space-y-8 lg:sticky lg:top-24">
      {/* Search Blogs */}
      <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-6 shadow-sm">
        <h3 className="text-[28px] font-bold text-center mb-8 text-black font-[var(--font-poppins)]">Search Blogs</h3>
        <div className="space-y-3">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Enter Website Name"
              className="w-full h-[54px] border border-[#CCCCCC] rounded-[4px] pl-10 pr-4 text-[14px] focus:outline-none focus:border-[#6EBD44] transition bg-white"
            />
          </div>
          <button className="w-full h-[54px] bg-[#6EBD44] text-white font-bold rounded-[4px] hover:bg-[#5da539] active:scale-[0.98] transition-all font-[var(--font-poppins)] text-[15px] tracking-widest shadow-sm hover:shadow-md cursor-pointer">
            SEARCH
          </button>
        </div>
      </div>

      {/* Subscribe Us */}
      <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-6 shadow-sm text-center">
        <h3 className="text-[28px] font-bold text-center mb-2 text-black font-[var(--font-poppins)]">
          <span className="text-[#6EBD44]">Latest</span> Posts
        </h3>
        <p className="text-[14px] text-[#888] mb-1 font-[var(--font-inter)]">Subscribe Us</p>
        <p className="text-[13px] text-[#999] mb-6 font-[var(--font-inter)]">
          Get the daily delivery about news to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[54px] border border-[#CCCCCC] rounded-[4px] px-4 text-[14px] focus:outline-none focus:border-[#6EBD44] transition bg-white text-center"
          />
          <button className="w-full h-[54px] bg-[#6EBD44] text-white font-bold rounded-[4px] hover:bg-[#5da539] active:scale-[0.98] transition-all font-[var(--font-poppins)] text-[15px] tracking-widest shadow-sm hover:shadow-md cursor-pointer">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Follow Us */}
      <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-6 shadow-sm">
        <h3 className="text-[28px] font-bold text-center mb-10 text-black font-[var(--font-poppins)]">Follow Us</h3>
        <div className="flex flex-col gap-6 items-center px-4">
          <SocialLink icon="/images/linkedin-colored.svg" label="Linkedin" />
          <SocialLink icon="/images/instagram-colored.svg" label="Instagram" />
          <SocialLink icon="/images/facebook-colored.svg" label="Facebook" />
          <SocialLink icon="/images/youtube-colored.svg" label="Youtube" />
          <SocialLink icon="/images/twitter-colored.svg" label="Twitter" />
        </div>
      </div>
    </aside>
  );
}

function SocialLink({ icon, label }: { icon: string; label: string }) {
  return (
    <a href="#" className="flex items-center gap-6 w-full group transition-all">
      <div className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
        <img src={icon} alt={label} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
      </div>
      <span className="text-[24px] font-medium text-[#444444] group-hover:text-[#6EBD44] transition-colors font-[var(--font-inter)]">
        {label}
      </span>
    </a>
  );
}
