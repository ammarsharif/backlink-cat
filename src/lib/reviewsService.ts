import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

const REVIEWS_COLLECTION = "reviews";

export async function fetchReviews(): Promise<Review[]> {
  // Single-field filter only — no composite index needed
  const q = query(
    collection(db, REVIEWS_COLLECTION),
    where("status", "==", "APPROVED")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      name: doc.data().name ?? "",
      avatar: doc.data().avatar ?? "",
      rating: doc.data().rating ?? 5,
      review: doc.data().review ?? "",
      createdAt: doc.data().createdAt?.toMillis() ?? 0,
    }))
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(({ createdAt: _c, ...rest }) => rest);
}
