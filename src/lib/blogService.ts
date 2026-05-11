import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// ─── Data Shapes ──────────────────────────────────────────────────────────────

export interface FirestoreBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  coverImage: string;
  status: 'published' | 'draft';
  publishedAt: Timestamp | null;
  readTimeMinutes: number;
  commentCount: number;
}

export interface PaginatedBlogPosts {
  posts: FirestoreBlogPost[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
  total: number;
}

export const BLOGS_COLLECTION = 'blogs';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: Timestamp | null): string {
  if (!ts) return '';
  return ts.toDate().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export { formatDate };

// ─── Fetch Paginated Blog Posts ───────────────────────────────────────────────

export async function fetchBlogPosts(
  pageSize: number = 6,
  lastDocument: DocumentSnapshot | null = null,
  category?: string
): Promise<PaginatedBlogPosts> {
  try {
    // Fetch all documents to bypass the need for composite indexes during prototyping
    const snapshot = await getDocs(collection(db, BLOGS_COLLECTION));
    let docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirestoreBlogPost));
    
    // Sort descending by publishedAt
    docs.sort((a, b) => {
      const aTime = a.publishedAt?.toMillis() || 0;
      const bTime = b.publishedAt?.toMillis() || 0;
      return bTime - aTime;
    });

    // Filter by status and optionally by category
    docs = docs.filter(d => d.status === 'published');
    if (category && category !== 'all') {
      docs = docs.filter(d => d.category === category);
    }

    const total = docs.length;

    // Apply manual pagination
    let startIndex = 0;
    if (lastDocument) {
      const lastIndex = docs.findIndex(d => d.id === lastDocument.id);
      if (lastIndex !== -1) startIndex = lastIndex + 1;
    }

    const pageDocs = docs.slice(startIndex, startIndex + pageSize + 1);
    const hasMore = pageDocs.length > pageSize;
    const posts = hasMore ? pageDocs.slice(0, pageSize) : pageDocs;

    // Find the original DocumentSnapshot for the last retrieved post
    const lastPostId = posts.length > 0 ? posts[posts.length - 1].id : null;
    const lastDocSnapshot = lastPostId ? snapshot.docs.find(d => d.id === lastPostId) || null : null;

    return {
      posts,
      lastDoc: lastDocSnapshot,
      hasMore,
      total,
    };
  } catch (err) {
    console.error('[blogService] fetchBlogPosts error:', err);
    throw err;
  }
}

// ─── Fetch Recent Posts ───────────────────────────────────────────────────────

export async function fetchRecentPosts(count: number = 4): Promise<FirestoreBlogPost[]> {
  try {
    const snapshot = await getDocs(collection(db, BLOGS_COLLECTION));
    let docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirestoreBlogPost));
    
    docs = docs.filter(d => d.status === 'published');
    docs.sort((a, b) => {
      const aTime = a.publishedAt?.toMillis() || 0;
      const bTime = b.publishedAt?.toMillis() || 0;
      return bTime - aTime;
    });

    return docs.slice(0, count);
  } catch (err) {
    console.error('[blogService] fetchRecentPosts error:', err);
    throw err;
  }
}

// ─── Fetch Single Post by Slug ────────────────────────────────────────────────

export async function fetchBlogPostBySlug(slug: string): Promise<FirestoreBlogPost | null> {
  try {
    const snapshot = await getDocs(collection(db, BLOGS_COLLECTION));
    const doc = snapshot.docs.find(d => {
      const data = d.data() as FirestoreBlogPost;
      return data.slug === slug && data.status === 'published';
    });
    
    if (!doc) return null;
    return { id: doc.id, ...(doc.data() as Omit<FirestoreBlogPost, 'id'>) };
  } catch (err) {
    console.error('[blogService] fetchBlogPostBySlug error:', err);
    throw err;
  }
}

// ─── Fetch All Categories ─────────────────────────────────────────────────────

export async function fetchBlogCategories(): Promise<{ name: string; count: number }[]> {
  try {
    const q = query(
      collection(db, BLOGS_COLLECTION),
      where('status', '==', 'published')
    );
    const snapshot = await getDocs(q);
    const catMap: Record<string, number> = {};
    snapshot.docs.forEach((d) => {
      const cat = d.data().category as string;
      catMap[cat] = (catMap[cat] || 0) + 1;
    });
    return Object.entries(catMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  } catch (err) {
    console.error('[blogService] fetchBlogCategories error:', err);
    return [];
  }
}
