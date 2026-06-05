/**
 * @file Spinner.tsx
 * @description Componente de carga (spinner SVG) — Origen Design System.
 * Migrado desde origen-dashboard/src/components/shared/loading/loading-spinner.tsx
 *
 * @example
 * <Spinner size="md" variant="primary" />
 * <Spinner size="sm" variant="white" label="Enviando formulario..." />
 */

"use client";

import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "default" | "primary" | "secondary" | "white";

export interface SpinnerProps {
  /** Tamaño del spinner */
  size?: SpinnerSize;
  /** Variante de color */
  variant?: SpinnerVariant;
  /** Clase CSS adicional */
  className?: string;
  /** Texto alternativo para accesibilidad */
  label?: string;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const spinnerSizes: Record<SpinnerSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const spinnerColors: Record<SpinnerVariant, string> = {
  default:   "text-text-subtle",
  primary:   "text-origen-pradera",
  secondary: "text-origen-hoja",
  white:     "text-white",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function Spinner({
  size = "md",
  variant = "primary",
  className,
  label = "Cargando...",
}: SpinnerProps) {
  return (
    <svg
      className={cn(
        "animate-spin",
        spinnerSizes[size],
        spinnerColors[variant],
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      aria-label={label}
      role="status"
    >
      {/* Pista semitransparente */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.15"
      />
      {/* Arco activo */}
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

Spinner.displayName = "Spinner";

/** Alias retrocompatible */
export const LoadingSpinner = Spinner;
export type LoadingSpinnerProps = SpinnerProps;
