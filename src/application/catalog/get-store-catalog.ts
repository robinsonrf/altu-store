import { getAllProducts } from "@/infrastructure/catalog/mock-products";

export function getStoreCatalog() {
  return getAllProducts();
}
