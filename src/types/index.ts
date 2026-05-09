export interface NavItem {
  label: string;
  href: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface WebsiteListing {
  id: string;
  url: string;
  mozDA: number;
  mozDR: number;
  alexaTraffic: string;
  linkType: string;
  niche: string;
  opPrice: number;
  listPrice: number;
  cryptoPrice: number;
  reviews: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

export interface Post {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  href: string;
}

export interface PublisherLogo {
  id: string;
  name: string;
  image: string;
}
