import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/domain/product";
import { formatCLP } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const href = `/producto/${product.slug}`;

  return (
    <Card className="h-full gap-0 rounded-none border-0 pt-0 shadow-none ring-1 ring-foreground/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-foreground/15">
      <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>
      <CardHeader className="gap-2 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-normal">
            {product.category}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 text-base">
          <Link href={href} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {product.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto justify-between border-t-0 bg-transparent p-4 pt-0">
        <span className="text-sm font-semibold tabular-nums">
          {formatCLP(product.price.amount)}
        </span>
        <Link
          href={href}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Ver
        </Link>
      </CardFooter>
    </Card>
  );
}
