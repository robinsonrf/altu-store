"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

import type { NavItem } from "@/config/navigation";
import { buttonVariants } from "@/components/ui/button";
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

type NavbarMobileMenuProps = {
  items: readonly NavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NavbarMobileMenu({
  items,
  open,
  onOpenChange,
}: NavbarMobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "md:hidden rounded-full transition-[transform,background-color] duration-200 active:scale-95"
        )}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        <span className="relative size-5">
          <Menu
            className={cn(
              "absolute inset-0 size-5 transition-[opacity,transform] duration-300 ease-out",
              open ? "rotate-90 scale-75 opacity-0" : "rotate-0 opacity-100"
            )}
          />
          <X
            className={cn(
              "absolute inset-0 size-5 transition-[opacity,transform] duration-300 ease-out",
              open ? "rotate-0 opacity-100" : "-rotate-90 scale-75 opacity-0"
            )}
          />
        </span>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(100%,22rem)] border-l border-border/50 bg-background/95 p-0 shadow-2xl backdrop-blur-xl duration-300 data-[ending-style]:duration-200 data-[starting-style]:duration-200 dark:border-white/10 dark:bg-background/90"
      >
        <SheetHeader className="border-b border-border/50 px-6 py-5 dark:border-white/10">
          <SheetTitle className="text-left font-heading text-lg font-semibold tracking-tight">
            Menú
          </SheetTitle>
          <SheetDescription className="text-left text-sm text-muted-foreground">
            Navegación principal de la tienda.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col px-3 py-4" aria-label="Móvil">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-xl px-4 py-3.5 text-[0.9375rem] font-medium text-foreground transition-[transform,background-color,color] duration-200 ease-out active:scale-[0.98]",
                "hover:bg-muted/60 dark:hover:bg-muted/25",
                "opacity-0 [animation:nav-drawer-item_0.45s_ease-out_forwards]"
              )}
              style={{ animationDelay: `${60 + i * 55}ms` }}
            >
              <span className="block">{item.title}</span>
              {item.description ? (
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <Separator className="opacity-50 dark:bg-white/10" />
        <div className="px-4 py-4">
          <Link
            href="/tienda"
            onClick={() => onOpenChange(false)}
            className={cn(
              buttonVariants({ variant: "secondary", className: "w-full" }),
              "transition-[transform,box-shadow] duration-200 active:scale-[0.99]"
            )}
          >
            Ir a la tienda
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
