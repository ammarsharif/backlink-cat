import { doc, getDoc } from 'firebase/firestore/lite';
import { dbLite } from '@/lib/firebase';

export interface WhyChooseUsData {
  videoUrl: string;
  features: string[];
}

async function fetchWhyChooseUs(docId: string): Promise<WhyChooseUsData | null> {
  try {
    const snap = await getDoc(doc(dbLite, 'whyChooseUs', docId));
    if (!snap.exists()) return null;
    const data = snap.data();
    if (!Array.isArray(data.features) || typeof data.videoUrl !== 'string') return null;
    return data as WhyChooseUsData;
  } catch {
    return null;
  }
}

export const fetchWhyPublishers = () => fetchWhyChooseUs('publishers');
export const fetchWhyMarketers = () => fetchWhyChooseUs('marketers');
