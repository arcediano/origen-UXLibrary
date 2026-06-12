/**
 * @file ToggleGroup.tsx
 * @description Componente Toggle Group - grupo de botones toggleables
 */

"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

interface ToggleGroupContextValue {
  value: string[];
  onValueChange: (value: string) => void;
  type: "single" | "multiple";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "segmented" | "pill";
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | undefined>(
  undefined
);

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  /**
   * - `default` / `outline`: grupo de chips/botones independientes.
   * - `segmented`: fila de N columnas de igual ancho con borde compartido
   *   (control segmentado), activo en `bg-origen-pradera text-white`. Util
   *   para selectores de 3 opciones tipo "tipo de zona" (ver /onboarding,
   *   Paso 4 - Capacidad).
   * - `pill`: chips totalmente redondeados, activo en color de marca con
   *   texto blanco, inactivo con borde de marca. Util para listas cortas
   *   tipo "meses de disponibilidad" (ver /onboarding, Paso 2 - Productos).
   */
  variant?: "default" | "outline" | "segmented" | "pill";
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      value: controlledValue,
      onValueChange,
      type = "single",
      defaultValue = type === "single" ? "" : [],
      disabled,
      orientation = "horizontal",
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState<string | string[]>(
      controlledValue ?? defaultValue
    );

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : value;

    const handleValueChange = (newValue: string) => {
      let updatedValue: string | string[];

      if (type === "single") {
        updatedValue = currentValue === newValue ? "" : newValue;
      } else {
        const valueArray = Array.isArray(currentValue) ? currentValue : [];
        updatedValue = valueArray.includes(newValue)
          ? valueArray.filter((v) => v !== newValue)
          : [...valueArray, newValue];
      }

      if (!isControlled) {
        setValue(updatedValue);
      }
      onValueChange?.(updatedValue);
    };

    const contextValue: ToggleGroupContextValue = {
      value: Array.isArray(currentValue) ? currentValue : [currentValue].filter(Boolean),
      onValueChange: handleValueChange,
      type,
      orientation,
      size,
      variant,
    };

    const isSegmented = variant === "segmented";

    const orientationClass = isSegmented
      ? "grid w-full overflow-hidden rounded-xl border border-border-subtle"
      : orientation === "vertical"
        ? "flex flex-col"
        : "flex flex-row flex-wrap";

    const childCount = React.Children.count(props.children);

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          {...props}
          role="group"
          style={isSegmented ? { gridTemplateColumns: `repeat(${Math.max(childCount, 1)}, minmax(0, 1fr))` } : undefined}
          className={cn(isSegmented ? "gap-0" : "inline-flex gap-1", orientationClass, className)}
        />
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
      variant: {
        default:
          "bg-origen-pradera/15 text-origen-bosque hover:bg-origen-pradera/25 data-[state=on]:bg-origen-pradera data-[state=on]:text-white",
        outline:
          "border border-origen-pradera/30 text-origen-bosque hover:border-origen-pradera/60 data-[state=on]:border-origen-pradera data-[state=on]:bg-origen-pradera/10",
        /** Fila segmentada de N columnas, sin radio individual ni gap, separadas por borde compartido */
        segmented:
          "w-full rounded-none border-0 border-l border-border-subtle first:border-l-0 bg-surface-alt text-text-subtle hover:bg-origen-crema/40 hover:text-origen-bosque data-[state=on]:bg-origen-pradera data-[state=on]:text-white",
        /** Chip totalmente redondeado: activo en color de marca, inactivo con borde de marca */
        pill:
          "rounded-full border border-origen-pradera/40 text-origen-bosque hover:border-origen-pradera data-[state=on]:border-origen-pradera data-[state=on]:bg-origen-pradera data-[state=on]:text-white",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "segmented" | "pill";
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, value, size, variant, onClick, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  }

  const isPressed =
    context.type === "single"
      ? context.value[0] === value
      : context.value.includes(value);

  return (
    <button
      ref={ref}
      {...props}
      type="button"
      aria-pressed={isPressed}
      data-state={isPressed ? "on" : "off"}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || props.disabled) return;
        context.onValueChange(value);
      }}
      className={cn(
        toggleGroupItemVariants({
          size: size ?? context.size,
          variant: variant ?? context.variant,
        }),
        className
      )}
    />
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps, ToggleGroupItemProps };
