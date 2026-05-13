import Image from "next/image";
import Link from "next/link";

import { editorialFeature } from "@/features/home/data";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function HomeEditorial() {
  return (
    <section className="border-y border-border/40 bg-background">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="relative min-h-[min(28rem,65vh)] w-full lg:order-2 lg:min-h-[min(40rem,85vh)] lg:w-[58%]">
          <Image
            src={editorialFeature.imageUrl}
            alt={editorialFeature.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-neutral-950/[0.06]"
            aria-hidden
          />
        </div>

        <Container className="flex flex-1 flex-col justify-center py-20 sm:py-28 lg:order-1 lg:max-w-none lg:w-[42%] lg:py-0 lg:pr-16">
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg lg:translate-y-[6%]">
            <h2 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.03em] text-foreground">
              {editorialFeature.title}
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              {editorialFeature.description}
            </p>
            <Link
              href={editorialFeature.cta.href}
              className={cn(
                "mt-12 inline-flex min-h-11 items-center justify-center border border-foreground/25 bg-transparent px-8 py-3 font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-foreground",
                "rounded-none transition-[border-color,opacity] duration-500 hover:border-foreground/45 hover:opacity-80 sm:mt-14"
              )}
            >
              {editorialFeature.cta.label}
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
