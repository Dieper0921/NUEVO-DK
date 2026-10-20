export type Currency = 'PEN' | 'USD';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'audio' | 'wearables' | 'gaming' | 'gadgets' | 'cameras' | 'salud';
  categoryLabel: string;
  pricePEN: number;
  priceUSD: number;
  originalPricePEN: number;
  originalPriceUSD: number;
  image: string;
  stockStatus: 'in_stock' | 'low_stock' | 'pre_order';
  stockLabel: string;
  badge?: string;
  originCountry: string;
  shortDescription: string;
  description?: string;
  features: string[];
  specs: { [key: string]: string };
  warrantyMonths: number;
  isFeatured?: boolean;
  imageFit?: 'contain' | 'cover';
}

export interface CartItem {
  product: Product;
  quantity: number;
}
