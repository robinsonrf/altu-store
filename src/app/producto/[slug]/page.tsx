import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { ProductJsonLd } from "@/components/seo/product-json-ld";
import { ProductDetail } from "@/features/products";
import { getProductBySlug, listProducts } from "@/infrastructure/catalog/catalog-repository";
import { buildProductMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {};
  }
  return buildProductMetadata(product);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <Container className="pb-28 pt-28 sm:pb-36 sm:pt-32 lg:pb-40 lg:pt-36">
      <article>
        <ProductJsonLd product={product} />
        <Link
          href="/tienda"
          className="inline-block font-mono text-[0.625rem] font-medium uppercase tracking-[0.28em] text-muted-foreground transition-opacity duration-500 hover:opacity-55"
        >
          ← Shop
        </Link>

        <ProductDetail product={product} />
      </article>
    </Container>
  );
}
