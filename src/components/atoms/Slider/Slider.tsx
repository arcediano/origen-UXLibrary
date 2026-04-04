"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SliderVariant = "leaf" | "forest" | "accent";
type SliderSize = "sm" | "md" | "lg";

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  label?: string;
  variant?: SliderVariant;
  sliderSize?: SliderSize;
  showValue?: boolean;
  showMarks?: boolean;
  marks?: Array<{ value: number; label?: string }>;
  step?: number;
  formatValue?: (value: number) => string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue = [50],
      onValueChange,
      label,
      variant = "leaf",
      sliderSize = "md",
      showValue = true,
      showMarks = false,
      marks,
      step = 1,
      formatValue = (current) => `${current}`,
      min = 0,
      max = 100,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(value ?? defaultValue);
    const isControlled = value !== undefined;

    const currentValue = React.useMemo(() => {
      const base = isControlled ? value : internalValue;
      const normalized = (base && base.length ? base : [min]).map((item) => clamp(item, min, max));
      if (normalized.length === 1) return normalized;
      const [first, second] = normalized;
      return [Math.min(first, second), Math.max(first, second)];
    }, [internalValue, isControlled, max, min, value]);

    const isRange = currentValue.length === 2;

    const setNext = (next: number[]) => {
      const normalized = next.map((item) => clamp(item, min, max));
      const finalValues = normalized.length === 2 ? [Math.min(normalized[0], normalized[1]), Math.max(normalized[0], normalized[1])] : normalized;
      if (!isControlled) setInternalValue(finalValues);
      onValueChange?.(finalValues);
    };

    const variantClasses: Record<SliderVariant, { track: string; active: string; thumb: string; mark: string }> = {
      leaf: {
        track: "bg-origen-crema",
        active: "bg-origen-pradera",
        thumb: "border-origen-pradera",
        mark: "border-origen-pradera",
      },
      forest: {
        track: "bg-origen-bosque/10",
        active: "bg-origen-bosque",
        thumb: "border-origen-bosque",
        mark: "border-origen-bosque",
      },
      accent: {
        track: "bg-origen-pradera/20",
        active: "bg-origen-pradera",
        thumb: "border-origen-pradera",
        mark: "border-origen-pradera",
      },
    };

    const sizeClasses: Record<SliderSize, { track: string; thumb: string }> = {
      sm: { track: "h-1.5", thumb: "h-4 w-4" },
      md: { track: "h-2", thumb: "h-5 w-5" },
      lg: { track: "h-2.5", thumb: "h-6 w-6" },
    };

    const config = variantClasses[variant];
    const sizeConfig = sizeClasses[sliderSize];
    const denominator = max - min <= 0 ? 1 : max - min;

    const low = ((currentValue[0] - min) / denominator) * 100;
    const high = isRange ? ((currentValue[1] - min) / denominator) * 100 : low;

    const sharedInputClass = cn(
      "pointer-events-none absolute inset-0 z-20 m-0 h-full w-full appearance-none bg-transparent",
      "[&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:bg-transparent",
      "[&::-moz-range-track]:h-full [&::-moz-range-track]:bg-transparent",
      "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none",
      "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md",
      "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md",
      "focus-visible:outline-none",
      `[&::-webkit-slider-thumb]:${sizeConfig.thumb} [&::-moz-range-thumb]:${sizeConfig.thumb}`,
      `[&::-webkit-slider-thumb]:${config.thumb} [&::-moz-range-thumb]:${config.thumb}`,
      disabled && "opacity-60"
    );

    return (
      <div ref={ref} className={cn("w-full space-y-3", className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between gap-3">
            {label ? <label className="text-sm font-semibold text-origen-bosque">{label}</label> : <span />}
            {showValue && (
              <span className="rounded-lg bg-origen-crema px-2 py-1 text-xs font-semibold text-origen-bosque sm:text-sm">
                {isRange
                  ? `${formatValue(Math.round(currentValue[0]))} - ${formatValue(Math.round(currentValue[1]))}`
                  : formatValue(Math.round(currentValue[0]))}
              </span>
            )}
          </div>
        )}

        <div className={cn("relative", sizeConfig.track)}>
          <div className={cn("absolute inset-0 rounded-full", config.track)} />
          <div
            className={cn("absolute rounded-full", config.active, sizeConfig.track)}
            style={{ left: `${low}%`, width: `${Math.max(high - low, isRange ? 0 : low)}%` }}
          />

          <input
            type="range"
            value={currentValue[0]}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={sharedInputClass}
            onChange={(event) => {
              const next = Number(event.currentTarget.value);
              if (isRange) {
                setNext([Math.min(next, currentValue[1]), currentValue[1]]);
              } else {
                setNext([next]);
              }
            }}
            aria-label={label ? `${label} mínimo` : "Valor mínimo"}
          />

          {isRange && (
            <input
              type="range"
              value={currentValue[1]}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={sharedInputClass}
              onChange={(event) => {
                const next = Number(event.currentTarget.value);
                setNext([currentValue[0], Math.max(next, currentValue[0])]);
              }}
              aria-label={label ? `${label} máximo` : "Valor máximo"}
            />
          )}

          {showMarks &&
            marks?.map((mark) => {
              const position = ((mark.value - min) / denominator) * 100;
              return (
                <span
                  key={`${mark.value}-${mark.label ?? ""}`}
                  className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                >
                  <span className={cn("block h-2 w-2 rounded-full border-2 bg-white", config.mark)} />
                  {mark.label && (
                    <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[10px] text-text-subtle sm:text-xs">
                      {mark.label}
                    </span>
                  )}
                </span>
              );
            })}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };