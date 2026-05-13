import Link from "next/link";

import { homePromo } from "@/config/home-marketing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-white/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-white/[0.05] blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:px-6 sm:py-14 lg:px-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/55">
            {homePromo.eyebrow}
          </p>
          <h2 className="font-heading text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {homePromo.title}
          </h2>
          <p className="text-sm leading-relaxed text-white/65 sm:text-base">
            {homePromo.description}
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/40">
            {homePromo.footnote}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:items-end">
          <Link
            href={homePromo.cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 w-full border-0 bg-white text-neutral-950 hover:bg-white/90 sm:h-12 sm:w-auto sm:min-w-[11rem]"
            )}
          >
            {homePromo.cta.label}
          </Link>
          <Link
            href={homePromo.secondaryCta.href}
            className="text-center text-sm font-medium text-white/80 underline-offset-8 transition-colors hover:text-white hover:underline sm:text-right"
          >
            {homePromo.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
