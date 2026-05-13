import Image from "next/image";
import Link from "next/link";

import { editorialFeature } from "@/features/home/data";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeEditorial() {
  return (
    <section className="border-y border-border/60 bg-background">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[20rem] bg-muted lg:min-h-[32rem]">
          <Image
            src={editorialFeature.imageUrl}
            alt={editorialFeature.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-neutral-950/10 lg:hidden"
            aria-hidden
          />
        </div>

        <Container className="flex flex-col justify-center py-16 sm:py-20 lg:max-w-none lg:py-24 lg:pl-16 lg:pr-12">
          <div className="max-w-md space-y-8">
            <SectionLabel>{editorialFeature.eyebrow}</SectionLabel>
            <h2 className="font-heading text-3xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              {editorialFeature.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {editorialFeature.description}
            </p>
            <Link
              href={editorialFeature.cta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 w-fit min-w-[10rem] rounded-none bg-foreground text-background transition-[opacity,transform] duration-300 hover:opacity-90 sm:h-12",
                "active:scale-[0.99]"
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
