"use client";

import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

/** Rótulo mono / tracking — jerarquía editorial sin ruido. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-[0.625rem] font-medium uppercase tracking-[0.38em] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
