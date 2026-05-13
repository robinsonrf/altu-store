import { getFeaturedProducts } from "@/infrastructure/catalog/mock-products";

/** Caso de uso de presentación: catálogo destacado para la home. */
export function getHomeFeaturedProducts() {
  return getFeaturedProducts();
}
