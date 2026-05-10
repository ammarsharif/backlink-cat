'use client';

interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
}

export function BlogCard({ id, image, title, excerpt, author, category, date }: BlogCardProps) {
  return (
    <article className="flex flex-col sm:flex-row gap-6 md:gap-8 pb-10 border-b border-[#E8E8E8] last:border-0 last:pb-0 group">
      {/* Thumbnail */}
      <a href="#" className="shrink-0 w-full sm:w-[220px] md:w-[270px] lg:w-[310px]">
        <div className="rounded-[20px] overflow-hidden aspect-[310/220] bg-gray-100 shadow-sm">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </a>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        {/* Title */}
        <a href="#">
          <h2 className="text-[20px] md:text-[26px] font-bold text-[#111111] leading-snug mb-3 hover:text-[#6EBD44] transition-colors font-[var(--font-poppins)] line-clamp-2">
            {title}
          </h2>
        </a>

        {/* Excerpt */}
        <p className="text-[15px] md:text-[18px] text-[#555555] leading-relaxed mb-4 line-clamp-3 font-[var(--font-inter)]">
          {excerpt}
        </p>

        {/* Divider */}
        <hr className="border-[#E8E8E8] mb-4" />

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5 text-[13px] md:text-[15px] text-[#666666] font-[var(--font-inter)]">
          {/* Author avatar */}
          <div className="w-[26px] h-[26px] rounded-full overflow-hidden bg-gray-200 shrink-0 mr-1">
            <img src="/images/latest-posts.svg" alt={author} className="w-full h-full object-cover" />
          </div>
          <span>
            By: <span className="font-semibold text-[#333]">{author}</span>
          </span>
          <span className="text-[#CCC] mx-1">|</span>
          <span>{category}</span>
          <span className="text-[#CCC] mx-1">|</span>
          <span>{date}</span>
          <span className="text-[#CCC] mx-1">|</span>
          <a href="#" className="text-[#6EBD44] hover:underline font-medium transition-colors">
            Leave a comment
          </a>
        </div>

        {/* Actions row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Continue Reading */}
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-[#6EBD44] text-[#6EBD44] px-6 py-2 rounded-full text-[14px] md:text-[15px] font-semibold hover:bg-[#6EBD44] hover:text-white active:scale-95 transition-all font-[var(--font-poppins)] shadow-sm hover:shadow-md"
          >
            Continue Reading
          </a>

          {/* Share + Social */}
          <div className="flex items-center gap-2.5">
            {/* Share icon */}
            <SocialIconBtn label="Share">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#666]">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </SocialIconBtn>
            <SocialIconBtn label="LinkedIn">
              <img src="/images/linkedin-colored.svg" alt="LinkedIn" className="w-[18px] h-[18px]" />
            </SocialIconBtn>
            <SocialIconBtn label="Instagram">
              <img src="/images/instagram-colored.svg" alt="Instagram" className="w-[18px] h-[18px]" />
            </SocialIconBtn>
            <SocialIconBtn label="Facebook">
              <img src="/images/facebook-colored.svg" alt="Facebook" className="w-[18px] h-[18px]" />
            </SocialIconBtn>
            <SocialIconBtn label="YouTube">
              <img src="/images/youtube-colored.svg" alt="YouTube" className="w-[18px] h-[18px]" />
            </SocialIconBtn>
            <SocialIconBtn label="Twitter">
              <img src="/images/twitter-colored.svg" alt="Twitter" className="w-[18px] h-[18px]" />
            </SocialIconBtn>
          </div>
        </div>
      </div>
    </article>
  );
}

function SocialIconBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-[#E0E0E0] bg-white hover:border-[#6EBD44] hover:shadow-sm active:scale-95 transition-all group"
    >
      <span className="group-hover:scale-110 transition-transform flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}
