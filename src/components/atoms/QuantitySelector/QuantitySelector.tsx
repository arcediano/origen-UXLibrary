"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../Button";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  /** Valor mínimo permitido. @default 1 */
  min?: number;
  /** Valor máximo permitido. Sin límite si no se especifica. */
  max?: number;
  disabled?: boolean;
  className?: string;
  /**
   * Nombre del artículo cuya cantidad se edita. Con él los botones se anuncian como
   * «Reducir cantidad de {itemLabel}» / «Aumentar cantidad de {itemLabel}»: imprescindible cuando
   * hay varios selectores en la misma pantalla (carrito).
   */
  itemLabel?: string;
  /**
   * `md` (por defecto): botones de 44 px, objetivo táctil recomendado.
   * `sm`: botones de 36 px para filas densas en escritorio; sigue por encima del mínimo de
   * 24 px de WCAG 2.2 (2.5.8). En pantallas táctiles usar `md`.
   * @default "md"
   */
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  md: "min-h-[44px] min-w-[44px]",
  sm: "min-h-9 min-w-9",
} as const;

// ─── Componente ───────────────────────────────────────────────────────────────

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  className,
  itemLabel,
  size = "md",
}: QuantitySelectorProps) {
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;
  const suffix = itemLabel ? ` de ${itemLabel}` : "";

  return (
    <div
      className={cn(
        "flex items-center rounded-xl border border-border-subtle overflow-hidden",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(SIZE_CLASSES[size], "rounded-none")}
        onClick={() => onChange(value - 1)}
        disabled={disabled || !canDecrement}
        aria-label={`Reducir cantidad${suffix}`}
        type="button"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </Button>

      <span
        className="min-w-10 text-center text-sm font-semibold tabular-nums px-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className={cn(SIZE_CLASSES[size], "rounded-none")}
        onClick={() => onChange(value + 1)}
        disabled={disabled || !canIncrement}
        aria-label={`Aumentar cantidad${suffix}`}
        type="button"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

QuantitySelector.displayName = "QuantitySelector";
