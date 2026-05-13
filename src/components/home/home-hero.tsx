import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-neutral-950"
    >
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=88"
        alt="Editorial retail space — monochrome interior"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] opacity-[0.92] motion-safe:transition-opacity motion-safe:duration-[1200ms] motion-safe:ease-out"
      />

      {/* Cinematográfico: viñeta + gradiente lateral para lectura editorial */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-950/45" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/55 to-transparent sm:via-neutral-950/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/10"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(3rem,12vh,7rem)] pt-[clamp(7rem,18vh,10rem)]">
        <div className="mx-auto w-full max-w-[var(--altu-container,80rem)] px-6 sm:px-10 lg:px-14">
          <div className="max-w-none lg:grid lg:grid-cols-12 lg:gap-8 lg:gap-x-12">
            <div
              className="altu-reveal lg:col-span-7 lg:col-start-1 xl:col-span-6"
              style={{ animationDelay: "120ms", animationDuration: "1s" }}
            >
              <h1
                id="hero-heading"
                className="font-heading text-[clamp(2.75rem,11vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.03em] text-white"
              >
                <span className="block">Movement.</span>
                <span className="mt-[0.12em] block text-white/92">Discipline.</span>
                <span className="mt-[0.12em] block text-white/85">Identity.</span>
              </h1>

              <p className="mt-10 max-w-[22rem] font-mono text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/55 sm:mt-14">
                Premium essentials built for movement.
              </p>

              <div className="mt-14 sm:mt-16 lg:mt-20">
                <Link
                  href="/tienda"
                  className={cn(
                    "inline-flex min-h-11 items-center justify-center border border-white/35 bg-transparent px-10 py-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white",
                    "rounded-none transition-[border-color,background-color,color,opacity] duration-500 ease-out",
                    "hover:border-white/55 hover:bg-white/[0.06] active:opacity-90",
                    "motion-safe:focus-visible:outline-none motion-safe:focus-visible:ring-1 motion-safe:focus-visible:ring-white/50 motion-safe:focus-visible:ring-offset-4 motion-safe:focus-visible:ring-offset-neutral-950"
                  )}
                >
                  Shop Collection
                </Link>
              </div>
            </div>

            {/* Espacio negativo intencional en desktop */}
            <div className="hidden lg:col-span-5 lg:block xl:col-span-6" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
