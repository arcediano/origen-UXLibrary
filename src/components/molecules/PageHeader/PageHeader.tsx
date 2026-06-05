/**
 * @file PageHeader.tsx
 * @description Cabecera de página interior reutilizable — Origen Design System.
 * Migrado desde origen-dashboard/src/app/dashboard/components/PageHeader.tsx
 * Nota: se eliminó la dependencia de next/navigation. Si se necesita navegación
 * automática (router.back()), proporciona la función `onBack` desde el componente padre.
 *
 * @example
 * // Con botón de volver gestionado externamente
 * <PageHeader
 *   title="Mis certificaciones"
 *   description="Gestiona tus documentos y certificados"
 *   showBackButton
 *   onBack={() => router.back()}
 *   actions={<Button size="sm">Añadir</Button>}
 * />
 *
 * // Solo título y descripción
 * <PageHeader title="Dashboard" description="Resumen de tu actividad" />
 */

"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface PageHeaderProps {
  /** Título principal de la página */
  title: string;
  /** Descripción secundaria opcional */
  description?: string;
  /** Nodo(s) React para acciones en el lado derecho (botones, etc.) */
  actions?: React.ReactNode;
  /** Muestra el botón de volver (solo en desktop ≥ lg) */
  showBackButton?: boolean;
  /**
   * Callback al pulsar el botón de volver.
   * Obligatorio cuando `showBackButton` es true.
   * Ejemplo: `onBack={() => router.back()}`
   */
  onBack?: () => void;
  /** Clase CSS adicional para el contenedor raíz */
  className?: string;
  /** Clase CSS adicional para el contenedor interior */
  containerClassName?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  description,
  actions,
  showBackButton = false,
  onBack,
  className,
  containerClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "container mx-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6",
          containerClassName
        )}
      >
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
            {showBackButton && (
              <button
                onClick={onBack}
                className="mt-0.5 hidden h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-alt text-text-subtle transition-colors hover:border-origen-pradera hover:bg-origen-pradera/5 hover:text-origen-pradera lg:inline-flex"
                aria-label="Volver"
                type="button"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="text-[22px] font-semibold leading-tight text-origen-bosque sm:text-[26px] lg:text-[32px]">
                {title}
              </h1>
              {description && (
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {description}
                </p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}

PageHeader.displayName = "PageHeader";
