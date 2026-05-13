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
        alt="Interior editorial monocromático de tienda"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_32%] opacity-[0.95] motion-safe:transition-opacity motion-safe:duration-[1400ms] motion-safe:ease-out"
      />

      {/* Cinematográfico: viñeta + gradiente lateral para lectura editorial */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-950/40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-950/92 via-neutral-950/58 to-transparent sm:via-neutral-950/42"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/28 to-neutral-950/8"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(3.5rem,13vh,7.5rem)] pt-[clamp(7rem,17vh,10rem)]">
        <div className="mx-auto w-full max-w-[var(--altu-container,80rem)] px-6 sm:px-10 lg:px-14">
          <div className="max-w-none lg:grid lg:grid-cols-12 lg:gap-8 lg:gap-x-14">
            <div
              className="altu-reveal lg:col-span-7 lg:col-start-2 xl:col-span-6"
              style={{ animationDelay: "140ms", animationDuration: "1.15s" }}
            >
              <h1
                id="hero-heading"
                className="font-heading text-[clamp(3rem,11.5vw,7rem)] font-normal leading-[0.9] tracking-[-0.035em] text-white"
              >
                <span className="block">Movimiento.</span>
                <span className="mt-[0.12em] block text-white/92">Disciplina.</span>
                <span className="mt-[0.12em] block text-white/85">Identidad.</span>
              </h1>

              <p className="mt-10 max-w-[22rem] font-mono text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/55 sm:mt-14">
                Essentials premium inspirados en el movimiento.
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
                  Explorar colección
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
