import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type StoreLayoutProps = {
  children: React.ReactNode;
};

/**
 * Capa de presentación de la tienda: shell fijo (navbar + main + footer).
 * Mantiene el root layout enfocado en HTML, fuentes, tema y SEO.
 */
export function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main
        id="main-content"
        className="flex flex-1 flex-col motion-safe:scroll-smooth"
        tabIndex={-1}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
