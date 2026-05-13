"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const PLACEHOLDER_CART_COUNT = 0;

type CartDrawerProps = {
  className?: string;
};

export function CartDrawer({ className }: CartDrawerProps) {
  const count = PLACEHOLDER_CART_COUNT;
  const hasItems = count > 0;

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "relative inline-flex size-10 items-center justify-center rounded-none text-muted-foreground transition-opacity duration-500 hover:bg-transparent hover:opacity-70",
          className
        )}
        aria-label={hasItems ? `Bolsa, ${count} productos` : "Abrir bolsa"}
      >
        <ShoppingBag className="size-[1.1rem] stroke-[1.25]" />
        {hasItems ? (
          <Badge
            variant="default"
            className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full p-0 text-[10px]"
          >
            {count > 99 ? "99+" : count}
          </Badge>
        ) : null}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-l border-border/40 bg-background/97 p-0 backdrop-blur-xl sm:max-w-md"
      >
        <SheetHeader className="border-b border-border/40 px-8 py-8 text-left">
          <SheetTitle className="font-heading text-base font-normal tracking-tight">
            Bolsa
          </SheetTitle>
          <SheetDescription className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-foreground">
            {siteConfig.name}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col px-8 py-12">
          {!hasItems ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
              <ShoppingBag
                className="size-12 stroke-[1] text-muted-foreground/40"
                aria-hidden
              />
              <div className="max-w-[220px] space-y-3">
                <p className="text-sm font-normal text-foreground">Tu bolsa está vacía</p>
              </div>
              <Link
                href="/tienda"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-w-[180px] rounded-none border-foreground/25 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em]"
                )}
              >
                Explorar colección
              </Link>
            </div>
          ) : (
            <ul className="space-y-3 text-sm text-muted-foreground">
              {/* Line items when cart state exists */}
            </ul>
          )}
        </div>

        {hasItems ? (
          <>
            <Separator className="bg-border/40" />
            <div className="space-y-5 px-8 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-mono text-sm tabular-nums text-foreground">
                  —
                </span>
              </div>
              <Button
                type="button"
                className="w-full rounded-none font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em]"
                size="lg"
              >
                Pagar
              </Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
