import type { Metadata } from "next";

import { getStoreCatalog } from "@/application/catalog/get-store-catalog";
import { ProductGrid } from "@/features/products";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tienda",
  description:
    "Ropa y accesorios ALTU. Catálogo curado — listo para conectar con Supabase u otro backend.",
  path: "/tienda",
});

export default function StorePage() {
  const products = getStoreCatalog();

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <header className="mb-14 max-w-xl space-y-4 sm:mb-16">
        <SectionLabel>Tienda</SectionLabel>
        <h1 className="font-heading text-3xl font-normal tracking-tight sm:text-4xl">
          Catálogo
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Vista de producto inicial. Sustituye el mock por consultas desde{" "}
          <code className="font-mono text-xs">services/supabase</code> cuando
          conectes datos.
        </p>
      </header>
      <ProductGrid products={products} />
    </Container>
  );
}
