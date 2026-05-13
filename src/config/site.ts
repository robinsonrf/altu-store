export const siteConfig = {
  name: "ALTU",
  domain: "altu.cl",
  get url() {
    return `https://${this.domain}` as const;
  },
  defaultLocale: "es-CL" as const,
  description:
    "Premium essentials for movement. Contemporary silhouettes, disciplined design.",
  keywords: [
    "ALTU",
    "Altu",
    "moda Chile",
    "ropa premium",
    "accesorios",
    "altu.cl",
  ],
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
