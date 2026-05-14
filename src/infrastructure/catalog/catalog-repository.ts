import type { Product, ProductFilters } from "@/domain/product";
import { mapProductRecordToDomain, type ProductRecord } from "@/features/products/model/product-mappers";
import { mockProducts } from "@/infrastructure/catalog/mock-products";
import { getSupabaseCatalogClient, isSupabaseConfigured } from "@/services";
import {
  altuSupabaseDebug,
  altuSupabaseDebugEnvOnce,
  isAltuSupabaseDebugEnabled,
} from "@/services/supabase/debug";

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
    altuSupabaseDebugEnvOnce();
    altuSupabaseDebug("listProducts: Supabase no configurado → mocks", {
      isSupabaseConfigured: false,
      hint: "Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local y reinicia `next dev`.",
    });
    return applyMockFilters(mockProducts, filters);
  }

  altuSupabaseDebugEnvOnce();
  altuSupabaseDebug("listProducts: usando Supabase (sin fallback a mocks)", {
    filters,
    debugMode: isAltuSupabaseDebugEnabled(),
  });

  const supabase = getSupabaseCatalogClient();
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
  if (error) {
    altuSupabaseDebug("listProducts: error PostgREST (no se usan mocks)", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(
      `[ALTU catalog] listProducts falló contra Supabase: ${error.message} (code=${error.code ?? "n/a"})`,
      { cause: error }
    );
  }

  const rows = data ?? [];
  altuSupabaseDebug("listProducts: consulta OK", {
    rowCount: rows.length,
    source: "supabase",
    firstSlugs: rows.slice(0, 5).map((r: { slug?: string }) => r.slug),
  });

  return rows.map((record) => mapProductRecordToDomain(record as ProductRecord));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    altuSupabaseDebugEnvOnce();
    altuSupabaseDebug("getProductBySlug: Supabase no configurado → mock local", {
      slug,
      isSupabaseConfigured: false,
    });
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }

  altuSupabaseDebugEnvOnce();
  altuSupabaseDebug("getProductBySlug: usando Supabase (sin fallback a mocks)", { slug });

  const supabase = getSupabaseCatalogClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id,name,slug,description,short_description,price,category,images,sizes,colors,featured,stock,drop_tag,created_at"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    altuSupabaseDebug("getProductBySlug: error PostgREST (no se usan mocks)", {
      slug,
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(
      `[ALTU catalog] getProductBySlug("${slug}") falló contra Supabase: ${error.message} (code=${error.code ?? "n/a"})`,
      { cause: error }
    );
  }

  if (!data) {
    altuSupabaseDebug("getProductBySlug: 0 filas (slug no existe en BD)", { slug });
    return null;
  }

  altuSupabaseDebug("getProductBySlug: producto encontrado en BD", {
    slug,
    id: (data as { id?: string }).id,
    source: "supabase",
  });

  return mapProductRecordToDomain(data as ProductRecord);
}
