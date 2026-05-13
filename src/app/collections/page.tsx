import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Collections",
  description:
    "ALTU collections — curated silhouettes and seasonal capsules.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <Container className="pb-28 pt-28 sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-36">
      <header className="max-w-xl space-y-6">
        <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.38em] text-muted-foreground">
          Collections
        </span>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-normal tracking-[-0.03em]">
          Capsules
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Seasonal drops and permanent essentials. Connect product groups here when
          your catalog is live.
        </p>
      </header>
      <p className="mt-20 font-mono text-[0.625rem] uppercase tracking-[0.28em] text-muted-foreground">
        <Link href="/tienda" className={cn("transition-opacity duration-500 hover:opacity-55")}>
          Shop →
        </Link>
      </p>
    </Container>
  );
}
