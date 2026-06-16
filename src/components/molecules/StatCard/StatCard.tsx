/**
 * @file StatCard.tsx
 * @description Componente StatCard del Origen Design System.
 * Tarjeta KPI reutilizable con icono (gradiente), label, valor, tendencia y subtexto.
 * Diseño unificado con el dashboard principal — icono con gradiente CSS, tamaños
 * responsive aumentados y tendencia con `isPositive` explícito.
 *
 * @example
 * <StatCard
 *   label="Ingresos del mes"
 *   value="€4.280"
 *   icon={<TrendingUp />}
 *   trend={{ value: 12.4, isPositive: true, label: 'vs mes anterior' }}
 *   variant="pradera"
 * />
 */

"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface StatCardTrend {
  /** Porcentaje de cambio (valor absoluto o con signo) */
  value: number;
  /**
   * Si la tendencia es positiva. Si no se pasa, se deduce de `value > 0`.
   * Pasar explícitamente cuando el signo del valor no coincide con la dirección
   * positiva del negocio (p.ej. "devoluciones: -3%" es positivo).
   */
  isPositive?: boolean;
  /** Texto descriptivo junto al porcentaje */
  label?: string;
}

export interface StatCardProps {
  /** Texto identificador del KPI */
  label: string;
  /** Valor principal del KPI */
  value: string | number;
  /** Icono a mostrar (componente React, e.g. de lucide-react) */
  icon?: React.ReactNode;
  /** Tendencia respecto al período anterior */
  trend?: StatCardTrend;
  /** Texto secundario debajo del valor (ej: "últimos 30 días") */
  subtitle?: string;
  /** Paleta de color del token Origen */
  variant?: "pradera" | "hoja" | "bosque" | "arena" | "oscuro" | "neutral" | "mandarina" | "danger";
  /** Estado de carga — muestra skeletons */
  loading?: boolean;
  /** Clases adicionales */
  className?: string;
  /**
   * Clases adicionales para el valor principal. Útil para reducir el
   * tamaño de fuente cuando `value` es un texto largo en vez de un KPI numérico.
   */
  valueClassName?: string;
}

// ─── Variantes de color ───────────────────────────────────────────────────────
// Cada variante define el gradiente del contenedor del icono (icono siempre blanco)
// y el borde de hover. Fondo de la card: siempre bg-surface-alt.

const variantMap: Record<
  NonNullable<StatCardProps["variant"]>,
  { iconGrad: string; hoverBorder: string }
> = {
  pradera:   { iconGrad: "from-origen-pradera to-origen-hoja",              hoverBorder: "group-hover:border-origen-pradera/50" },
  hoja:      { iconGrad: "from-origen-hoja to-origen-pino",                 hoverBorder: "group-hover:border-origen-hoja/60" },
  bosque:    { iconGrad: "from-origen-pino to-origen-bosque",               hoverBorder: "group-hover:border-origen-bosque/50" },
  mandarina: { iconGrad: "from-origen-mandarina to-origen-mandarina/70",    hoverBorder: "group-hover:border-origen-mandarina/50" },
  arena:     { iconGrad: "from-origen-arena to-origen-arena/70",            hoverBorder: "group-hover:border-origen-arena/60" },
  neutral:   { iconGrad: "from-text-subtle to-text-secondary",              hoverBorder: "group-hover:border-gray-400" },
  oscuro:    { iconGrad: "from-origen-bosque to-origen-pino",               hoverBorder: "group-hover:border-origen-oscuro/40" },
  danger:    { iconGrad: "from-feedback-danger to-feedback-danger/70",      hoverBorder: "group-hover:border-feedback-danger/50" },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl sm:rounded-2xl border border-border bg-surface-alt",
        "p-3 sm:p-4 lg:p-5 shadow-subtle",
        className,
      )}
    >
      <div className="flex items-start gap-2 sm:gap-4">
        <div className="h-9 w-9 sm:h-11 sm:w-11 lg:h-14 lg:w-14 rounded-lg sm:rounded-xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 min-w-0 flex flex-col gap-2 pt-1">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-7 w-16 rounded bg-gray-200 sm:h-8 lg:h-9" />
        </div>
      </div>
    </div>
  );
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  icon,
  trend,
  subtitle,
  variant = "neutral",
  loading = false,
  className,
  valueClassName,
}: StatCardProps) {
  if (loading) return <StatCardSkeleton className={className} />;

  const { iconGrad, hoverBorder } = variantMap[variant];

  // Determinar positividad: usa `isPositive` explícito si viene; si no, deduce de value > 0
  const trendPositive = trend
    ? (trend.isPositive !== undefined ? trend.isPositive : trend.value > 0)
    : false;
  const trendNeutral = trend ? trend.value === 0 && trend.isPositive === undefined : false;
  const TrendIcon = trend
    ? (trendNeutral ? Minus : trendPositive ? TrendingUp : TrendingDown)
    : Minus;

  return (
    <div className="group relative h-full">
      <div
        className={cn(
          "relative bg-surface-alt rounded-xl sm:rounded-2xl",
          "p-3 sm:p-4 lg:p-5 border border-border",
          "shadow-subtle group-hover:shadow-origen",
          "transition-all duration-300 h-full flex flex-col",
          hoverBorder,
          className,
        )}
      >
        <div className="flex items-start gap-2 sm:gap-4 flex-1">
          {/* Icono con gradiente — tamaños responsive aumentados a lg:w-14/h-14 */}
          {icon && (
            <div
              className={cn(
                "w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14",
                "rounded-lg sm:rounded-xl bg-gradient-to-br",
                "flex items-center justify-center flex-shrink-0 shadow-subtle",
                iconGrad,
              )}
              aria-hidden
            >
              <span className="[&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5 lg:[&>svg]:h-7 lg:[&>svg]:w-7 [&>svg]:text-white">
                {icon}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0 flex flex-col">
            {/* Label */}
            <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-text-subtle mb-0.5 sm:mb-1 leading-tight truncate">
              {label}
            </p>

            {/* Valor principal — aumentado a lg:text-3xl */}
            <span
              className={cn(
                "text-xl sm:text-2xl lg:text-3xl font-bold text-origen-bosque tabular-nums leading-none",
                valueClassName,
              )}
            >
              {value}
            </span>

            {/* Subtítulo inline (ej: "128 reseñas") */}
            {subtitle && (
              <span className="text-[10px] sm:text-xs text-text-subtle mt-0.5 truncate">
                {subtitle}
              </span>
            )}

            {/* Tendencia — oculta en móvil para no saturar */}
            {trend && (
              <div className="hidden sm:flex items-center gap-2 mt-1.5 sm:mt-3">
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
                    trendNeutral
                      ? "bg-gray-50 text-gray-500 border-gray-200"
                      : trendPositive
                        ? "bg-origen-pastel text-origen-bosque border-origen-pradera/30"
                        : "bg-feedback-danger-subtle text-red-700 border-red-200",
                  )}
                  aria-label={`Tendencia: ${trend.value > 0 ? "+" : ""}${trend.value.toFixed(1)}%`}
                >
                  <TrendIcon className="h-3 w-3" aria-hidden />
                  <span>{trend.value > 0 ? "+" : ""}{trend.value.toFixed(1)}%</span>
                </div>
                {trend.label && (
                  <span className="text-xs text-text-subtle">{trend.label}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
