import Link from "next/link";

import type { Product } from "@/domain/product";
import { ProductGrid } from "@/components/product/product-grid";
import { cn } from "@/lib/utils";

type FeaturedProductsSectionProps = {
  products: Product[];
};

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  return (
    <section className="bg-muted/25">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <header className="mb-10 flex flex-col justify-between gap-6 border-b border-border/60 pb-10 sm:mb-12 sm:flex-row sm:items-end sm:pb-12">
          <div className="max-w-xl space-y-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Drop
            </p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Productos destacados
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Selección editorial para la home. Conecta esta sección a tu API o
              CMS sin tocar la cuadrícula de producto.
            </p>
          </div>
          <Link
            href="/tienda"
            className={cn(
              "shrink-0 self-start rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-[background-color,transform] duration-200 hover:bg-muted sm:self-auto",
              "active:scale-[0.98]"
            )}
          >
            Catálogo completo
          </Link>
        </header>

        <ProductGrid
          products={products}
          className="gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        />
      </div>
    </section>
  );
}
