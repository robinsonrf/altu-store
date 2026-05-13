import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[min(92svh,52rem)] w-full overflow-hidden bg-neutral-950">
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=88"
        alt="Interior de tienda de ropa — ambiente editorial"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%] opacity-90"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/20"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.12),transparent)]" />

      <div className="relative z-10 mx-auto flex min-h-[min(92svh,52rem)] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70">
            <span>{siteConfig.name}</span>
            <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden />
            <span className="text-white/90">Streetwear · Chile</span>
          </div>

          <h1 className="font-heading text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Siluetas urbanas.
            <span className="mt-2 block text-white/85">Sin ruido.</span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Drop curado, materiales honestos y envíos a todo el país. Diseñado
            como base premium para tu operación en {siteConfig.domain}.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/tienda"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 min-w-[10.5rem] border-0 bg-white text-neutral-950 hover:bg-white/90 sm:h-12"
              )}
            >
              Comprar ahora
            </Link>
            <Link
              href="/tienda?coleccion=novedades"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white sm:h-12"
              )}
            >
              Ver novedades
            </Link>
          </div>
        </div>

        <p className="mt-12 max-w-md text-xs font-medium uppercase tracking-[0.28em] text-white/45 sm:mt-16">
          FW capsule · piezas limitadas · {siteConfig.geo.placename}
        </p>
      </div>
    </section>
  );
}
