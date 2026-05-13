import type { ProductFilters } from "@/domain/product";

type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseStoreFilters(searchParams: SearchParams): ProductFilters {
  const category = firstValue(searchParams.category);
  const size = firstValue(searchParams.size);
  const color = firstValue(searchParams.color);
  const drop = firstValue(searchParams.drop);
  const q = firstValue(searchParams.q);
  const featured = firstValue(searchParams.featured);

  return {
    category: category || undefined,
    size: size || undefined,
    color: color || undefined,
    drop: drop || undefined,
    q: q || undefined,
    featured:
      featured === "true" ? true : featured === "false" ? false : undefined,
  };
}
