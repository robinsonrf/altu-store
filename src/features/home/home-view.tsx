import { getHomeFeaturedProducts } from "@/application/catalog/get-home-catalog";

import { HomeCategories } from "@/components/home/home-categories";
import { HomeEditorial } from "@/components/home/home-editorial";
import { HomeFeaturedProducts } from "@/components/home/home-featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { HomeNewsletter } from "@/components/home/home-newsletter";

/** Vista principal ALTU — compone secciones; datos vía capa application/infrastructure. */
export async function HomeView() {
  const featured = await getHomeFeaturedProducts();

  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomeFeaturedProducts products={featured} />
      <HomeEditorial />
      <HomeNewsletter />
    </>
  );
}
