import type { Product } from "@/domain/product";

/** Datos de ejemplo: sustituir por repositorio/API en capa de infraestructura. */
export const mockProducts: Product[] = [
  {
    id: "p-1",
    slug: "camisa-lino-arena",
    name: "Camisa lino Arena",
    shortDescription: "Corte relajado, tejido transpirable para temporada cálida.",
    price: { amount: 59990, currency: "CLP" },
    category: "Ropa",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    imageAlt: "Perchero con prendas y texturas de tela en tonos neutros",
    featured: true,
  },
  {
    id: "p-2",
    slug: "pantalón-sastrería-grafito",
    name: "Pantalón sastrería Grafito",
    shortDescription: "Pernera recta y cintura limpia para uso diario.",
    price: { amount: 74990, currency: "CLP" },
    category: "Ropa",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    imageAlt: "Silueta urbana con pantalón y calzado en entorno citadino",
    featured: true,
  },
  {
    id: "p-3",
    slug: "bufanda-alpaca-natural",
    name: "Bufanda alpaca Natural",
    shortDescription: "Fibra natural liviana, terminaciones enrolladas.",
    price: { amount: 35990, currency: "CLP" },
    category: "Accesorios",
    imageUrl:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    imageAlt: "Bufanda de lana en tonos neutros",
    featured: true,
  },
  {
    id: "p-4",
    slug: "cartera-minimal-cuero",
    name: "Cartera minimal cuero",
    shortDescription: "Compartimentos esenciales, piel curtida vegetal.",
    price: { amount: 89990, currency: "CLP" },
    category: "Accesorios",
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    imageAlt: "Cartera de cuero sobre superficie clara",
    featured: false,
  },
];

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.featured);
}

export function getAllProducts(): Product[] {
  return mockProducts;
}
