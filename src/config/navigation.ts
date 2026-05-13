import { siteConfig } from "@/config/site";

export type NavItem = {
  title: string;
  href: string;
};

/** Navegación principal — deliberadamente escasa (marca premium). */
export const mainNav: NavItem[] = [
  { title: "Inicio", href: "/" },
  { title: "Shop", href: "/tienda" },
  { title: "Colecciones", href: "/collections" },
  { title: "Sobre ALTU", href: "/about" },
];

export type FooterColumn = {
  title: string;
  items: NavItem[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Navigation",
    items: [
      { title: "Shop", href: "/tienda" },
      { title: "Colecciones", href: "/collections" },
      { title: "Sobre ALTU", href: "/about" },
    ],
  },
  {
    title: "Social",
    items: [{ title: "Instagram", href: siteConfig.links.instagram }],
  },
  {
    title: "Contact",
    items: [{ title: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` }],
  },
];
