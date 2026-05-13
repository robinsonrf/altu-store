"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { NavbarMobileMenu } from "@/components/layout/navbar-mobile-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
};

function pathnameOnly(href: string) {
  try {
    return new URL(href, "https://placeholder.local").pathname;
  } catch {
    return href.split("?")[0] ?? href;
  }
}

function LogoPlaceholder() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 outline-none transition-[opacity,transform] duration-300 ease-out hover:opacity-90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`${siteConfig.name} — inicio`}
    >
      <span
        className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-muted/40 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover:border-border group-hover:shadow-md dark:border-white/10 dark:bg-muted/20"
        aria-hidden
      >
        <span className="text-[0.55rem] font-semibold tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
          A
        </span>
      </span>
      <span className="hidden min-[420px]:flex flex-col leading-none">
        <span className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors duration-200 sm:text-lg">
          {siteConfig.name}
        </span>
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {siteConfig.domain}
        </span>
      </span>
    </Link>
  );
}

function NavLink({
  href,
  children,
  className,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const base = pathnameOnly(href);
  const active =
    base === "/" ? pathname === "/" : pathname === base;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative py-2 text-[0.8125rem] font-medium tracking-[0.06em] transition-colors duration-200 ease-out",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out",
        active && "after:scale-x-100",
        !active && "hover:after:scale-x-100",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SiteHeader({ className }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setMobileOpen((wasOpen) => (wasOpen ? false : wasOpen));
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[border-color,box-shadow,background-color] duration-300 ease-out",
        scrolled
          ? "border-border/70 bg-background/88 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-background/80 dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "border-transparent bg-background/55 backdrop-blur-md dark:bg-background/40",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:gap-8 lg:px-10">
        <LogoPlaceholder />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-9"
          aria-label="Principal"
        >
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <ThemeToggle />
          <CartDrawer />
          <NavbarMobileMenu
            items={mainNav}
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          />
        </div>
      </div>
    </header>
  );
}
