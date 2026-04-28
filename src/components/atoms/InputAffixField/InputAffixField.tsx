"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface InputAffixFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  affixLeft?: React.ReactNode;
  affixRight?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 text-small",
  md: "h-11 text-small",
  lg: "h-12 text-body",
};

const InputAffixField = React.forwardRef<HTMLInputElement, InputAffixFieldProps>(
  (
    {
      className,
      id,
      label,
      error,
      helperText,
      affixLeft,
      affixRight,
      inputSize = "md",
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-small font-semibold text-origen-bosque",
              disabled && "opacity-50",
              error && "text-red-600"
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border bg-surface-alt transition-all",
            "border-border-subtle hover:border-origen-pradera/55 focus-within:border-origen-pradera",
            "focus-within:ring-2 focus-within:ring-origen-pradera/45",
            error && "border-red-500",
            disabled && "opacity-50",
            sizeClasses[inputSize],
            className
          )}
        >
          {affixLeft && (
            <span className="pl-3 text-text-subtle select-none" aria-hidden="true">
              {affixLeft}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            className="h-full w-full bg-transparent px-1 pr-3 text-origen-oscuro placeholder:text-text-subtle focus:outline-none"
            aria-invalid={!!error}
            {...props}
          />

          {affixRight && (
            <span className="pr-3 text-text-subtle select-none" aria-hidden="true">
              {affixRight}
            </span>
          )}
        </div>

        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-text-subtle">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

InputAffixField.displayName = "InputAffixField";

export { InputAffixField };
