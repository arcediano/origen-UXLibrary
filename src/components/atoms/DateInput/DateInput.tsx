"use client";

import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  inputSize?: "sm" | "md" | "lg";
}

export interface DateRangeInputProps {
  labelFrom?: string;
  labelTo?: string;
  valueFrom?: string;
  valueTo?: string;
  onChangeFrom?: (value: string) => void;
  onChangeTo?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  inputSize?: "sm" | "md" | "lg";
  className?: string;
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const sizeClasses = {
  sm: "h-10 text-sm",
  md: "h-11 text-sm",
  lg: "h-12 text-base",
};

const iconSizeClasses = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

// ─── DateInput ────────────────────────────────────────────────────────────────

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      inputSize = "md",
      disabled,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-xs font-semibold uppercase tracking-wide",
              error ? "text-feedback-danger" : "text-muted-foreground",
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Icono decorativo — no bloquea el picker nativo */}
          <Calendar
            className={cn(
              "absolute left-3 pointer-events-none z-10 shrink-0",
              iconSizeClasses[inputSize],
              error
                ? "text-feedback-danger"
                : disabled
                ? "text-text-disabled"
                : "text-text-subtle"
            )}
            aria-hidden="true"
          />

          <input
            ref={ref}
            id={id}
            type="date"
            disabled={disabled}
            className={cn(
              // Base
              "w-full pl-9 pr-3 font-medium rounded-xl border transition-colors",
              "appearance-none bg-surface-alt",
              // Texto del valor seleccionado
              "text-origen-bosque",
              // Tamaño
              sizeClasses[inputSize],
              // Estados normales
              !error && !disabled && [
                "border-border-subtle",
                "hover:border-origen-pradera/55",
                "focus:border-origen-pradera focus:ring-2 focus:ring-origen-pradera/20 focus:outline-none",
              ],
              // Estado error
              error && "border-feedback-danger focus:border-feedback-danger focus:ring-2 focus:ring-feedback-danger/20 focus:outline-none",
              // Estado disabled
              disabled && "opacity-40 cursor-not-allowed bg-surface border-border-subtle",
              // Chrome/Safari: icono del calendario nativo alineado
              "[&::-webkit-calendar-picker-indicator]:opacity-0",
              "[&::-webkit-calendar-picker-indicator]:absolute",
              "[&::-webkit-calendar-picker-indicator]:inset-0",
              "[&::-webkit-calendar-picker-indicator]:w-full",
              "[&::-webkit-calendar-picker-indicator]:h-full",
              "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
              // Firefox
              "[&::-moz-focus-inner]:border-0",
              className
            )}
            {...props}
          />
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              "text-xs leading-tight",
              error ? "text-feedback-danger" : "text-text-subtle"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

// ─── DateRangeInput ───────────────────────────────────────────────────────────

function DateRangeInput({
  labelFrom = "Desde",
  labelTo = "Hasta",
  valueFrom = "",
  valueTo = "",
  onChangeFrom,
  onChangeTo,
  error,
  disabled,
  inputSize = "md",
  className,
}: DateRangeInputProps) {
  const rangeError = React.useMemo(() => {
    if (!valueFrom || !valueTo) return undefined;
    const from = new Date(`${valueFrom}T00:00:00`).getTime();
    const to = new Date(`${valueTo}T23:59:59`).getTime();
    return from > to ? "La fecha de inicio debe ser anterior a la de fin" : undefined;
  }, [valueFrom, valueTo]);

  const displayError = error ?? rangeError;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="grid grid-cols-2 gap-2">
        <DateInput
          label={labelFrom}
          value={valueFrom}
          onChange={(e) => onChangeFrom?.(e.target.value)}
          max={valueTo || undefined}
          disabled={disabled}
          inputSize={inputSize}
          error={displayError ? " " : undefined}
          aria-label={labelFrom}
        />
        <DateInput
          label={labelTo}
          value={valueTo}
          onChange={(e) => onChangeTo?.(e.target.value)}
          min={valueFrom || undefined}
          disabled={disabled}
          inputSize={inputSize}
          error={displayError ? " " : undefined}
          aria-label={labelTo}
        />
      </div>

      {displayError && displayError.trim() && (
        <p className="text-xs text-feedback-danger leading-tight">{displayError}</p>
      )}
    </div>
  );
}

DateRangeInput.displayName = "DateRangeInput";

// ─── Exports ──────────────────────────────────────────────────────────────────

export { DateInput, DateRangeInput };
