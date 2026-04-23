/**
 * @file StarRating.tsx
 * @description Componente de valoración con estrellas del Origen Design System.
 * Soporta modo interactivo (selección de 1-5 estrellas) y modo solo lectura.
 *
 * @example
 * // Solo lectura
 * <StarRating value={4.5} readOnly size="sm" />
 *
 * // Interactivo
 * <StarRating value={rating} onChange={setRating} size="lg" />
 */

"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── TIPOS ────────────────────────────────────────────────────────────────────

export type StarRatingSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface StarRatingProps {
  /** Valor actual (1-5). Acepta decimales en modo readOnly para medias. */
  value: number;
  /** Callback invocado al seleccionar una estrella (solo en modo interactivo). */
  onChange?: (value: number) => void;
  /** Si true, no se puede interactuar con el componente. */
  readOnly?: boolean;
  /** Tamaño de las estrellas. Por defecto "md". */
  size?: StarRatingSize;
  /** Número de estrellas totales. Por defecto 5. */
  count?: number;
  /** Mostrar el valor numérico junto a las estrellas. */
  showValue?: boolean;
  /** Mostrar el total de valoraciones (solo lectura). */
  totalReviews?: number;
  /** Clases CSS adicionales para el contenedor. */
  className?: string;
  /** Label de accesibilidad. Por defecto "Valoración". */
  label?: string;
}

// ─── TAMAÑOS ─────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<StarRatingSize, { icon: number; text: string; gap: string }> = {
  xs: { icon: 12, text: "text-xs", gap: "gap-0.5" },
  sm: { icon: 16, text: "text-sm", gap: "gap-1" },
  md: { icon: 20, text: "text-base", gap: "gap-1" },
  lg: { icon: 24, text: "text-lg", gap: "gap-1.5" },
  xl: { icon: 32, text: "text-xl", gap: "gap-2" },
};

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function StarRating({
  value,
  onChange,
  readOnly = false,
  size = "md",
  count = 5,
  showValue = false,
  totalReviews,
  className,
  label = "Valoración",
}: StarRatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const isInteractive = !readOnly && !!onChange;
  const { icon: iconSize, text: textClass, gap } = SIZE_MAP[size];

  const displayValue = hovered ?? value;

  // For read-only fractional stars, calculate fill percentage per star
  function getFill(index: number): "full" | "partial" | "empty" {
    const starValue = index + 1;
    if (displayValue >= starValue) return "full";
    if (displayValue > starValue - 1) return "partial";
    return "empty";
  }

  function partialPercent(index: number): number {
    const remainder = displayValue - index;
    return Math.max(0, Math.min(1, remainder)) * 100;
  }

  return (
    <div
      className={cn("inline-flex items-center", gap, className)}
      role={isInteractive ? "radiogroup" : "img"}
      aria-label={`${label}: ${value} de ${count} estrellas`}
    >
      {Array.from({ length: count }, (_, i) => {
        const fill = getFill(i);
        const starValue = i + 1;

        if (isInteractive) {
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={Math.round(value) === starValue}
              aria-label={`${starValue} estrella${starValue > 1 ? "s" : ""}`}
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "rounded transition-transform duration-150 focus:outline-none",
                "focus-visible:ring-2 focus-visible:ring-origen-pino focus-visible:ring-offset-1",
                "hover:scale-110 active:scale-95",
                (hovered !== null ? hovered >= starValue : value >= starValue)
                  ? "text-amber-400"
                  : "text-gray-200",
              )}
            >
              <Star
                size={iconSize}
                fill="currentColor"
                strokeWidth={0}
                aria-hidden="true"
              />
            </button>
          );
        }

        // Read-only: support partial fill via SVG clipPath
        const clipId = `star-clip-${i}-${Math.round(value * 10)}`;

        return (
          <span key={i} className="relative inline-block" aria-hidden="true">
            {fill === "partial" ? (
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id={clipId}>
                    <rect x="0" y="0" width={`${partialPercent(i)}%`} height="100%" />
                  </clipPath>
                </defs>
                {/* Empty star background */}
                <Star
                  size={iconSize}
                  fill="#e5e7eb"
                  strokeWidth={0}
                />
                {/* Filled portion */}
                <g clipPath={`url(#${clipId})`}>
                  <Star
                    size={iconSize}
                    fill="#fbbf24"
                    strokeWidth={0}
                  />
                </g>
              </svg>
            ) : (
              <Star
                size={iconSize}
                fill={fill === "full" ? "#fbbf24" : "#e5e7eb"}
                strokeWidth={0}
              />
            )}
          </span>
        );
      })}

      {(showValue || totalReviews !== undefined) && (
        <span className={cn("text-muted-foreground font-medium", textClass)}>
          {showValue && <span className="text-foreground">{value.toFixed(1)}</span>}
          {totalReviews !== undefined && (
            <span className="ml-1">({totalReviews})</span>
          )}
        </span>
      )}
    </div>
  );
}
