import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
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
  totalCount: number;
  totalPages: number;
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

// Firestore fetch cap for the filterable pool. Niche/DA/DR/SS/traffic/price
// filters all run in JS (below) rather than as Firestore `where` constraints —
// combining them server-side would need several composite indexes. Pagination
// is computed *after* filtering, over this whole pool, so page counts stay
// accurate. Raise this cap (or move filters back to server-side queries with
// the matching composite indexes) if the catalog grows past a few thousand
// approved listings.
const MAX_FILTERABLE_DOCS = 1000;

/**
 * Fetch approved websites with optional filters, paginated over the fully
 * filtered result set (not the raw Firestore page) so page counts are correct.
 * Throws `FirestoreIndexError` when a composite index hasn't been created yet.
 */
export async function fetchWebsites(
  filters: WebsiteFilters = {},
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedWebsites> {
  const constraints: QueryConstraint[] = [
    where('status', '==', 'APPROVED'),
    orderBy('updated_time', 'desc'),
  ];

  if (filters.linkType) {
    constraints.push(where('link_type', '==', filters.linkType));
  }

  constraints.push(limit(MAX_FILTERABLE_DOCS));

  try {
    const q = query(collection(db, WEBSITES_COLLECTION), ...constraints);
    const snapshot = await getDocs(q);

    let websites: FirestoreWebsite[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<FirestoreWebsite, 'id'>),
    }));

    if (filters.niche) {
      websites = websites.filter((w) => w.niches?.includes(filters.niche as string));
    }
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

    const totalCount = websites.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const startIdx = (safePage - 1) * pageSize;

    return {
      websites: websites.slice(startIdx, startIdx + pageSize),
      totalCount,
      totalPages,
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
