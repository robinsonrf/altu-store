import Image from "next/image";
import Link from "next/link";

import { featuredCategories } from "@/config/home-marketing";
import { cn } from "@/lib/utils";

export function FeaturedCategories() {
  return (
    <section className="border-y border-border/80 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <header className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Catálogo
            </p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Categorías destacadas
            </h2>
          </div>
          <Link
            href="/tienda"
            className="text-sm font-medium text-foreground underline-offset-8 transition-colors hover:text-muted-foreground hover:underline"
          >
            Ver todo →
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-1">
          {featuredCategories.map((cat, index) => {
            const placement = [
              "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1 lg:min-h-[28rem]",
              "lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:min-h-[13.75rem]",
              "lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:min-h-[13.75rem]",
              "lg:col-span-1 lg:col-start-4 lg:row-start-2 lg:min-h-[13.75rem]",
            ] as const;
            const isHero = index === 0;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={cn(
                  "group relative isolate min-h-[14rem] overflow-hidden bg-muted outline-none transition-[transform,opacity] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:min-h-[16rem]",
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
                  className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 lg:p-8">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/70 transition-colors duration-300 group-hover:text-white/90">
                    {cat.tagline}
                  </p>
                  <p className="mt-1 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {cat.title}
                  </p>
                  <span className="mt-3 inline-block translate-y-1 text-xs font-medium uppercase tracking-[0.2em] text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/90">
                    Explorar
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
