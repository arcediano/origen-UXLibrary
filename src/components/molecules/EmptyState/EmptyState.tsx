/**
 * @file EmptyState.tsx
 * @description Componente EmptyState del Origen Design System.
 * Muestra un estado vacío con icono, título, descripción y una acción opcional.
 *
 * @example
 * <EmptyState
 *   icon={<ShoppingBag className="h-10 w-10" />}
 *   title="No tienes pedidos aún"
 *   description="Cuando realices tu primera compra, aparecerá aquí."
 *   action={{ label: 'Explorar productos', onClick: () => router.push('/productos') }}
 * />
 */

"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface EmptyStateProps {
  /** Icono SVG o componente React a mostrar arriba */
  icon?: React.ReactNode;
  /** Título principal */
  title: string;
  /** Texto descriptivo debajo del título */
  description?: string;
  /** Acción principal (botón o enlace) */
  action?: EmptyStateAction;
  /** Acción secundaria (enlace discreto) */
  secondaryAction?: EmptyStateAction;
  /** Tamaño del contenedor */
  size?: "sm" | "md" | "lg";
  /** Clases adicionales */
  className?: string;
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

const sizeMap = {
  sm: {
    wrapper: "py-8 px-4",
    iconWrapper: "h-12 w-12 rounded-xl",
    title: "text-sm font-semibold",
    description: "text-xs",
  },
  md: {
    wrapper: "py-12 px-6",
    iconWrapper: "h-16 w-16 rounded-2xl",
    title: "text-base font-semibold",
    description: "text-sm",
  },
  lg: {
    wrapper: "py-16 px-8",
    iconWrapper: "h-20 w-20 rounded-2xl",
    title: "text-lg font-semibold",
    description: "text-sm",
  },
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = "md",
  className,
}: EmptyStateProps) {
  const s = sizeMap[size];

  function renderAction(a: EmptyStateAction, primary: boolean) {
    const base = primary
      ? cn(
          "inline-flex items-center justify-center rounded-xl px-5 h-11 text-small font-semibold",
          "bg-gradient-origen text-white border border-origen-pino/40",
          "hover:brightness-[1.03] transition-all duration-200 shadow-subtle",
        )
      : "text-sm text-origen-bosque/70 hover:text-origen-bosque underline underline-offset-2 transition-colors";

    if (a.href) {
      return (
        <a key={a.label} href={a.href} className={base}>
          {a.label}
        </a>
      );
    }
    return (
      <button key={a.label} type="button" onClick={a.onClick} className={base}>
        {a.label}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        s.wrapper,
        className,
      )}
      role="status"
      aria-label={title}
    >
      {/* Icono */}
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center mb-4",
            "bg-origen-pastel/60 text-origen-bosque/50",
            s.iconWrapper,
          )}
          aria-hidden
        >
          {icon}
        </div>
      )}

      {/* Textos */}
      <p className={cn("text-origen-oscuro mb-1", s.title)}>{title}</p>
      {description && (
        <p className={cn("text-text-subtle max-w-xs", s.description)}>{description}</p>
      )}

      {/* Acciones */}
      {(action || secondaryAction) && (
        <div className="flex flex-col items-center gap-3 mt-5">
          {action && renderAction(action, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </div>
      )}
    </div>
  );
}
