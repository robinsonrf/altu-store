import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { mockProducts } from "@/infrastructure/catalog/mock-products";
import { formatCLP } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo/metadata";

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
    <Container className="pb-28 pt-28 sm:pb-36 sm:pt-32 lg:pb-40 lg:pt-36">
      <article>
        <Link
          href="/tienda"
          className="inline-block font-mono text-[0.625rem] font-medium uppercase tracking-[0.28em] text-muted-foreground transition-opacity duration-500 hover:opacity-55"
        >
          ← Shop
        </Link>

        <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-20 lg:gap-x-24">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col pt-2 lg:max-w-md lg:justify-center lg:pt-0">
            <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-6 font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-normal tracking-[-0.02em]">
              {product.name}
            </h1>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
            <p className="mt-10 font-mono text-sm tabular-nums tracking-tight text-foreground">
              {formatCLP(product.price.amount)}
            </p>
            <Button
              type="button"
              disabled
              variant="outline"
              className="mt-14 h-12 max-w-xs rounded-none border-foreground/25 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em]"
            >
              Add to bag
            </Button>
          </div>
        </div>
      </article>
    </Container>
  );
}
