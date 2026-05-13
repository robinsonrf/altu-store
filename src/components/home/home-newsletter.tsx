"use client";

import * as React from "react";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function HomeNewsletter() {
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
    }, 600);
  }

  return (
    <section className="border-t border-border/60 bg-background">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div className="max-w-md space-y-4">
            <SectionLabel>Newsletter</SectionLabel>
            <h2 className="font-heading text-3xl font-normal tracking-tight sm:text-4xl">
              Lista interna
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Drops y restocks. Sin ruido — solo {siteConfig.name}.
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
              placeholder="correo@ejemplo.cl"
              disabled={status === "loading"}
              className={cn(
                "h-12 flex-1 rounded-none border-border bg-transparent text-base sm:text-sm",
                "placeholder:text-muted-foreground/60",
                "focus-visible:border-foreground/50"
              )}
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading" || status === "success"}
              className="h-12 shrink-0 rounded-none px-8 transition-opacity duration-300"
            >
              {status === "loading"
                ? "…"
                : status === "success"
                  ? "En lista"
                  : "Unirse"}
            </Button>
          </form>
        </div>

        {status === "success" ? (
          <p className="mt-8 text-sm text-muted-foreground lg:col-span-2" role="status">
            Conecta tu proveedor de email (p. ej. Resend + Supabase) para
            confirmaciones reales.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
