import type { Product } from "@/domain/product";

export type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  images: { url: string; alt: string; isPrimary?: boolean }[] | null;
  sizes: string[] | null;
  colors: { name: string; hex: string }[] | null;
  featured: boolean;
  stock: number;
  drop_tag: string | null;
  created_at: string;
};

export function mapProductRecordToDomain(record: ProductRecord): Product {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    description: record.description,
    shortDescription: record.short_description,
    price: { amount: record.price, currency: "CLP" },
    category: record.category,
    images: record.images ?? [],
    sizes: record.sizes ?? [],
    colors: record.colors ?? [],
    featured: record.featured,
    stock: record.stock,
    dropTag: record.drop_tag,
    createdAt: record.created_at,
  };
}
