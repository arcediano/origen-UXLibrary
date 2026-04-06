/**
 * @file ToggleGroup.tsx
 * @description Componente Toggle Group - grupo de botones toggleables
 */

"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface ToggleGroupContextValue {
  value: string[];
  onValueChange: (value: string) => void;
  type: "single" | "multiple";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
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
  variant?: "default" | "outline";
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

    const orientationClass =
      orientation === "vertical"
        ? "flex flex-col"
        : "flex flex-row flex-wrap";

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          {...props}
          role="group"
          className={cn("inline-flex gap-1", orientationClass, className)}
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
          "bg-origin-pradera/15 text-origin-bosque hover:bg-origin-pradera/25 data-[state=on]:bg-origin-pradera data-[state=on]:text-white",
        outline:
          "border border-origin-pradera/30 text-origin-bosque hover:border-origin-pradera/60 data-[state=on]:border-origin-pradera data-[state=on]:bg-origin-pradera/10",
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
  variant?: "default" | "outline";
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
