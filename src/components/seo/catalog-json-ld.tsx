import type { Product } from "@/domain/product";
import { siteConfig } from "@/config/site";

type CatalogJsonLdProps = {
  products: Product[];
};

export function CatalogJsonLd({ products }: CatalogJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/producto/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
