export type ProductId = string;

export type Money = {
  amount: number;
  currency: "CLP";
};

export type ProductCategory =
  | "oversized"
  | "performance"
  | "accessories"
  | "essentials"
  | "outerwear"
  | "tops"
  | "bottoms";

export type ProductImage = {
  url: string;
  alt: string;
  isPrimary?: boolean;
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: Money;
  category: ProductCategory | string;
  images: ProductImage[];
  sizes: string[];
  colors: ProductColor[];
  featured: boolean;
  stock: number;
  dropTag: string | null;
  createdAt: string;
};

export type ProductFilters = {
  category?: string;
  size?: string;
  color?: string;
  featured?: boolean;
  drop?: string;
  q?: string;
};
