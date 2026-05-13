import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/infrastructure/catalog/mock-products";
import { formatCLP } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) {
    return {};
  }
  return buildPageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/producto/${product.slug}`,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/tienda"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 -ml-2 text-muted-foreground"
        )}
      >
        ← Volver a la tienda
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted lg:aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">
            {product.category}
          </Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
          <p className="text-2xl font-semibold tabular-nums">
            {formatCLP(product.price.amount)}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" size="lg" disabled>
              Añadir al carrito
            </Button>
            <p className="w-full text-sm text-muted-foreground">
              Flujo de checkout pendiente: este botón ancla el siguiente incremento
              funcional.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
