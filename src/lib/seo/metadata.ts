import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Product } from "@/domain/product";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Essentials premium`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Essentials premium`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Essentials premium`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  other: {
    "geo.region": siteConfig.geo.region,
    "geo.placename": siteConfig.geo.placename,
    "geo.position": siteConfig.geo.position,
  },
};

type PageMetaInput = {
  title: string;
  description?: string;
  path: string;
};

export function buildPageMetadata({
  title,
  description = siteConfig.description,
  path,
}: PageMetaInput): Metadata {
  const canonical = new URL(path.startsWith("/") ? path : `/${path}`, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export function buildProductMetadata(product: Product): Metadata {
  const canonical = new URL(`/producto/${product.slug}`, siteConfig.url).toString();
  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];

  return {
    title: product.name,
    description: product.shortDescription || product.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: product.name,
      description: product.shortDescription || product.description,
      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              alt: primaryImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription || product.description,
      images: primaryImage ? [primaryImage.url] : undefined,
    },
  };
}
