import Link from "next/link";

import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-100 transition-colors duration-300 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="font-heading text-xl font-semibold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-neutral-400">
              {siteConfig.description}
            </p>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:text-white"
            >
              <svg
                className="size-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.2A2.4 2.4 0 1 1 14.4 12 2.41 2.41 0 0 1 12 14.4Zm4.8-7.44a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12ZM12 2.16c2.67 0 3 .12 4.05.17 2.2.1 3.57 1.42 3.67 3.67.05 1.05.17 1.38.17 4.05s-.12 3-.17 4.05c-.1 2.25-1.47 3.57-3.67 3.67-1.05.05-1.38.17-4.05.17s-3-.12-4.05-.17c-2.23-.1-3.57-1.42-3.67-3.67-.05-1.05-.17-1.38-.17-4.05s.12-3 .17-4.05c.1-2.25 1.42-3.57 3.67-3.67 1.05-.05 1.38-.17 4.05-.17Zm8.1 14.82c-.17 2.46-1.38 3.66-3.84 3.84-1.49.08-3.12.11-4.26.11s-2.77-.03-4.26-.11c-2.46-.18-3.67-1.38-3.84-3.84-.08-1.49-.11-3.12-.11-4.26s.03-2.77.11-4.26c.17-2.46 1.38-3.66 3.84-3.84 1.49-.08 3.12-.11 4.26-.11s2.77.03 4.26.11c2.46.18 3.67 1.38 3.84 3.84.08 1.49.11 3.12.11 4.26s-.03 2.77-.11 4.26Z" />
              </svg>
              Instagram
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            {footerNav.map((section) => (
              <div key={section.title}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-10 bg-white/10 lg:my-12" />

        <div className="flex flex-col gap-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {siteConfig.domain}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="transition-colors duration-200 hover:text-neutral-300"
            >
              {siteConfig.contact.email}
            </a>
            <span className="hidden text-neutral-700 sm:inline" aria-hidden>
              |
            </span>
            <span className="text-neutral-600">
              Envíos a todo Chile · pagos seguros
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
