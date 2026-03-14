/**
 * @file Label.tsx
 * @description Componente Label del Origen Design System.
 * Construido sobre @radix-ui/react-label con soporte para campo
 * requerido, opcional y tooltip informativo.
 *
 * @example
 * <Label htmlFor="email" required>Correo electrónico</Label>
 * <Label htmlFor="bio" optional tooltip="Máximo 200 caracteres">Descripción</Label>
 */

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Variantes CVA ────────────────────────────────────────────────────────────

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-origen-bosque",
        error:   "text-red-600",
        success: "text-green-600",
        muted:   "text-gray-500 font-normal",
      },
      size: {
        sm:      "text-xs",
        default: "text-sm",
        lg:      "text-base",
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
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
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
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, required, optional, tooltip, children, ...props }, ref) => (
  <div className="flex items-center gap-1.5">
    <LabelPrimitive.Root
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
        <span className="text-gray-400 ml-1 text-[10px] font-normal">(opcional)</span>
      )}
    </LabelPrimitive.Root>

    {tooltip && (
      <div className="group relative inline-flex">
        <Info
          className="h-3.5 w-3.5 text-gray-400 cursor-help"
          aria-label="información adicional"
        />
        <div
          className={cn(
            "absolute left-0 top-6 z-50 hidden group-hover:block",
            "w-48 p-2 rounded-lg bg-origen-oscuro text-white text-xs",
            "shadow-lg"
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

Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
