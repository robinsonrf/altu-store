import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre ALTU",
  description:
    "ALTU — movimiento, disciplina e identidad. Essentials premium para la vida moderna.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="pb-28 pt-28 sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-36">
      <article className="max-w-2xl space-y-10">
        <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.38em] text-muted-foreground">
          Sobre ALTU
        </span>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-normal tracking-[-0.03em]">
          Movimiento. Disciplina. Identidad.
        </h1>
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          <p>
            ALTU es una marca contemporánea de Essentials basada en claridad de
            forma y materiales honestos.
          </p>
          <p>
            Cada pieza está diseñada para trascender tendencias: siluetas
            disciplinadas para el movimiento diario.
          </p>
        </div>
      </article>
    </Container>
  );
}
