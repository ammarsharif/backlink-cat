'use client';

import { useEffect, useState, useCallback } from 'react';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import {
  fetchBlogPosts,
  fetchBlogCategories,
  FirestoreBlogPost,
  formatDate,
} from '@/lib/blogService';
import { DocumentSnapshot } from 'firebase/firestore';

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function BlogCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 pb-10 border-b border-[#E8E8E8] animate-pulse">
      <div className="shrink-0 w-full sm:w-[220px] md:w-[270px] lg:w-[310px]">
        <div className="rounded-[20px] aspect-[310/220] bg-gray-200" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="h-7 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-px bg-gray-200 my-1" />
        <div className="flex gap-3">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-9 bg-gray-200 rounded-full w-40 mt-1" />
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-[20px] font-bold text-[#333] font-[var(--font-poppins)]">
          Failed to load blog posts
        </p>
        <p className="text-[15px] text-[#888] mt-2 font-[var(--font-inter)]">
          There was a problem fetching the latest articles. Please try again.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="px-8 py-3 bg-[#6EBD44] text-white text-[15px] font-bold rounded-full hover:bg-[#5da539] active:scale-95 transition-all shadow-sm"
      >
        Try Again
      </button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
      <div className="w-20 h-20 bg-[#F0F7E8] rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-[#6EBD44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <p className="text-[20px] font-bold text-[#333] font-[var(--font-poppins)]">
          No posts yet
        </p>
        <p className="text-[15px] text-[#888] mt-2 font-[var(--font-inter)]">
          Check back soon — new articles are published regularly.
        </p>
      </div>
    </div>
  );
}

// ─── Category Filter Pills ────────────────────────────────────────────────────
interface CategoryFilterProps {
  selected: string;
  categories: { name: string; count: number }[];
  onSelect: (cat: string) => void;
}

function CategoryFilter({ selected, categories, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
          selected === 'all'
            ? 'bg-[#6EBD44] text-white shadow-sm'
            : 'bg-gray-100 text-[#555] hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
            selected === cat.name
              ? 'bg-[#6EBD44] text-white shadow-sm'
              : 'bg-gray-100 text-[#555] hover:bg-gray-200'
          }`}
        >
          {cat.name}
          <span className="ml-1.5 opacity-70">({cat.count})</span>
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const PAGE_SIZE = 6;

export function BlogList() {
  const [posts, setPosts] = useState<FirestoreBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [pageHistory, setPageHistory] = useState<(DocumentSnapshot | null)[]>([null]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const loadPosts = useCallback(async (cursor: DocumentSnapshot | null, category: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBlogPosts(
        PAGE_SIZE,
        cursor,
        category !== 'all' ? category : undefined
      );
      setPosts(result.posts);
      setHasMore(result.hasMore);
      if (result.lastDoc && result.hasMore) {
        setPageHistory((prev) => {
          const next = [...prev];
          next[currentPage] = result.lastDoc;
          return next;
        });
      }
    } catch (err) {
      console.error('[BlogList] load error:', err);
      setError('Unable to load blog posts. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Load categories once
  useEffect(() => {
    fetchBlogCategories().then(setCategories).catch(console.error);
  }, []);

  // Load posts when page or category changes
  useEffect(() => {
    const cursor = pageHistory[currentPage - 1] ?? null;
    loadPosts(cursor, selectedCategory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setPageHistory([null]);
    setHasMore(false);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleNext = () => {
    if (hasMore) {
      setCurrentPage((p) => p + 1);
    }
  };

  const totalPages = hasMore ? currentPage + 1 : currentPage;

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && !loading && (
        <CategoryFilter
          selected={selectedCategory}
          categories={categories}
          onSelect={handleCategoryChange}
        />
      )}

      {/* Content */}
      {loading ? (
        <div className="space-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState onRetry={() => loadPosts(pageHistory[currentPage - 1] ?? null, selectedCategory)} />
      ) : posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="space-y-10">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                slug={post.slug}
                image={post.coverImage}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                authorAvatar={post.authorAvatar}
                category={post.category}
                date={formatDate(post.publishedAt)}
                readTime={post.readTimeMinutes}
              />
            ))}
          </div>

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasMore={hasMore}
            onPrev={handlePrev}
            onNext={handleNext}
            onPageSelect={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
