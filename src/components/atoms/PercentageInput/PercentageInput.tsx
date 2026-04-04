"use client";

import * as React from "react";
import { Info, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PercentageInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: string;
  helperText?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  required?: boolean;
  showProgress?: boolean;
}

const PercentageInput = React.forwardRef<HTMLInputElement, PercentageInputProps>(
  (
    {
      className,
      value,
      onChange,
      label,
      error,
      helperText,
      tooltip,
      min = 0,
      max = 100,
      disabled,
      required,
      showProgress = true,
      id,
      placeholder = "0",
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState(value ? value.toString() : "");
    const [isFocused, setIsFocused] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    React.useEffect(() => {
      if (!isFocused) {
        setDisplayValue(value ? value.toString() : "0");
      }
    }, [value, isFocused]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/[^\d.-]/g, "");

      if (rawValue === "") {
        setDisplayValue("");
        onChange(0);
        return;
      }

      const numericValue = Number.parseFloat(rawValue);
      if (Number.isNaN(numericValue)) {
        setDisplayValue("");
        onChange(0);
        return;
      }

      let clampedValue = numericValue;
      if (min !== undefined) clampedValue = Math.max(min, clampedValue);
      if (max !== undefined) clampedValue = Math.min(max, clampedValue);

      setDisplayValue(clampedValue.toString());
      onChange(clampedValue);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (displayValue === "") {
        setDisplayValue("0");
        onChange(0);
      }
      props.onBlur?.(event);
    };

    const safeRange = max - min === 0 ? 1 : max - min;
    const percentage = Math.max(0, Math.min(100, ((value - min) / safeRange) * 100));

    return (
      <div className="w-full space-y-1.5 sm:space-y-2">
        {(label || tooltip) && (
          <div className="flex items-center gap-2">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "text-xs sm:text-sm font-medium text-origen-bosque",
                  disabled && "cursor-not-allowed opacity-50",
                  error && "text-red-600"
                )}
              >
                {label}
                {required && <span className="ml-1 text-red-500" aria-label="requerido">*</span>}
              </label>
            )}

            {tooltip && (
              <div className="group relative">
                <Info className="h-3.5 w-3.5 cursor-help text-text-disabled" aria-hidden="true" />
                <div
                  className={cn(
                    "absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-origen-oscuro p-2 text-xs text-white",
                    "shadow-lg animate-in fade-in-0 zoom-in-95 group-hover:block"
                  )}
                  role="tooltip"
                >
                  {tooltip}
                  <div className="absolute -top-1 left-2 h-1.5 w-1.5 rotate-45 bg-origen-oscuro" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-3 py-2 pr-9",
              "text-sm sm:text-base placeholder:text-text-disabled",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-origen-pradera/50",
              "disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-50",
              error
                ? "border-feedback-danger hover:border-red-600 focus:ring-feedback-danger/50"
                : cn("border-origen-pradera/30", "hover:border-origen-hoja", isFocused && "border-origen-pradera"),
              className
            )}
            {...props}
          />

          <Percent
            className={cn(
              "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2",
              isFocused ? "text-origen-pradera" : "text-text-disabled",
              error && "text-feedback-danger"
            )}
            aria-hidden="true"
          />
        </div>

        {showProgress && !error && value > 0 && (
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface-alt">
            <div
              className={cn(
                "absolute left-0 top-0 h-full transition-all duration-300",
                value >= 90 ? "bg-amber-500" : "bg-origen-pradera"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}

        {error && (
          <p id={errorId} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && <p className="text-xs text-text-subtle">{helperText}</p>}
      </div>
    );
  }
);

PercentageInput.displayName = "PercentageInput";

export { PercentageInput };
