/**
 * @file SelectableCard.tsx
 * @description Tile seleccionable con icono, usado para seleccion multiple
 * de valores, certificaciones, alergenos, etc. Patron canonico de
 * /onboarding (ver manual de diseno, seccion 9).
 */

"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../../../lib/utils";

export type SelectableCardLayout = "compact" | "detailed";
export type SelectableCardTone = "brand" | "danger" | "warning";

export interface SelectableCardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  /** Icono mostrado en el recuadro (recomendado: lucide-react h-5 w-5) */
  icon: React.ReactNode;
  /** Etiqueta principal */
  label: string;
  /** Descripcion opcional, solo visible en layout `detailed` */
  description?: string;
  /**
   * Disposicion visual:
   * - `compact`: icono arriba + label centrado (grid), p. ej. Valores
   * - `detailed`: icono a la izquierda + titulo + descripcion en fila, p. ej. Certificaciones
   */
  layout?: SelectableCardLayout;
  /** Si la tarjeta esta seleccionada */
  selected?: boolean;
  /**
   * Color del estado seleccionado:
   * - `brand`: gradiente de marca (por defecto)
   * - `danger`: rojo, para alergenos obligatorios
   * - `warning`: ambar, para "puede contener"
   */
  tone?: SelectableCardTone;
  /** Callback al seleccionar/deseleccionar */
  onSelect?: () => void;
}

const toneSelectedBorder: Record<SelectableCardTone, string> = {
  brand: "border-origen-pradera bg-gradient-to-br from-origen-pradera/5 to-origen-hoja/5 shadow-md",
  danger: "border-feedback-danger bg-feedback-danger-subtle shadow-md",
  warning: "border-feedback-warning bg-feedback-warning-subtle shadow-md",
};

const toneIconSelected: Record<SelectableCardTone, string> = {
  brand: "bg-gradient-to-br from-origen-pradera to-origen-hoja text-white shadow-md",
  danger: "bg-feedback-danger text-white shadow-md",
  warning: "bg-feedback-warning text-white shadow-md",
};

const toneCheck: Record<SelectableCardTone, string> = {
  brand: "bg-origen-pradera",
  danger: "bg-feedback-danger",
  warning: "bg-feedback-warning",
};

const toneFocusRing: Record<SelectableCardTone, string> = {
  brand: "focus-visible:ring-origen-pradera/50",
  danger: "focus-visible:ring-feedback-danger/50",
  warning: "focus-visible:ring-feedback-warning/50",
};

const SelectableCard = React.forwardRef<HTMLButtonElement, SelectableCardProps>(
  (
    {
      className,
      icon,
      label,
      description,
      layout = "compact",
      selected = false,
      tone = "brand",
      onSelect,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented) onSelect?.();
    };

    if (layout === "detailed") {
      return (
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          disabled={disabled}
          aria-pressed={selected}
          className={cn(
            "relative flex items-start gap-3 rounded-xl border-2 p-3.5 text-left transition-all",
            "hover:shadow-md focus:outline-none focus-visible:ring-2",
            toneFocusRing[tone],
            "disabled:cursor-not-allowed disabled:opacity-50",
            selected
              ? toneSelectedBorder[tone]
              : "border-border-subtle bg-surface-alt hover:border-origen-pradera",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all",
              selected ? toneIconSelected[tone] : "bg-origen-crema text-origen-bosque"
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-origen-bosque">{label}</p>
            {description && <p className="text-xs text-text-subtle">{description}</p>}
          </div>
          {selected && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-origen-pradera" aria-hidden="true" />}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-pressed={selected}
        className={cn(
          "group relative rounded-xl border-2 bg-surface-alt p-2.5 transition-all",
          "hover:shadow-lg hover:scale-[1.02] focus:outline-none focus-visible:ring-2",
          toneFocusRing[tone],
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
          selected ? toneSelectedBorder[tone] : "border-border-subtle hover:border-origen-pradera",
          className
        )}
        {...props}
      >
        {selected && (
          <div className="absolute right-1.5 top-1.5">
            <div className={cn("flex h-4 w-4 items-center justify-center rounded-full", toneCheck[tone])}>
              <CheckCircle2 className="h-2.5 w-2.5 text-white" aria-hidden="true" />
            </div>
          </div>
        )}
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg transition-all",
              selected ? toneIconSelected[tone] : "bg-origen-crema text-origen-bosque group-hover:scale-110"
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
          <span className={cn("text-xs font-medium", selected ? "text-origen-bosque" : "text-foreground")}>
            {label}
          </span>
        </div>
      </button>
    );
  }
);

SelectableCard.displayName = "SelectableCard";

export { SelectableCard };
