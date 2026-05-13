import Link from "next/link";

import type { Product } from "@/domain/product";
import { ProductGrid } from "@/features/products";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { cn } from "@/lib/utils";

type HomeFeaturedProductsProps = {
  products: Product[];
};

export function HomeFeaturedProducts({ products }: HomeFeaturedProductsProps) {
  return (
    <section className="bg-muted/20">
      <Container className="py-20 sm:py-24 lg:py-28">
        <header className="mb-14 flex flex-col justify-between gap-8 border-b border-border/50 pb-14 sm:mb-16 sm:flex-row sm:items-end sm:pb-16">
          <div className="max-w-lg space-y-4">
            <SectionLabel>Selección</SectionLabel>
            <h2 className="font-heading text-3xl font-normal tracking-tight sm:text-4xl">
              Destacados
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              Piezas de referencia. El catálogo completo vive en tienda.
            </p>
          </div>
          <Link
            href="/tienda"
            className={cn(
              "inline-flex h-11 shrink-0 items-center justify-center border border-border bg-background px-6 text-sm font-medium transition-[background-color,transform,border-color] duration-300 hover:bg-muted/60",
              "rounded-none active:scale-[0.99]"
            )}
          >
            Ver todo
          </Link>
        </header>

        <ProductGrid
          products={products}
          className="gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        />
      </Container>
    </section>
  );
}
