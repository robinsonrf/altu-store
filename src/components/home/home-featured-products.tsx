import Link from "next/link";

import type { Product } from "@/domain/product";
import { ProductGrid } from "@/features/products";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

type HomeFeaturedProductsProps = {
  products: Product[];
};

export function HomeFeaturedProducts({ products }: HomeFeaturedProductsProps) {
  return (
    <section className="bg-background">
      <Container className="py-24 sm:py-32 lg:py-40">
        <header className="mb-20 flex flex-col gap-10 border-b border-border/35 pb-16 sm:mb-24 sm:flex-row sm:items-end sm:justify-between sm:pb-20">
          <div className="space-y-4">
            <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.38em] text-muted-foreground">
              Featured
            </span>
            <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-normal tracking-[-0.02em] text-foreground">
              Selection
            </h2>
          </div>
          <Link
            href="/tienda"
            className={cn(
              "font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-opacity duration-500 hover:opacity-70"
            )}
          >
            Shop all
          </Link>
        </header>

        <ProductGrid
          products={products}
          className="gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4"
        />
      </Container>
    </section>
  );
}
