/**
 * @file Label.tsx
 * @description Componente Label del Origen Design System.
 * Implementación nativa con soporte para campo requerido,
 * opcional y tooltip informativo.
 *
 * @example
 * <Label htmlFor="email" required>Correo electrónico</Label>
 * <Label htmlFor="bio" optional tooltip="Máximo 200 caracteres">Descripción</Label>
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Variantes CVA ────────────────────────────────────────────────────────────

const labelVariants = cva(
  "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-origen-bosque",
        error:   "text-red-600",
        success: "text-origen-hoja",
        muted:   "font-normal text-text-subtle",
      },
      size: {
        sm:      "text-micro",
        default: "text-small font-semibold",
        lg:      "text-body font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /** Muestra un asterisco rojo indicando campo obligatorio */
  required?: boolean;
  /** Muestra "(opcional)" en gris */
  optional?: boolean;
  /** Tooltip informativo mostrado al hacer hover */
  tooltip?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const Label = React.forwardRef<
  HTMLLabelElement,
  LabelProps
>(({ className, variant, size, required, optional, tooltip, children, ...props }, ref) => (
  <div className="flex items-center gap-1.5">
    <label
      ref={ref}
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-1 inline-block" aria-label="campo requerido">
          *
        </span>
      )}
      {optional && (
        <span className="ml-1 text-micro font-normal text-text-subtle">(opcional)</span>
      )}
    </label>

    {tooltip && (
      <div className="group relative inline-flex">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full text-text-subtle transition-colors hover:text-origen-pradera focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-1"
          aria-label="información adicional"
        >
          <Info className="h-3.5 w-3.5 cursor-help" aria-hidden="true" />
        </button>
        <div
          className={cn(
            "absolute left-0 top-6 z-50 hidden group-hover:block group-focus-within:block",
            "w-48 rounded-xl bg-origen-oscuro p-2.5 text-micro text-white",
            "shadow-origen-lg"
          )}
          role="tooltip"
        >
          {tooltip}
          <div className="absolute -top-1 left-2 w-1.5 h-1.5 bg-origen-oscuro rotate-45" />
        </div>
      </div>
    )}
  </div>
));

Label.displayName = "Label";

export { Label, labelVariants };
