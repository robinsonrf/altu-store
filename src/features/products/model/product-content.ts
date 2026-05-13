import type { Product } from "@/domain/product";

export type ProductEditorialContent = {
  eyebrow: string;
  headline: string;
  story: string;
};

export function buildProductEditorialContent(
  product: Product
): ProductEditorialContent {
  return {
    eyebrow: `${String(product.category)}${product.dropTag ? ` · ${product.dropTag}` : ""}`,
    headline: product.name,
    story: product.shortDescription || product.description,
  };
}
