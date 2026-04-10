export type ProductCategory =
  | "subscription"
  | "gift-card"
  | "license"
  | "activation-key"
  | "premium-access"
  | "saas"
  | "downloadable";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  features: string[];
  deliveryType: "instant" | "email" | "download";
  inStock: boolean;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "completed" | "pending" | "refunded";
  deliveryCode?: string;
}
