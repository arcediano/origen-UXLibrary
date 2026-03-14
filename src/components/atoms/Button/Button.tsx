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
import { cn } from "@/lib/utils";

// ─── Variantes CVA ────────────────────────────────────────────────────────────

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-xl font-semibold transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-origen-pradera/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "w-full sm:w-auto"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-origen-bosque text-white",
          "hover:bg-hover-bosque",
          "border border-origen-pino"
        ),
        secondary: cn(
          "bg-origen-pradera text-origen-oscuro",
          "hover:bg-origen-hoja hover:text-white",
          "border border-origen-hoja"
        ),
        outline: cn(
          "bg-transparent text-origen-bosque",
          "border-2 border-origen-bosque",
          "hover:bg-origen-crema hover:border-origen-pradera"
        ),
        ghost: cn(
          "bg-transparent text-origen-bosque",
          "hover:bg-origen-crema"
        ),
        destructive: cn(
          "bg-red-600 text-white",
          "hover:bg-red-700",
          "border border-red-500"
        ),
      },
      size: {
        sm:      "h-9 px-4 text-sm gap-2 rounded-lg",
        md:      "h-10 px-5 text-sm gap-2.5 rounded-xl",
        lg:      "h-11 px-6 text-base gap-3 rounded-xl",
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
      children,
      type = "button",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      type={type}
      {...props}
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
