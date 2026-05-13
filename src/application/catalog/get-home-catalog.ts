import { listProducts } from "@/infrastructure/catalog/catalog-repository";

/** Caso de uso de presentación: catálogo destacado para la home. */
export async function getHomeFeaturedProducts() {
  const featured = await listProducts({ featured: true });
  return featured.slice(0, 4);
}
