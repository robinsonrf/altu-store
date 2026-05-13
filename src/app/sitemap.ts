import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { listProducts } from "@/infrastructure/catalog/catalog-repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const products = await listProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/tienda",
    "/collections",
    "/about",
  ].map((path) => ({
    url: `${base}${path === "" ? "/" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified: p.createdAt ? new Date(p.createdAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
