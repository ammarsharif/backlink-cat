import { doc, getDoc } from "firebase/firestore/lite";
import { dbLite } from "@/lib/firebase";

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface UsefulLink {
  label: string;
  href: string;
}

export interface WebsiteSettings {
  aboutUsText: string;
  usefulLinks: UsefulLink[];
  socialLinks: SocialLink[];
  copyrightText: string;
  signUpUrl: string;
}

const DEFAULT_SETTINGS: WebsiteSettings = {
  aboutUsText: "BacklinkCAT is a premier marketplace connecting ambitious marketers with high-quality publishers. We streamline the link-building process, empowering brands to enhance their SEO authority while giving publishers a platform to monetize their content efficiently.",
  usefulLinks: [
    { label: "Home", href: "/" },
    { label: "Category", href: "/category" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
  ],
  socialLinks: [
    { label: "Facebook", href: "#", icon: "/images/facebook.svg" },
    { label: "Twitter", href: "#", icon: "/images/twitter.svg" },
    { label: "Instagram", href: "#", icon: "/images/instagram.svg" },
    { label: "Linkedin", href: "#", icon: "/images/linkedin.svg" },
    { label: "Youtube", href: "#", icon: "/images/youtube.svg" },
  ],
  copyrightText: "Copyright © 2024 By BacklinkCAT",
  signUpUrl: "https://app.backlinkcat.com/#/signup",
};

export async function fetchWebsiteSettings(): Promise<WebsiteSettings> {
  try {
    const docRef = doc(dbLite, "settings", "general");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { ...DEFAULT_SETTINGS, ...snapshot.data() } as WebsiteSettings;
    }
  } catch (err) {
    console.error("[settingsService] Error fetching settings, falling back to default:", err);
  }
  return DEFAULT_SETTINGS;
}
