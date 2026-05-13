"use client";

import * as React from "react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsletterSection() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    "idle"
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email !== "string" || !email.trim()) return;

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      form.reset();
    }, 650);
  }

  return (
    <section className="border-t border-border/80 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Lista interna
            </p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Newsletter
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Drops, restocks y promos antes que en redes. Sin spam — solo{" "}
              {siteConfig.name}.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <Input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="tu@email.cl"
              disabled={status === "loading"}
              className={cn(
                "h-11 flex-1 rounded-none border-border/80 bg-muted/30 text-base sm:h-12 sm:text-sm",
                "placeholder:text-muted-foreground/70",
                "focus-visible:border-foreground/40"
              )}
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading" || status === "success"}
              className="h-11 shrink-0 rounded-none px-8 sm:h-12"
            >
              {status === "loading"
                ? "…"
                : status === "success"
                  ? "Listo"
                  : "Suscribirme"}
            </Button>
          </form>

          {status === "success" ? (
            <p
              className="text-sm text-muted-foreground lg:col-span-2"
              role="status"
            >
              Revisa tu bandeja (y spam) para confirmar cuando conectes el
              proveedor de email.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
