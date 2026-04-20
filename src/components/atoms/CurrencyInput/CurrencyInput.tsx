"use client";

import * as React from "react";
import { Euro, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size"> {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: string;
  helperText?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  maxIntegerDigits?: number;
  showThousandSeparator?: boolean;
  required?: boolean;
  inputSize?: "sm" | "md" | "lg";
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
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
      max,
      maxIntegerDigits = 15,
      showThousandSeparator = false,
      inputSize = "md",
      disabled,
      required,
      id,
      placeholder = "0,00",
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    const formatNumber = React.useCallback(
      (num: number): string => {
        if (Number.isNaN(num)) return "0,00";

        const fixed = num.toFixed(2);

        if (showThousandSeparator) {
          const [integerPart, decimalPart] = fixed.split(".");
          const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          return `${formattedInteger},${decimalPart}`;
        }

        return fixed.replace(".", ",");
      },
      [showThousandSeparator]
    );

    const parseNumber = (str: string): number => {
      if (!str) return 0;
      const withoutThousands = str.replace(/\./g, "");
      const normalized = withoutThousands.replace(",", ".");
      return Number.parseFloat(normalized) || 0;
    };

    const sizeClasses: Record<NonNullable<CurrencyInputProps["inputSize"]>, string> = {
      sm: "h-11 text-sm",
      md: "h-11 text-sm",
      lg: "h-12 text-base",
    };

    const getIconPosition = () => {
      switch (inputSize) {
        case "sm":
          return "left-3";
        case "md":
          return "left-3";
        case "lg":
          return "left-4";
        default:
          return "left-3";
      }
    };

    const getEurPosition = () => {
      switch (inputSize) {
        case "sm":
          return "right-3";
        case "md":
          return "right-3";
        case "lg":
          return "right-4";
        default:
          return "right-3";
      }
    };

    React.useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatNumber(value));
      }
    }, [value, isFocused, formatNumber]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value;
      const cleaned = rawValue.replace(/[^\d,.]/g, "");
      const parts = cleaned.split(/[,.]/);

      if (parts.length > 2) {
        const firstPart = parts[0];
        const rest = parts.slice(1).join("");
        setDisplayValue(`${firstPart},${rest}`);
        return;
      }

      setDisplayValue(cleaned);

      const integerPart = cleaned.split(/[,.]/)[0].replace(/\D/g, "");
      if (integerPart.length > maxIntegerDigits) {
        return;
      }

      const numericValue = parseNumber(cleaned);
      let clampedValue = numericValue;

      if (min !== undefined) clampedValue = Math.max(min, clampedValue);
      if (max !== undefined) clampedValue = Math.min(max, clampedValue);

      onChange(clampedValue);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const numericValue = parseNumber(displayValue);
      let finalValue = numericValue;

      if (min !== undefined) finalValue = Math.max(min, finalValue);
      if (max !== undefined) finalValue = Math.min(max, finalValue);

      setDisplayValue(formatNumber(finalValue));
      onChange(finalValue);
      props.onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (value === 0) {
        // Si el valor es 0 (sin configurar), limpiar para que el usuario escriba directamente
        setDisplayValue("");
      } else if (!Number.isNaN(value)) {
        // Mostrar valor sin separador de miles para edición cómoda
        const raw = showThousandSeparator
          ? value.toString().replace(".", ",")
          : value.toString().replace(".", ",");
        setDisplayValue(raw);
      }
      props.onFocus?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if ((event.key === "," || event.key === ".") && (displayValue.includes(",") || displayValue.includes("."))) {
        event.preventDefault();
      }

      if (
        !/[\d,.\-+]/.test(event.key) &&
        event.key !== "Backspace" &&
        event.key !== "Delete" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight" &&
        event.key !== "Tab" &&
        event.key !== "Home" &&
        event.key !== "End"
      ) {
        event.preventDefault();
      }

      props.onKeyDown?.(event);
    };

    return (
      <div className="w-full space-y-1.5 sm:space-y-2">
        {(label || tooltip) && (
          <div className="flex items-center gap-2">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "block text-xs sm:text-sm font-medium text-origen-bosque",
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
          <Euro
            className={cn(
              "absolute top-1/2 h-4 w-4 -translate-y-1/2",
              getIconPosition(),
              isFocused ? "text-origen-pradera" : "text-text-disabled",
              error && "text-feedback-danger"
            )}
            aria-hidden="true"
          />

          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "flex w-full rounded-xl border bg-white pl-10",
              "text-origen-oscuro placeholder:text-text-disabled",
              "transition-all duration-200",
              "focus:border-origen-pradera focus:outline-none focus:ring-2 focus:ring-origen-pradera/50",
              "disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-50",
              sizeClasses[inputSize],
              error
                ? "border-feedback-danger hover:border-red-600 focus:ring-feedback-danger/50"
                : cn("border-origen-pradera/30", "hover:border-origen-hoja", isFocused && "border-origen-pradera"),
              className
            )}
            {...props}
          />

          <span
            className={cn("absolute top-1/2 -translate-y-1/2 text-xs text-text-disabled", getEurPosition())}
            aria-hidden="true"
          >
            EUR
          </span>
        </div>

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

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
