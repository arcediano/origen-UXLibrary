"use client";

import * as React from "react";
import { Check, Loader2, X } from "lucide-react";
import { cn } from "../../../lib/utils";

type ToggleVariant = "leaf" | "seed" | "forest" | "accent";
type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "size"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  toggleSize?: ToggleSize;
  size?: ToggleSize;
  loading?: boolean;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      pressed,
      defaultPressed,
      onPressedChange,
      variant = "leaf",
      toggleSize,
      size,
      disabled,
      loading = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const fallbackDefaultPressed = defaultPressed ?? defaultChecked;
    const controlledPressed = pressed ?? checked;
    const [internalPressed, setInternalPressed] = React.useState<boolean>(fallbackDefaultPressed);

    const isControlled = controlledPressed !== undefined;
    const isPressed = isControlled ? controlledPressed : internalPressed;

    const resolvedSize = toggleSize ?? size ?? "md";

    const variantClasses: Record<ToggleVariant, { off: string; on: string; iconOn: string; iconOff: string }> = {
      leaf: {
        off: "border-origen-pradera/30 bg-origen-crema text-origen-bosque hover:bg-origen-pastel/50",
        on: "border-origen-pradera bg-origen-pradera text-white",
        iconOn: "text-white",
        iconOff: "text-origen-pradera",
      },
      seed: {
        off: "border-origen-pradera/30 bg-origen-crema text-origen-bosque hover:bg-origen-crema/80",
        on: "border-origen-pradera bg-origen-pradera text-white",
        iconOn: "text-white",
        iconOff: "text-origen-pradera",
      },
      forest: {
        off: "border-origen-bosque/25 bg-origen-bosque/10 text-origen-bosque hover:bg-origen-bosque/15",
        on: "border-origen-bosque bg-origen-bosque text-white",
        iconOn: "text-white",
        iconOff: "text-origen-bosque",
      },
      accent: {
        off: "border-origen-pradera/30 bg-white text-origen-bosque hover:bg-origen-pradera/10",
        on: "border-origen-pradera bg-origen-pradera text-white",
        iconOn: "text-white",
        iconOff: "text-origen-pradera",
      },
    };

    const sizeClasses: Record<ToggleSize, string> = {
      sm: "min-h-[44px] px-3 text-xs",
      md: "min-h-[44px] px-4 text-sm",
      lg: "min-h-[44px] px-5 text-base",
    };

    const classes = variantClasses[variant];

    const setPressedState = (next: boolean) => {
      if (!isControlled) setInternalPressed(next);
      onPressedChange?.(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        disabled={disabled || loading}
        data-state={isPressed ? "on" : "off"}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[resolvedSize],
          isPressed ? classes.on : classes.off,
          className
        )}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || disabled || loading) return;
          setPressedState(!isPressed);
        }}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : isPressed ? (
          <Check className={cn("h-4 w-4", classes.iconOn)} aria-hidden="true" />
        ) : (
          <X className={cn("h-4 w-4", classes.iconOff)} aria-hidden="true" />
        )}

        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };