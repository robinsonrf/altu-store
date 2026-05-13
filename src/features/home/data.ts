export type FeaturedCategory = {
  title: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
};

export const featuredCategories: FeaturedCategory[] = [
  {
    title: "Oversized",
    href: "/tienda?category=oversized",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1400&q=85",
    imageAlt: "Silueta oversized — volumen controlado",
  },
  {
    title: "Performance",
    href: "/tienda?category=performance",
    imageUrl:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1400&q=85",
    imageAlt: "Capa técnica — movimiento",
  },
  {
    title: "Accessories",
    href: "/tienda?category=accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=85",
    imageAlt: "Accesorios — detalle",
  },
  {
    title: "Essentials",
    href: "/tienda?category=essentials",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1400&q=85",
    imageAlt: "Esenciales — textura y forma",
  },
];

export const editorialFeature = {
  title: "Built for movement.",
  description:
    "Modern essentials inspired by discipline and motion.",
  cta: { label: "Discover More", href: "/about" },
  imageUrl:
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1800&q=85",
  imageAlt: "Textil y composición editorial",
} as const;
