import type { Product } from "@/domain/product";

import { ProductCard } from "@/features/products/components/product-card";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: Product[];
  emptyLabel?: string;
  className?: string;
};

export function ProductGrid({
  products,
  emptyLabel = "No encontramos productos con esos filtros.",
  className,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="border border-dashed border-border/60 py-16 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
