/**
 * @file Button.tsx
 * @description Componente Button del Origen Design System.
 * Variantes: primary | secondary | outline | ghost | destructive
 *
 * @example
 * <Button variant="primary" size="md" loading>Guardar</Button>
 * <Button variant="outline" leftIcon={<PlusIcon />}>Añadir</Button>
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Variantes CVA ────────────────────────────────────────────────────────────

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-xl font-semibold transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-origen-pino",
    "disabled:pointer-events-none disabled:shadow-none",
    "active:scale-[0.98]",
    "w-full sm:w-auto shadow-subtle"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "border border-origen-pino/40",
          "bg-gradient-origen text-white !text-white",
          "hover:brightness-[1.03] hover:shadow-origen",
          "disabled:border-origen-bosque/60 disabled:bg-origen-bosque/80 disabled:text-white/85"
        ),
        secondary: cn(
          "border border-origen-pino/35",
          "bg-origen-pastel text-origen-bosque",
          "hover:bg-origen-pradera/35 hover:text-origen-oscuro",
          "disabled:border-origen-pino/30 disabled:bg-origen-pastel/90 disabled:text-origen-bosque/70"
        ),
        outline: cn(
          "border border-origen-pino/30 bg-surface-alt text-origen-bosque",
          "hover:border-origen-pradera/55 hover:bg-origen-pastel/70",
          "disabled:border-origen-pino/15 disabled:bg-white disabled:text-origen-bosque/70"
        ),
        ghost: cn(
          "bg-transparent text-origen-bosque shadow-none",
          "hover:bg-origen-pastel/60 hover:text-origen-pino",
          "focus-visible:bg-origen-pastel/40",
          "disabled:text-origen-bosque/70"
        ),
        destructive: cn(
          "border border-feedback-danger-text/30 bg-feedback-danger text-white",
          "hover:bg-feedback-danger-text",
          "disabled:border-feedback-danger-text/20 disabled:bg-feedback-danger/70 disabled:text-white/85"
        ),
      },
      size: {
        sm:      "h-10 px-4 gap-2 rounded-lg text-small",
        md:      "h-11 px-5 gap-2.5 rounded-xl text-small",
        lg:      "h-12 px-6 gap-3 rounded-xl text-body",
        icon:    "h-10 w-10 p-0 rounded-xl",
        "icon-sm": "h-8 w-8 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Muestra un spinner y deshabilita el botón */
  loading?: boolean;
  /** Texto mostrado durante el estado de carga */
  loadingText?: string;
  /** Icono posicionado a la izquierda del texto */
  leftIcon?: React.ReactNode;
  /** Icono posicionado a la derecha del texto */
  rightIcon?: React.ReactNode;
  /** Fuerza ancho completo en todos los breakpoints (sobreescribe el sm:w-auto de la base) */
  fullWidth?: boolean;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      loadingText = "Cargando...",
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      type = "button",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      {...props}
      className={cn(buttonVariants({ variant, size }), fullWidth && 'w-full sm:w-full', className)}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {leftIcon  && <span className="shrink-0" aria-hidden>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0" aria-hidden>{rightIcon}</span>}
        </>
      )}
    </button>
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
