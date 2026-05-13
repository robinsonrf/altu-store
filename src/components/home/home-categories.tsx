import Image from "next/image";
import Link from "next/link";

import { featuredCategories } from "@/features/home/data";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { cn } from "@/lib/utils";

export function HomeCategories() {
  return (
    <section className="border-y border-border/60 bg-background">
      <Container className="py-20 sm:py-24 lg:py-28">
        <header className="mb-14 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
          <div className="max-w-md space-y-4 motion-safe:altu-reveal">
            <SectionLabel>Categorías</SectionLabel>
            <h2 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
              Curadas con criterio
            </h2>
          </div>
          <Link
            href="/tienda"
            className="shrink-0 text-sm font-medium text-muted-foreground underline-offset-[10px] transition-colors duration-300 hover:text-foreground hover:underline"
          >
            Ver catálogo
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {featuredCategories.map((cat, index) => {
            const placement = [
              "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1 lg:min-h-[26rem]",
              "lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:min-h-[12.5rem]",
              "lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:min-h-[12.5rem]",
              "lg:col-span-1 lg:col-start-4 lg:row-start-2 lg:min-h-[12.5rem]",
            ] as const;
            const isHero = index === 0;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={cn(
                  "group relative isolate min-h-[13rem] overflow-hidden bg-background outline-none transition-[background-color] duration-300 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:min-h-[15rem]",
                  placement[index]
                )}
              >
                <Image
                  src={cat.imageUrl}
                  alt={cat.imageAlt}
                  fill
                  sizes={
                    isHero
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.03] group-hover:opacity-95"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/85"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-white/60">
                    {cat.tagline}
                  </p>
                  <p className="mt-1 font-heading text-2xl font-normal tracking-tight text-white sm:text-3xl">
                    {cat.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
