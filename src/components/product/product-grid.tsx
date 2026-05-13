import type { Product } from "@/domain/product";

import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: Product[];
  emptyLabel?: string;
  className?: string;
};

export function ProductGrid({
  products,
  emptyLabel = "Pronto tendremos más piezas por aquí.",
  className,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-12 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <li key={product.id} className="group">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
