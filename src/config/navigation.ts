export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { title: "Inicio", href: "/" },
  { title: "Tienda", href: "/tienda", description: "Todo el catálogo" },
  {
    title: "Novedades",
    href: "/tienda?coleccion=novedades",
    description: "Últimos ingresos",
  },
  {
    title: "Accesorios",
    href: "/tienda?categoria=accesorios",
    description: "Complementos y detalles",
  },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Comprar",
    items: [
      { title: "Tienda", href: "/tienda" },
      { title: "Guía de tallas", href: "/guia-de-tallas" },
      { title: "Envíos y devoluciones", href: "/envios" },
    ],
  },
  {
    title: "Altu",
    items: [
      { title: "Sobre nosotros", href: "/sobre-altu" },
      { title: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Términos y condiciones", href: "/terminos" },
      { title: "Privacidad", href: "/privacidad" },
    ],
  },
];
