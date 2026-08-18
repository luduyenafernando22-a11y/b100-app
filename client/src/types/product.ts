// B-100 · Editorial Quiet Luxury: tipos de domínio para produtos e cliques.

export type ProductStatus = 'published' | 'over_limit' | 'invalid';

export interface Product {
  id: string | number;
  aliexpress_id: string | null;
  title: string;
  name?: string;
  category: string;
  price: number;
  original_price: number | null;
  currency: string;
  country_code?: string | null;
  image_url: string;
  affiliate_url: string;
  affiliate_link?: string;
  rating: number | null;
  sales_180_days: number | null;
  status: ProductStatus;
  description?: string | null;
  brand?: string | null;
  positive_feedback?: number | null;
  discount?: string | null;
}

export interface ClickEvent {
  product_id: string | number;
  created_at?: string;
}
