/**
 * @file RadioGroup.tsx
 * @description Radio Group premium con diseño orgánico - 100% responsive
 */

"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  variant?: "default" | "organic" | "minimal";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

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
      organic: "bg-origin-crema/50 p-3 rounded-xl",
      minimal: "",
    };

    const orientationClasses = {
      horizontal: "flex flex-row flex-wrap gap-4 sm:gap-6",
      vertical: "flex flex-col gap-3",
    };

    return (
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
      size = "md",
      label,
      description,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;

    const variantClasses = {
      default: cn(
        "border-origin-pradera/50 text-origin-pradera",
        "hover:border-origin-hoja hover:bg-origin-crema/30",
        "data-[state=checked]:border-origin-pradera data-[state=checked]:text-origin-pradera",
        error && "border-red-500 data-[state=checked]:border-red-500"
      ),
      organic: cn(
        "border-origin-hoja/40 text-origin-hoja",
        "hover:border-origin-hoja hover:bg-origin-pastel/30",
        "data-[state=checked]:border-origin-hoja data-[state=checked]:text-origin-hoja",
        error && "border-red-500 data-[state=checked]:border-red-500"
      ),
      forest: cn(
        "border-origin-bosque/30 text-origin-bosque",
        "hover:border-origin-bosque hover:bg-origin-bosque/5",
        "data-[state=checked]:border-origin-bosque data-[state=checked]:text-origin-bosque",
        error && "border-red-500 data-[state=checked]:border-red-500"
      ),
      accent: cn(
        "border-origin-flor/40 text-origin-flor",
        "hover:border-origin-flor hover:bg-origin-flor/5",
        "data-[state=checked]:border-origin-flor data-[state=checked]:text-origin-flor",
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
            "aspect-square rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            sizeClasses[size],
            variantClasses[variant],
            className
          )}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className={cn("fill-current", sizeClasses[size])} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && (
          <label
            htmlFor={radioId}
            className="cursor-pointer text-sm font-medium text-origin-oscuro"
          >
            {label}
            {description && (
              <p className="text-xs text-origin-oscuro/60">{description}</p>
            )}
          </label>
        )}
      </div>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
