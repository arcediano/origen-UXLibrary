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
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

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
        className="min-h-[44px] min-w-[44px] rounded-none"
        onClick={() => onChange(value - 1)}
        disabled={disabled || !canDecrement}
        aria-label="Reducir cantidad"
        type="button"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </Button>

      <span
        className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums px-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="min-h-[44px] min-w-[44px] rounded-none"
        onClick={() => onChange(value + 1)}
        disabled={disabled || !canIncrement}
        aria-label="Aumentar cantidad"
        type="button"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

QuantitySelector.displayName = "QuantitySelector";
