import { siteConfig } from "@/config/site";

/** Datos estructurados JSON-LD para SEO (marca + presencia local Chile). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        sameAs: [siteConfig.links.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contact.email,
          areaServed: "CL",
          availableLanguage: ["Spanish"],
        },
      },
      {
        "@type": "ClothingStore",
        "@id": `${siteConfig.url}/#store`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CL",
          addressRegion: "Región Metropolitana de Santiago",
          addressLocality: siteConfig.geo.placename,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: siteConfig.defaultLocale,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
