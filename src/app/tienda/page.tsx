import type { Metadata } from "next";

import { ProductGrid } from "@/components/product/product-grid";
import { getStoreCatalog } from "@/application/catalog/get-store-catalog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tienda",
  description:
    "Explora ropa y accesorios Altu. Catálogo en construcción sobre arquitectura lista para escalar.",
  path: "/tienda",
});

export default function StorePage() {
  const products = getStoreCatalog();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mb-10 max-w-2xl space-y-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Tienda
        </h1>
        <p className="text-muted-foreground">
          Vista de catálogo inicial. Aquí puedes añadir filtros, orden, paginación
          y URL search params sin acoplar la UI al origen de datos.
        </p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
