import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(100svh,56rem)] w-full overflow-hidden bg-neutral-950">
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=88"
        alt="Interior de tienda — ambiente minimalista"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.88] transition-opacity duration-700 motion-reduce:transition-none"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/25"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[min(100svh,56rem)] flex-col justify-end pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24">
        <div className="altu-reveal max-w-2xl space-y-8" style={{ animationDelay: "80ms" }}>
          <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.4em] text-white/55">
            {siteConfig.name} · {siteConfig.domain}
          </p>

          <h1 className="font-heading text-[clamp(2.25rem,6vw,4.25rem)] font-normal leading-[1.02] tracking-tight text-white">
            Menos ruido.
            <span className="mt-3 block text-white/88">Más intención.</span>
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            Ropa y accesorios con silueta limpia. Hecho para durar, pensado para
            Chile.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/tienda"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 min-w-[11rem] rounded-none border-0 bg-white text-neutral-950 transition-[transform,background-color] duration-300 ease-out hover:bg-white/90 sm:h-12",
                "active:scale-[0.99]"
              )}
            >
              Tienda
            </Link>
            <Link
              href="/tienda?coleccion=novedades"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-none border-white/35 bg-transparent text-white transition-colors duration-300 hover:bg-white/10 hover:text-white sm:h-12"
              )}
            >
              Novedades
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
