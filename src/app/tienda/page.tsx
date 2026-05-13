import type { Metadata } from "next";

import { getStoreCatalog } from "@/application/catalog/get-store-catalog";
import { ProductGrid } from "@/features/products";
import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Shop",
  description:
    "ALTU shop — curated essentials. Ready to wire to Supabase or your API.",
  path: "/tienda",
});

export default function StorePage() {
  const products = getStoreCatalog();

  return (
    <Container className="pb-24 pt-28 sm:pb-32 sm:pt-32 lg:pb-40 lg:pt-36">
      <header className="mb-20 max-w-lg space-y-6 sm:mb-24">
        <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.38em] text-muted-foreground">
          Shop
        </span>
        <h1 className="font-heading text-[clamp(2rem,5vw,3rem)] font-normal tracking-[-0.03em]">
          All pieces
        </h1>
      </header>
      <ProductGrid products={products} />
    </Container>
  );
}
