import type { Product } from "@/domain/product";

/** Datos de ejemplo: sustituir por repositorio/API en capa de infraestructura. */
export const mockProducts: Product[] = [
  {
    id: "p-1",
    slug: "camisa-lino-arena",
    name: "Camisa lino Arena",
    description:
      "Camisa de lino de caída limpia y construcción ligera. Diseñada para capas suaves y uso diario.",
    shortDescription: "Lino ligero, corte relajado.",
    price: { amount: 59990, currency: "CLP" },
    category: "essentials",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1400&q=80",
        alt: "Perchero con prendas y texturas de tela en tonos neutros",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
        alt: "Look editorial con camisa clara",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Arena", hex: "#D7CFC3" },
      { name: "Negro", hex: "#1A1A1A" },
    ],
    featured: true,
    stock: 14,
    dropTag: "Drop 01",
    createdAt: "2026-05-01T10:00:00.000Z",
  },
  {
    id: "p-2",
    slug: "pantalón-sastrería-grafito",
    name: "Pantalón sastrería Grafito",
    description:
      "Pantalón de silueta recta con tiro medio y terminación precisa. Construido para movimiento urbano.",
    shortDescription: "Sastrería moderna, caída recta.",
    price: { amount: 74990, currency: "CLP" },
    category: "performance",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&q=80",
        alt: "Silueta urbana con pantalón y calzado en entorno citadino",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1400&q=80",
        alt: "Plano editorial de pantalón oscuro",
      },
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Grafito", hex: "#3C3F46" },
      { name: "Negro", hex: "#171717" },
    ],
    featured: true,
    stock: 8,
    dropTag: "Drop 01",
    createdAt: "2026-05-03T10:00:00.000Z",
  },
  {
    id: "p-3",
    slug: "bufanda-alpaca-natural",
    name: "Bufanda alpaca Natural",
    description:
      "Bufanda tejida en fibra suave con textura sutil y proporción envolvente. Aporta contraste y calidez.",
    shortDescription: "Fibra suave con textura premium.",
    price: { amount: 35990, currency: "CLP" },
    category: "accessories",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=1400&q=80",
        alt: "Bufanda de lana en tonos neutros",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1400&q=80",
        alt: "Accesorio textil en escena monocromática",
      },
    ],
    sizes: ["Única"],
    colors: [
      { name: "Natural", hex: "#D5CCBC" },
      { name: "Carbón", hex: "#3B3B3B" },
    ],
    featured: true,
    stock: 18,
    dropTag: "Drop 02",
    createdAt: "2026-05-06T10:00:00.000Z",
  },
  {
    id: "p-4",
    slug: "cartera-minimal-cuero",
    name: "Cartera minimal cuero",
    description:
      "Cartera compacta de cuero con compartimentos esenciales y construcción robusta para uso prolongado.",
    shortDescription: "Cuero premium, formato esencial.",
    price: { amount: 89990, currency: "CLP" },
    category: "accessories",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1400&q=80",
        alt: "Cartera de cuero sobre superficie clara",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80",
        alt: "Accesorios en composición editorial",
      },
    ],
    sizes: ["Única"],
    colors: [
      { name: "Marrón", hex: "#6B4B35" },
      { name: "Negro", hex: "#1E1E1E" },
    ],
    featured: false,
    stock: 5,
    dropTag: "Drop 02",
    createdAt: "2026-05-08T10:00:00.000Z",
  },
  {
    id: "p-5",
    slug: "hoodie-oversized-carbon",
    name: "Hoodie Oversized Carbon",
    description:
      "Hoodie pesado de hombro caído con textura limpia y ajuste amplio. Base ideal para capas.",
    shortDescription: "Oversized fit, felpa pesada.",
    price: { amount: 79990, currency: "CLP" },
    category: "oversized",
    images: [
      {
        url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1400&q=80",
        alt: "Hoodie oversized en tono oscuro",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1400&q=80",
        alt: "Sudadera urbana en look editorial",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Carbon", hex: "#2A2A2C" },
      { name: "Off White", hex: "#EAE7E0" },
    ],
    featured: true,
    stock: 11,
    dropTag: "Drop 03",
    createdAt: "2026-05-10T10:00:00.000Z",
  },
];
