export const siteConfig = {
  name: "Altu",
  domain: "altu.cl",
  get url() {
    return `https://${this.domain}` as const;
  },
  defaultLocale: "es-CL" as const,
  description:
    "Streetwear y accesorios curados en Chile. Drops, siluetas urbanas y envíos a todo el país.",
  keywords: [
    "Altu",
    "moda Chile",
    "ropa",
    "accesorios",
    "tienda online Chile",
    "altu.cl",
  ],
  /** SEO local: región principal de negocio */
  geo: {
    region: "CL-RM",
    placename: "Santiago",
    position: "-33.4489;-70.6693",
  },
  links: {
    instagram: "https://instagram.com/altu.cl",
  },
  contact: {
    email: "hola@altu.cl",
  },
} as const;
