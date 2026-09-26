/**
 * @file RadioGroup.tsx
 * @description Radio Group premium con diseño orgánico - 100% responsive
 */

"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  variant?: "default" | "organic" | "minimal";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

interface RadioGroupContextValue {
  size: "sm" | "md" | "lg";
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(
  undefined
);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      orientation = "vertical",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "",
      organic: "bg-origen-crema/50 p-3 rounded-xl",
      minimal: "",
    };

    const orientationClasses = {
      horizontal: "flex flex-row flex-wrap gap-4 sm:gap-6",
      vertical: "flex flex-col gap-3",
    };

    return (
      <RadioGroupContext.Provider value={{ size }}>
        <RadioGroupPrimitive.Root
          {...props}
          ref={ref}
          role="radiogroup"
          className={cn(
            orientationClasses[orientation],
            variantClasses[variant],
            className
          )}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  variant?: "default" | "organic" | "forest" | "accent";
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
  error?: boolean;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    {
      className,
      variant = "default",
      size,
      label,
      description,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(RadioGroupContext);
    const resolvedSize = size ?? context?.size ?? "md";
    const generatedId = React.useId();
    const radioId = id || generatedId;

    const variantClasses = {
      default: cn(
        "border-origen-pradera/50 text-origen-pradera",
        "hover:border-origen-hoja hover:bg-origen-crema/30",
        "data-[state=checked]:border-origen-pradera data-[state=checked]:text-origen-pradera",
        error && "border-red-500 data-[state=checked]:border-red-500"
      ),
      organic: cn(
        "border-origen-hoja/40 text-origen-hoja",
        "hover:border-origen-hoja hover:bg-origen-pastel/30",
        "data-[state=checked]:border-origen-hoja data-[state=checked]:text-origen-hoja",
        error && "border-red-500 data-[state=checked]:border-red-500"
      ),
      forest: cn(
        "border-origen-bosque/30 text-origen-bosque",
        "hover:border-origen-bosque hover:bg-origen-bosque/5",
        "data-[state=checked]:border-origen-bosque data-[state=checked]:text-origen-bosque",
        error && "border-red-500 data-[state=checked]:border-red-500"
      ),
      accent: cn(
        "border-origen-arena/40 text-origen-arena",
        "hover:border-origen-arena hover:bg-origen-arena/5",
        "data-[state=checked]:border-origen-arena data-[state=checked]:text-origen-arena",
        error && "border-red-500 data-[state=checked]:border-red-500"
      ),
    };

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    return (
      <div className="flex items-center gap-3">
        <RadioGroupPrimitive.Item
          ref={ref}
          {...props}
          id={radioId}
          role="radio"
          className={cn(
            "aspect-square rounded-full border-2 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2",
            sizeClasses[resolvedSize],
            variantClasses[variant],
            className
          )}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className={cn("fill-current", sizeClasses[resolvedSize])} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && (
          <label
            htmlFor={radioId}
            className="cursor-pointer text-sm font-medium text-origen-oscuro"
          >
            {label}
            {description && (
              <p className="text-xs text-origen-oscuro/60">{description}</p>
            )}
          </label>
        )}
      </div>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
