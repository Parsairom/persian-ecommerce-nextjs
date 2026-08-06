export type ProductCategory =
  | "mobile"
  | "tablet"
  | "laptop"
  | "smartwatch"
  | "handsfree"
  | "headphone"
  | "speaker"
  | "powerbank"
  | "charger"
  | "cable"
  | "dongle"
  | "modem"
  | "network"
  | "accessory"
  | "ssd"
  | "hdd"
  | "flash"
  | "memory-card"
  | "gaming"
  | "console"
  | "computer-parts";

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logoIcon?: string;
}

export interface Category {
  id: ProductCategory;
  slug: string;
  title: string;
  icon: string;
  description?: string;
}

export interface ProductVariantColor {
  id: string;
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  likes: number;
}

export interface ProductQuestion {
  id: string;
  author: string;
  date: string;
  question: string;
  answer?: string;
  answeredBy?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brandId: string;
  categoryId: ProductCategory;
  price: number;
  compareAtPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isDeal?: boolean;
  dealEndsAt?: string;
  colors?: ProductVariantColor[];
  warranty: string;
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  gallery: { icon: string; gradient: string }[];
  reviews: ProductReview[];
  questions: ProductQuestion[];
  tags: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: number;
  category: string;
  cover: { icon: string; gradient: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  body: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Address {
  id: string;
  title: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  full: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: { productId: string; title: string; qty: number; price: number; gradient: string; icon: string }[];
  trackingCode?: string;
}
