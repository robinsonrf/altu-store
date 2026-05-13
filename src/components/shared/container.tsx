"use client";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Ancho editorial consistente en toda la tienda. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--altu-container,80rem)] px-5 sm:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}
