'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { Guarantees } from '@/components/sections/Guarantees';
import { fetchBlogPostBySlug, FirestoreBlogPost, formatDate } from '@/lib/blogService';
import Link from 'next/link';

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-[#F9F9F9] py-16 border-b border-[#EEEEEE]">
        <Container size="wide" className="max-w-[1534px]">
          <div className="max-w-[1000px] space-y-4">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
            <div className="flex gap-6 mt-4">
              <div className="h-4 bg-gray-200 rounded w-28" />
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </Container>
      </div>
      <Container size="wide" className="max-w-[1534px] py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="rounded-[30px] bg-gray-200 aspect-video w-full" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`h-4 bg-gray-100 rounded ${i % 3 === 2 ? 'w-3/4' : 'w-full'}`} />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[391px] shrink-0 space-y-6">
            <div className="h-48 bg-gray-100 rounded-[4px]" />
            <div className="h-40 bg-gray-100 rounded-[4px]" />
          </div>
        </div>
      </Container>
    </div>
  );
}

// ─── Not Found ────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
      <div className="w-24 h-24 bg-[#F0F7E8] rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-[#6EBD44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <h1 className="text-[28px] font-bold text-[#333] font-[var(--font-poppins)]">
          Post Not Found
        </h1>
        <p className="text-[16px] text-[#888] mt-2">
          This article may have been moved or deleted.
        </p>
      </div>
      <Link
        href="/blog"
        className="px-8 py-3 bg-[#6EBD44] text-white text-[15px] font-bold rounded-full hover:bg-[#5da539] transition-all"
      >
        Back to Blog
      </Link>
    </div>
  );
}

// ─── Social Icon ──────────────────────────────────────────────────────────────
function SocialIcon({ icon, href = '#' }: { icon: string; href?: string }) {
  return (
    <a
      href={href}
      className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-[#E0E0E0] bg-white hover:border-[#6EBD44] hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
    >
      <img src={icon} alt="" className="w-[20px] h-[20px]" />
    </a>
  );
}

interface BlogDetailClientProps {
  slug: string;
}

export function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const [post, setPost] = useState<FirestoreBlogPost | null | undefined>(undefined); // undefined = loading
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchBlogPostBySlug(slug)
      .then(setPost)
      .catch((err) => {
        console.error('[BlogDetailClient] fetch error:', err);
        setError(true);
        setPost(null);
      });
  }, [slug]);

  // Loading
  if (post === undefined && !error) {
    return <DetailSkeleton />;
  }

  // Error
  if (error || !post) {
    return <NotFound />;
  }

  const formattedDate = formatDate(post.publishedAt);

  return (
    <>
      {/* ── Blog Post Header ───────────────────────────────────────── */}
      <div className="bg-[#F9F9F9] py-16 border-b border-[#EEEEEE]">
        <Container size="wide" className="max-w-[1534px]">
          <div className="max-w-[1000px]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[14px] text-[#6EBD44] font-bold mb-6 font-[var(--font-inter)]">
              <Link href="/blog" className="hover:underline">BLOG</Link>
              <span className="text-[#CCCCCC] mx-1">—</span>
              <span className="text-[#999] font-normal">{post.category.toUpperCase()}</span>
            </div>

            {/* Title */}
            <h1 className="text-[28px] md:text-[38px] lg:text-[44px] font-bold text-[#111111] leading-[1.2] mb-8 font-(--font-poppins)">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 text-[15px] text-[#666666] font-[var(--font-inter)]">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-gray-200 shadow-sm border border-white">
                  <img
                    src={post.authorAvatar || '/images/latest-posts.svg'}
                    alt={post.author}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/latest-posts.svg'; }}
                  />
                </div>
                <span>By <span className="font-bold text-[#333]">{post.author}</span></span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6EBD44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formattedDate}</span>
              </div>

              {/* Read time */}
              {post.readTimeMinutes && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6EBD44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{post.readTimeMinutes} min read</span>
                </div>
              )}

              {/* Comments */}
              {post.commentCount > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6EBD44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="font-medium">{post.commentCount} Comments</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* ── Content + Sidebar ─────────────────────────────────────── */}
      <Container size="wide" className="max-w-[1534px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 py-16">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="font-[var(--font-inter)] text-[#444444] text-[17px] md:text-[18px] leading-[1.8]">
              {/* Cover image */}
              <div className="rounded-[30px] overflow-hidden mb-12 shadow-md">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-video"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/blog-image.svg'; }}
                />
              </div>

              {/* Rendered HTML content */}
              <div
                className="max-w-none text-[17px] md:text-[18px] leading-relaxed text-[#444] font-(--font-inter)
                  [&_h2]:font-(--font-poppins) [&_h2]:text-[#111] [&_h2]:text-[28px] [&_h2]:md:text-[34px] [&_h2]:font-bold [&_h2]:mt-14 [&_h2]:mb-8
                  [&_p]:mb-8 [&_p]:leading-[1.9]
                  [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:mb-8 [&_ul]:marker:text-[#6EBD44]
                  [&_li]:text-[#444] [&_li]:leading-relaxed
                  [&_blockquote]:border-l-[6px] [&_blockquote]:border-[#6EBD44] [&_blockquote]:pl-8 [&_blockquote]:py-5 [&_blockquote]:my-12 [&_blockquote]:italic [&_blockquote]:text-[#333] [&_blockquote]:bg-[#F9FFF5] [&_blockquote]:rounded-r-[20px] [&_blockquote]:text-[20px] [&_blockquote]:md:text-[24px] [&_blockquote]:font-medium
                  [&_strong]:text-[#111] [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags + Share */}
            <div className="mt-16 pt-10 border-t border-[#EEEEEE] flex flex-wrap items-center justify-between gap-6">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-black text-[18px] font-(--font-poppins)">Tags:</span>
                  <div className="flex flex-wrap gap-2.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-5 py-2 bg-[#F5F5F5] text-[#666] text-[14px] font-medium rounded-full hover:bg-[#6EBD44] hover:text-white transition-all cursor-pointer shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-4">
                <span className="font-bold text-black text-[18px] font-(--font-poppins)">Share:</span>
                <div className="flex items-center gap-3">
                  <SocialIcon icon="/images/facebook-colored.svg" />
                  <SocialIcon icon="/images/twitter-colored.svg" />
                  <SocialIcon icon="/images/linkedin-colored.svg" />
                  <SocialIcon icon="/images/instagram-colored.svg" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[391px] shrink-0">
            <BlogSidebar />
          </div>
        </div>
      </Container>

      {/* Related Posts Section */}
      <LatestPosts />

      {/* Followup / CTA Section */}
      <Guarantees />
    </>
  );
}
