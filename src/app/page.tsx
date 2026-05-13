import { FeaturedCategories } from "@/components/marketing/featured-categories";
import { FeaturedProductsSection } from "@/components/marketing/featured-products-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { NewsletterSection } from "@/components/marketing/newsletter-section";
import { PromoBanner } from "@/components/marketing/promo-banner";
import { getHomeFeaturedProducts } from "@/application/catalog/get-home-catalog";

export default function HomePage() {
  const featured = getHomeFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProductsSection products={featured} />
      <PromoBanner />
      <NewsletterSection />
    </>
  );
}
