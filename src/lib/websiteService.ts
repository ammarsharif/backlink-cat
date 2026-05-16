import {
  collection,
  getDocs,
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

// ─── Firestore Data Shape ───────────────────────────────────────────────────
export interface FirestoreWebsite {
  id: string;
  domain: string;
  domainIcoUrl: string | null;
  email: string;
  moz_da: number;
  moz_ss: number;
  ahref_dr: number;
  ahref_traffic: number;
  link_type: 'DO_FOLLOW' | 'NO_FOLLOW' | string;
  niches: string[];
  gp_price: number;
  li_price: number;
  cbd_or_crypto_price: number;
  review: number;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | string;
  type: string;
  added_time: Timestamp | null;
  updated_time: Timestamp | null;
  rejectReason: string | null;
}

// ─── Filter Shape ────────────────────────────────────────────────────────────
export interface WebsiteFilters {
  domainSearch?: string;
  da?: { min: number; max: number } | null;
  ss?: { min: number; max: number } | null;
  dr?: { min: number; max: number } | null;
  traffic?: { min: number; max: number } | null;
  niche?: string | null;
  linkType?: 'DO_FOLLOW' | 'NO_FOLLOW' | null;
  gpPrice?: { min: number; max: number } | null;
  liPrice?: { min: number; max: number } | null;
  cbdPrice?: { min: number; max: number } | null;
}

// ─── Paginated Result ────────────────────────────────────────────────────────
export interface PaginatedWebsites {
  websites: FirestoreWebsite[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}

// ─── Typed Error ─────────────────────────────────────────────────────────────
export class FirestoreIndexError extends Error {
  public readonly indexUrl: string | null;
  constructor(message: string, indexUrl: string | null = null) {
    super(message);
    this.name = 'FirestoreIndexError';
    this.indexUrl = indexUrl;
  }
}

/** Extract the auto-create index URL from a Firestore error message, if present. */
function extractIndexUrl(err: unknown): string | null {
  const msg = err instanceof Error ? err.message : String(err);
  const match = msg.match(/https:\/\/console\.firebase\.google\.com[^\s]+/);
  return match ? match[0] : null;
}

/** Returns true when the Firebase error code indicates a missing composite index. */
function isIndexError(err: unknown): boolean {
  if (err instanceof Error) {
    return (
      err.message.includes('requires an index') ||
      err.message.includes('The query requires an index') ||
      // Firebase SDK code
      (err as { code?: string }).code === 'failed-precondition'
    );
  }
  return false;
}

const WEBSITES_COLLECTION = 'websites';

/**
 * Fetch approved websites with optional filters and cursor-based pagination.
 * Throws `FirestoreIndexError` when the composite index hasn't been created yet.
 */
export async function fetchWebsites(
  filters: WebsiteFilters = {},
  pageSize: number = 10,
  lastDocument: DocumentSnapshot | null = null
): Promise<PaginatedWebsites> {
  const constraints: QueryConstraint[] = [
    where('status', '==', 'APPROVED'),
    orderBy('updated_time', 'desc'),
  ];

  if (filters.niche) {
    constraints.push(where('niches', 'array-contains', filters.niche));
  }

  if (filters.linkType) {
    constraints.push(where('link_type', '==', filters.linkType));
  }

  if (lastDocument) {
    constraints.push(startAfter(lastDocument));
  }

  // Fetch one extra to detect whether more pages exist
  constraints.push(limit(pageSize + 1));

  try {
    const q = query(collection(db, WEBSITES_COLLECTION), ...constraints);
    const snapshot = await getDocs(q);

    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;
    const pageDocs = hasMore ? docs.slice(0, pageSize) : docs;

    let websites: FirestoreWebsite[] = pageDocs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<FirestoreWebsite, 'id'>),
    }));

    if (filters.domainSearch) {
      const q = filters.domainSearch.toLowerCase();
      websites = websites.filter((w) => w.domain?.toLowerCase().includes(q));
    }
    if (filters.da) {
      const { min, max } = filters.da;
      websites = websites.filter((w) => w.moz_da >= min && (max === Infinity || w.moz_da <= max));
    }
    if (filters.dr) {
      const { min, max } = filters.dr;
      websites = websites.filter((w) => w.ahref_dr >= min && (max === Infinity || w.ahref_dr <= max));
    }
    if (filters.ss) {
      const { min, max } = filters.ss;
      websites = websites.filter((w) => w.moz_ss >= min && (max === Infinity || w.moz_ss <= max));
    }
    if (filters.traffic) {
      const { min, max } = filters.traffic;
      websites = websites.filter((w) => w.ahref_traffic >= min && (max === Infinity || w.ahref_traffic <= max));
    }
    if (filters.gpPrice) {
      const { min, max } = filters.gpPrice;
      websites = websites.filter((w) => w.gp_price >= min && (max === Infinity || w.gp_price <= max));
    }
    if (filters.liPrice) {
      const { min, max } = filters.liPrice;
      websites = websites.filter((w) => w.li_price >= min && (max === Infinity || w.li_price <= max));
    }
    if (filters.cbdPrice) {
      const { min, max } = filters.cbdPrice;
      websites = websites.filter((w) => w.cbd_or_crypto_price >= min && (max === Infinity || w.cbd_or_crypto_price <= max));
    }

    return {
      websites,
      lastDoc: pageDocs.length > 0 ? pageDocs[pageDocs.length - 1] : null,
      hasMore,
    };
  } catch (err) {
    if (isIndexError(err)) {
      const url = extractIndexUrl(err);
      throw new FirestoreIndexError(
        'A Firestore composite index is required. Click the link below to create it — it takes about 1 minute.',
        url
      );
    }
    throw err;
  }
}
export async function fetchRecentWebsites(count: number = 4): Promise<FirestoreWebsite[]> {
  try {
    const q = query(
      collection(db, WEBSITES_COLLECTION),
      where('status', '==', 'APPROVED'),
      orderBy('updated_time', 'desc'),
      limit(count)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<FirestoreWebsite, 'id'>),
    }));
  } catch (err) {
    if (isIndexError(err)) {
      const url = extractIndexUrl(err);
      throw new FirestoreIndexError(
        'A Firestore composite index is required. Click the link below to create it.',
        url
      );
    }
    throw err;
  }
}

/**
 * Format a large number as a human-readable string (e.g. 2500 → "2.5K").
 */
export function formatTraffic(value: number): string {
  if (!value && value !== 0) return 'N/A';
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

/**
 * Normalise the link_type field for display.
 */
export function formatLinkType(linkType: string): string {
  if (linkType === 'DO_FOLLOW') return 'DF';
  if (linkType === 'NO_FOLLOW') return 'NF';
  return linkType ?? 'N/A';
}
