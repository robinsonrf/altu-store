import Image from "next/image";
import Link from "next/link";

import { featuredCategories } from "@/features/home/data";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function HomeCategories() {
  return (
    <section className="border-y border-border/40 bg-background">
      <Container className="py-28 sm:py-36 lg:py-44">
        <header className="mb-20 flex items-end justify-between gap-8 sm:mb-24 lg:mb-32">
          <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.38em] text-muted-foreground">
            Categorías
          </span>
          <Link
            href="/tienda"
            className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-opacity duration-500 hover:opacity-70"
          >
            Ver todo
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {featuredCategories.map((cat, index) => {
            const placement = [
              "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1 lg:min-h-[min(32rem,70vh)]",
              "lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:min-h-[min(15rem,28vh)]",
              "lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:min-h-[min(15rem,28vh)]",
              "lg:col-span-1 lg:col-start-4 lg:row-start-2 lg:min-h-[min(15rem,28vh)]",
            ] as const;
            const isHero = index === 0;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={cn(
                  "group relative isolate min-h-[min(18rem,55vh)] overflow-hidden bg-background outline-none transition-opacity duration-700 focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-[20rem]",
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
                  className="object-cover transition-[transform,filter] duration-[1400ms] ease-out motion-reduce:transition-none group-hover:scale-[1.025] group-hover:brightness-[1.02]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-700 group-hover:from-black/82"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 sm:p-9 lg:p-10">
                  <p className="font-heading text-[clamp(1.5rem,4vw,2.75rem)] font-normal tracking-[-0.02em] text-white">
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
