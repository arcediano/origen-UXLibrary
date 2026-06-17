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

import { ArrowLeft, HelpCircle } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface PageHeaderProps {
  /** Título principal de la página */
  title: string;
  /** Descripción secundaria opcional */
  description?: string;
  /** Nodo(s) React para acciones en el lado derecho (botones, etc.) */
  actions?: React.ReactNode;
  /** Muestra el botón de volver (visible en todos los tamaños de pantalla) */
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
  /** Icono del badge superior (componente lucide-react) */
  badgeIcon?: React.ComponentType<{ className?: string }>;
  /** Texto del badge superior, junto al icono */
  badgeText?: string;
  /**
   * Texto corto del tooltip de ayuda (junto al título).
   * Si se proporciona junto con `tooltipDetailed`, se muestra un icono de
   * información que revela `tooltipDetailed` en hover/focus.
   */
  tooltip?: string;
  /** Texto detallado del tooltip (contenido del tooltip nativo) */
  tooltipDetailed?: string;
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
  badgeIcon: BadgeIcon,
  badgeText,
  tooltip,
  tooltipDetailed,
}: PageHeaderProps) {
  const tooltipContent = tooltipDetailed ?? tooltip;
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
                className="mt-0.5 hidden lg:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-alt text-text-subtle transition-colors hover:border-origen-pradera hover:bg-origen-pradera/5 hover:text-origen-pradera"
                aria-label="Volver"
                type="button"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            <div className="min-w-0 flex-1">
              {(BadgeIcon || badgeText) && (
                <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-origen-pastel/60 px-3 py-1 text-xs font-semibold text-origen-bosque">
                  {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 text-origen-pradera" />}
                  {badgeText}
                </span>
              )}
              <div className="flex items-center gap-2">
                <h1 className="text-[22px] font-semibold leading-tight text-origen-bosque sm:text-[26px] lg:text-[32px]">
                  {title}
                </h1>
                {tooltipContent && (
                  <span title={tooltipContent} aria-label={tooltipContent} className="inline-flex shrink-0">
                    <HelpCircle className="h-4 w-4 text-text-subtle" />
                  </span>
                )}
              </div>
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
