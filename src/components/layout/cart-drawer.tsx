"use client";

import Image from "next/image";
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
import { useCart } from "@/features/cart";
import { formatCLP } from "@/lib/format";
import { cn } from "@/lib/utils";

type CartDrawerProps = {
  className?: string;
};

export function CartDrawer({ className }: CartDrawerProps) {
  const { state, count, subtotal, removeItem, updateQty } = useCart();
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
            <ul className="space-y-5 text-sm text-muted-foreground">
              {state.items.map((item) => (
                <li key={`${item.id}-${item.size}-${item.color}`} className="space-y-3">
                  <div className="flex gap-4">
                    <div className="relative size-16 overflow-hidden bg-muted">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="truncate text-sm text-foreground">{item.name}</p>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em]">
                        {item.size} · {item.color}
                      </p>
                      <p className="font-mono text-[0.7rem] text-foreground">
                        {formatCLP(item.price.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border/40">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.size, item.color, item.quantity - 1)}
                        className="px-2 py-1 text-foreground/70 transition-colors hover:text-foreground"
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center font-mono text-[0.65rem]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.size, item.color, item.quantity + 1)}
                        className="px-2 py-1 text-foreground/70 transition-colors hover:text-foreground"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.size, item.color)}
                      className="font-mono text-[0.625rem] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
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
                  {formatCLP(subtotal)}
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
