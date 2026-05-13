"use client";

import * as React from "react";

import { Container } from "@/components/shared/container";
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
    }, 650);
  }

  return (
    <section className="border-t border-border/40 bg-muted/15">
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-2xl font-normal tracking-[-0.02em] text-foreground sm:text-3xl">
            Join the community.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Get early access to new collections and releases.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <Input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Email"
              disabled={status === "loading"}
              className={cn(
                "h-12 flex-1 rounded-none border-border/80 bg-transparent text-base sm:text-sm",
                "placeholder:text-muted-foreground/50",
                "focus-visible:border-foreground/35"
              )}
            />
            <Button
              type="submit"
              variant="outline"
              disabled={status === "loading" || status === "success"}
              className="h-12 shrink-0 rounded-none border-foreground/25 px-8 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-opacity duration-500 hover:bg-transparent hover:opacity-70"
            >
              {status === "loading"
                ? "…"
                : status === "success"
                  ? "Done"
                  : "Submit"}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
