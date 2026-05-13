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
    tagline: "Parkas · cortavientos",
    imageUrl:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1400&q=85",
    imageAlt: "Modelo con chaqueta urbana",
  },
  {
    title: "Hoodies",
    href: "/tienda?categoria=hoodies",
    tagline: "Capsulas y pesos medios",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=85",
    imageAlt: "Sudadera con capucha en tono neutro",
  },
  {
    title: "Denim",
    href: "/tienda?categoria=denim",
    tagline: "Cortes rectos y relajados",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=85",
    imageAlt: "Jeans y texturas denim",
  },
  {
    title: "Accesorios",
    href: "/tienda?categoria=accesorios",
    tagline: "Gorros · bolsos · lentes",
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=85",
    imageAlt: "Accesorios de calle sobre mesa",
  },
];

export const homePromo = {
  eyebrow: "Promo temporada",
  title: "Hasta 30% en selección SS",
  description:
    "Piezas curadas para capas ligeras y transición. Stock limitado en tienda online.",
  cta: { label: "Ver ofertas", href: "/tienda?promo=ss" },
  secondaryCta: { label: "Novedades", href: "/tienda?coleccion=novedades" },
  footnote: "altu.cl · envíos a todo Chile",
} as const;
