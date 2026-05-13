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
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={href}
        className="relative aspect-[4/5] w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-[opacity,transform] duration-[1200ms] ease-out motion-reduce:transition-none group-hover:opacity-[0.95] group-hover:scale-[1.012]"
        />
      </Link>

      <div className="flex flex-col gap-3 pt-10">
        <h3 className="font-heading text-[0.9rem] font-normal leading-snug tracking-[-0.01em] text-foreground">
          <Link href={href} className="transition-opacity duration-500 hover:opacity-55">
            {product.name}
          </Link>
        </h3>
        <p className="font-mono text-[0.75rem] font-normal tabular-nums tracking-[0.01em] text-muted-foreground/85">
          {formatCLP(product.price.amount)}
        </p>
      </div>
    </article>
  );
}
