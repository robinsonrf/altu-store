import Link from "next/link";

import { footerColumns } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="grid gap-16 sm:grid-cols-3 sm:gap-12 lg:gap-16">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-8 space-y-4">
                {col.items.map((item) => (
                  <li key={`${col.title}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/75 transition-opacity duration-500 hover:opacity-55"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-border/35 pt-12 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-heading text-sm font-normal tracking-[0.12em] text-foreground/90">
            {siteConfig.name}
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em]">
            © {year} · {siteConfig.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}
