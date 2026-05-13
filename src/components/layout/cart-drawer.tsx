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

/** Sustituir por estado global / hook de carrito cuando exista el flujo de compra. */
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
          "relative inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-[color,transform,background-color] duration-200 hover:bg-muted/80 hover:text-foreground active:scale-[0.97]",
          className
        )}
        aria-label={hasItems ? `Carrito, ${count} artículos` : "Abrir carrito"}
      >
        <ShoppingBag className="size-[1.35rem] stroke-[1.5]" />
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
        className="flex w-full flex-col border-l border-border/60 bg-background/95 p-0 backdrop-blur-xl sm:max-w-md"
      >
        <SheetHeader className="border-b border-border/60 px-6 py-5 text-left">
          <SheetTitle className="font-heading text-lg tracking-tight">
            Carrito
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {siteConfig.name} · compra segura
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col px-6 py-8">
          {!hasItems ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <div
                className="flex size-20 items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/30 text-muted-foreground transition-colors duration-300"
                aria-hidden
              >
                <ShoppingBag className="size-9 stroke-[1.25]" />
              </div>
              <div className="max-w-[240px] space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Tu carrito está vacío
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Añade piezas desde la tienda. Las animaciones y el resumen del
                  pedido aparecerán aquí.
                </p>
              </div>
              <Link
                href="/tienda"
                className={cn(buttonVariants({ size: "lg" }), "min-w-[200px]")}
              >
                Ver tienda
              </Link>
            </div>
          ) : (
            <ul className="space-y-3 text-sm text-muted-foreground">
              {/* Lista de líneas cuando exista estado de carrito */}
            </ul>
          )}
        </div>

        {hasItems ? (
          <>
            <Separator />
            <div className="space-y-4 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium tabular-nums text-foreground">
                  —
                </span>
              </div>
              <Button type="button" className="w-full" size="lg">
                Ir a pagar
              </Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
