'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { fetchRecentPosts, FirestoreBlogPost, formatDate } from '@/lib/blogService';

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function PostSkeleton() {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-[16px] overflow-hidden animate-pulse flex flex-col">
      <div className="h-[220px] bg-gray-200" />
      <div className="p-6 space-y-3 flex-1">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="mt-auto pt-4">
          <div className="h-10 bg-gray-200 rounded-full w-32" />
        </div>
      </div>
    </div>
  );
}

export function LatestPosts() {
  const [posts, setPosts] = useState<FirestoreBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts(3)
      .then(setPosts)
      .catch((err) => {
        console.error('[LatestPosts] fetch error:', err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white">
      <Container className="max-w-[1534px]">
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-center mb-16 font-[var(--font-heading)]">
          Latest <span className="text-[#6EBD44]">Posts</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
          ) : posts.length === 0 ? (
            <p className="col-span-3 text-center text-[#888] py-10 text-[16px]">
              No posts available yet. Check back soon!
            </p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white border border-[#E0E0E0] rounded-[16px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Post Image */}
                <Link href={`/blog/${post.slug}`} className="h-[220px] overflow-hidden block">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/latest-posts.svg'; }}
                  />
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  {/* Category + Date */}
                  <div className="flex items-center gap-2 text-[12px] text-[#888] mb-3">
                    <span className="bg-[#F0F7E8] text-[#6EBD44] font-bold px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-bold text-black text-[20px] leading-tight mb-3 group-hover:text-[#7FC142] transition-colors line-clamp-2 cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-[14px] text-[#666666] leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="outline"
                        className="border-[#6EBD44] text-[#6EBD44] hover:bg-[#6EBD44] hover:text-white rounded-full px-6 h-10 text-[14px] font-bold transition-all cursor-pointer"
                      >
                        READ MORE
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="flex justify-center">
          <Link href="/blog">
            <Button className="bg-[#6EBD44] hover:bg-[#5DA539] text-white h-[55px] px-10 text-[18px] font-bold rounded-full transition-all cursor-pointer">
              VIEW ALL POSTS
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
