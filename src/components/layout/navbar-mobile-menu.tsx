"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

import type { NavItem } from "@/config/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
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
          "md:hidden size-9 rounded-none text-muted-foreground transition-opacity duration-500 hover:bg-transparent hover:opacity-70"
        )}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className="relative flex size-5 items-center justify-center">
          <Menu
            className={cn(
              "absolute size-5 transition-[opacity,transform] duration-700 ease-out",
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )}
          />
          <X
            className={cn(
              "absolute size-5 transition-[opacity,transform] duration-700 ease-out",
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )}
          />
        </span>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "gap-0 border-0 bg-background/97 p-0 shadow-none backdrop-blur-2xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[side=right]:!inset-x-0 data-[side=right]:!left-0 data-[side=right]:!right-0 data-[side=right]:h-[100dvh] data-[side=right]:!w-screen data-[side=right]:!max-w-none sm:data-[side=right]:!max-w-none",
          "data-[side=right]:data-ending-style:!translate-x-0 data-[side=right]:data-starting-style:!translate-x-0"
        )}
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav
          className="flex min-h-[100dvh] flex-col justify-center px-8 py-16 sm:px-14"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-8 sm:gap-10">
            {items.map((item, i) => (
              <li
                key={item.href}
                className="opacity-0 [animation:nav-drawer-item_0.85s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100"
                style={{ animationDelay: `${100 + i * 70}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="block font-heading text-[clamp(1.75rem,8vw,3rem)] font-normal tracking-[-0.02em] text-foreground transition-opacity duration-500 hover:opacity-55"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 font-mono text-[0.625rem] font-medium uppercase tracking-[0.28em] text-muted-foreground transition-opacity duration-500 hover:opacity-70"
        >
          Close
        </button>
      </SheetContent>
    </Sheet>
  );
}
