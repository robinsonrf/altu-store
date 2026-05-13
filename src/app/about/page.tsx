import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "ALTU — movement, discipline, identity. Premium essentials built for modern life.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="pb-28 pt-28 sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-36">
      <article className="max-w-2xl space-y-10">
        <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.38em] text-muted-foreground">
          About
        </span>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-normal tracking-[-0.03em]">
          Movement. Discipline. Identity.
        </h1>
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          <p>
            ALTU is a contemporary essentials label rooted in clarity of form and
            honest materials.
          </p>
          <p>
            Each piece is designed to live beyond trends — disciplined silhouettes
            for everyday motion.
          </p>
        </div>
      </article>
    </Container>
  );
}
