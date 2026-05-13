import type { Product, ProductFilters } from "@/domain/product";
import { mockProducts } from "@/infrastructure/catalog/mock-products";
import { mapProductRecordToDomain, type ProductRecord } from "@/features/products/model/product-mappers";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/services";

function applyMockFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.featured !== undefined && product.featured !== filters.featured) return false;
    if (filters.size && !product.sizes.includes(filters.size)) return false;
    if (
      filters.color &&
      !product.colors.some((color) =>
        color.name.toLowerCase() === filters.color?.toLowerCase()
      )
    ) {
      return false;
    }
    if (filters.drop && product.dropTag !== filters.drop) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase().trim();
      const haystack = `${product.name} ${product.description} ${product.shortDescription}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export async function listProducts(filters: ProductFilters = {}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return applyMockFilters(mockProducts, filters);
  }

  try {
    const supabase = await getSupabaseServerClient();
    const query = supabase
      .from("products")
      .select(
        "id,name,slug,description,short_description,price,category,images,sizes,colors,featured,stock,drop_tag,created_at"
      )
      .order("created_at", { ascending: false });

    if (filters.category) query.eq("category", filters.category);
    if (filters.featured !== undefined) query.eq("featured", filters.featured);
    if (filters.drop) query.eq("drop_tag", filters.drop);
    if (filters.q) query.ilike("name", `%${filters.q}%`);
    if (filters.size) query.contains("sizes", [filters.size]);
    if (filters.color) query.contains("colors", [{ name: filters.color }]);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((record) => mapProductRecordToDomain(record as ProductRecord));
  } catch {
    return applyMockFilters(mockProducts, filters);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from("products")
      .select(
        "id,name,slug,description,short_description,price,category,images,sizes,colors,featured,stock,drop_tag,created_at"
      )
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    return data ? mapProductRecordToDomain(data as ProductRecord) : null;
  } catch {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
}
