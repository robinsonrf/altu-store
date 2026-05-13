import Link from "next/link";

import type { Product, ProductFilters } from "@/domain/product";
import { cn } from "@/lib/utils";

type CatalogFiltersProps = {
  products: Product[];
  currentFilters: ProductFilters;
};

function createHref(
  current: ProductFilters,
  key: keyof ProductFilters,
  value?: string
): string {
  const params = new URLSearchParams();
  const next = { ...current, [key]: value || undefined };

  Object.entries(next).forEach(([paramKey, paramValue]) => {
    if (paramValue === undefined || paramValue === null || paramValue === "") return;
    params.set(paramKey, String(paramValue));
  });

  const query = params.toString();
  return query ? `/tienda?${query}` : "/tienda";
}

function getUniqueValues(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "es"));
}

export function CatalogFilters({ products, currentFilters }: CatalogFiltersProps) {
  const categories = getUniqueValues(products.map((product) => String(product.category)));
  const sizes = getUniqueValues(products.flatMap((product) => product.sizes));
  const colors = getUniqueValues(
    products.flatMap((product) => product.colors.map((color) => color.name))
  );

  const filterClass =
    "rounded-none border border-border/50 px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] transition-colors duration-500 hover:border-foreground/40";
  const activeClass = "border-foreground/45 bg-foreground/5 text-foreground";
  const inactiveClass = "text-muted-foreground";

  return (
    <div className="mb-14 space-y-8 sm:mb-16">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Filtros
        </h2>
        <Link
          href="/tienda"
          className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-foreground transition-opacity duration-500 hover:opacity-60"
        >
          Limpiar
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => {
            const active = currentFilters.category === category;
            return (
              <Link
                key={category}
                href={createHref(currentFilters, "category", active ? undefined : category)}
                className={cn(filterClass, active ? activeClass : inactiveClass)}
              >
                {category}
              </Link>
            );
          })}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {sizes.map((size) => {
            const active = currentFilters.size === size;
            return (
              <Link
                key={size}
                href={createHref(currentFilters, "size", active ? undefined : size)}
                className={cn(filterClass, active ? activeClass : inactiveClass)}
              >
                Talla {size}
              </Link>
            );
          })}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {colors.map((color) => {
            const active = currentFilters.color === color;
            return (
              <Link
                key={color}
                href={createHref(currentFilters, "color", active ? undefined : color)}
                className={cn(filterClass, active ? activeClass : inactiveClass)}
              >
                {color}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
