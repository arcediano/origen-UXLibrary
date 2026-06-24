"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  /** Si se omite, el ítem se renderiza como texto plano (ítem actual). */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** `default` para fondos claros; `hero` para superposición sobre imagen/overlay oscuro. */
  variant?: "default" | "hero";
  /** Componente de enlace. Por defecto `"a"`. Pasa `Link` de `next/link` en Next.js. */
  linkComponent?: React.ElementType;
  className?: string;
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const variantLink: Record<"default" | "hero", string> = {
  default: "text-text-subtle hover:text-text-primary transition-colors",
  hero:    "text-white/80 hover:text-white transition-colors",
};

const variantCurrent: Record<"default" | "hero", string> = {
  default: "text-text-primary font-medium",
  hero:    "text-white font-medium",
};

const variantSeparator: Record<"default" | "hero", string> = {
  default: "text-text-subtle",
  hero:    "text-white/50",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function Breadcrumb({
  items,
  variant = "default",
  linkComponent,
  className,
}: BreadcrumbProps) {
  const LinkEl = linkComponent ?? "a";

  return (
    <nav
      aria-label="Ruta de navegación"
      className={cn("flex items-center gap-1.5 text-xs flex-wrap", className)}
    >
      <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${i}`}>
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? variantCurrent[variant] : cn(variantLink[variant], "opacity-80")}
                  >
                    {item.label}
                  </span>
                ) : (
                  <LinkEl
                    href={item.href}
                    className={variantLink[variant]}
                  >
                    {item.label}
                  </LinkEl>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true">
                  <ChevronRight
                    size={11}
                    className={variantSeparator[variant]}
                  />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.displayName = "Breadcrumb";
