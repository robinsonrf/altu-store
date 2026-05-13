export type FeaturedCategory = {
  title: string;
  href: string;
  tagline: string;
  imageUrl: string;
  imageAlt: string;
};

export const featuredCategories: FeaturedCategory[] = [
  {
    title: "Outerwear",
    href: "/tienda?categoria=outerwear",
    tagline: "Capas",
    imageUrl:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1400&q=85",
    imageAlt: "Prenda outerwear en tonos neutros",
  },
  {
    title: "Hoodies",
    href: "/tienda?categoria=hoodies",
    tagline: "Pesos medios",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=85",
    imageAlt: "Hoodie texturizado",
  },
  {
    title: "Denim",
    href: "/tienda?categoria=denim",
    tagline: "Cortes limpios",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=85",
    imageAlt: "Denim y silueta urbana",
  },
  {
    title: "Accesorios",
    href: "/tienda?categoria=accesorios",
    tagline: "Detalles",
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=85",
    imageAlt: "Accesorios sobre superficie clara",
  },
];

export const editorialFeature = {
  eyebrow: "Lifestyle",
  title: "Hecho para el día a día.",
  description:
    "Materiales honestos, siluetas controladas y acabados que envejecen bien. Menos piezas, más intención.",
  cta: { label: "Explorar tienda", href: "/tienda" },
  imageUrl:
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1800&q=85",
  imageAlt: "Detalle textil y ambiente de estudio",
} as const;
