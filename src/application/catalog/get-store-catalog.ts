import type { ProductFilters } from "@/domain/product";
import { listProducts } from "@/infrastructure/catalog/catalog-repository";

export async function getStoreCatalog(filters: ProductFilters = {}) {
  return listProducts(filters);
}
