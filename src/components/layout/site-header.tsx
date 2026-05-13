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

function LogoMonogram() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 outline-none transition-opacity duration-500 ease-out hover:opacity-80 focus-visible:ring-1 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className="flex size-8 items-center justify-center border border-foreground/15 bg-transparent transition-[border-color] duration-500 group-hover:border-foreground/30"
        aria-hidden
      >
        <span className="font-heading text-[0.65rem] font-normal tracking-[0.12em] text-foreground">
          A
        </span>
      </span>
      <span className="hidden font-heading text-sm font-normal tracking-[0.28em] text-foreground sm:inline">
        {siteConfig.name}
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
    base === "/"
      ? pathname === "/"
      : pathname === base || pathname.startsWith(`${base}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ease-out",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
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
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        "fixed inset-x-0 top-0 z-50 border-b transition-[border-color,background-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-border/25 bg-background/72 backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.08] dark:bg-background/65"
          : "border-transparent bg-transparent",
        className
      )}
    >
      <div className="mx-auto flex h-11 max-w-[var(--altu-container,80rem)] items-center justify-between gap-6 px-5 sm:h-12 sm:px-8 lg:px-12">
        <LogoMonogram />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10"
          aria-label="Main"
        >
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0">
          <ThemeToggle />
          <CartDrawer className="size-9" />
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
