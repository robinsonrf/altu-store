import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/domain/product";
import { formatCLP } from "@/lib/format";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const href = `/producto/${product.slug}`;

  return (
    <article
      className={cn(
        "group flex flex-col border-b border-transparent pb-2 transition-[border-color] duration-300 hover:border-border/80",
        className
      )}
    >
      <Link
        href={href}
        className="relative aspect-[3/4] w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.02] group-hover:opacity-95"
        />
      </Link>

      <div className="flex flex-col gap-1.5 pt-5">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-heading text-base font-normal tracking-tight text-foreground">
          <Link href={href} className="transition-opacity duration-200 hover:opacity-70">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="flex items-baseline justify-between pt-2">
          <span className="text-sm font-medium tabular-nums tracking-tight">
            {formatCLP(product.price.amount)}
          </span>
          <Link
            href={href}
            className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
}
