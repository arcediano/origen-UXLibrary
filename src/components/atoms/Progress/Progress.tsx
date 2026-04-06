import * as React from "react";
import { Clock, Flower, Leaf, Sprout } from "lucide-react";
import { cn } from "../../../lib/utils";

type ProgressVariant = "seed" | "sprout" | "leaf" | "fruit" | "forest" | "warning";
type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showIcon?: boolean;
  description?: string;
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      showLabel = false,
      label,
      variant = "leaf",
      size = "md",
      showIcon = true,
      description,
      animated = true,
      ...props
    },
    ref
  ) => {
    const safeMax = max <= 0 ? 100 : max;
    const safeValue = Math.min(Math.max(value, 0), safeMax);
    const percentage = Math.min(Math.max((safeValue / safeMax) * 100, 0), 100);

    const variantConfig: Record<
      ProgressVariant,
      { track: string; indicator: string; icon: React.ReactNode; label: string; valueLabel: string }
    > = {
      seed: {
        track: "bg-origen-crema",
        indicator: "bg-origen-pradera",
        icon: <Sprout className="h-4 w-4" aria-hidden="true" />,
        label: "text-origen-bosque",
        valueLabel: "text-origen-hoja",
      },
      sprout: {
        track: "bg-green-50",
        indicator: "bg-green-400",
        icon: <Sprout className="h-4 w-4" aria-hidden="true" />,
        label: "text-origen-bosque",
        valueLabel: "text-origen-hoja",
      },
      leaf: {
        track: "bg-origen-pastel",
        indicator: "bg-gradient-to-r from-origen-pradera to-origen-hoja",
        icon: <Leaf className="h-4 w-4" aria-hidden="true" />,
        label: "text-origen-bosque",
        valueLabel: "text-origen-hoja",
      },
      fruit: {
        track: "bg-amber-50",
        indicator: "bg-gradient-to-r from-amber-400 to-orange-500",
        icon: <Flower className="h-4 w-4" aria-hidden="true" />,
        label: "text-origen-bosque",
        valueLabel: "text-amber-600",
      },
      forest: {
        track: "bg-origen-bosque/10",
        indicator: "bg-gradient-to-r from-origen-pino to-origen-bosque",
        icon: <Sprout className="h-4 w-4 text-white" aria-hidden="true" />,
        label: "text-origen-bosque",
        valueLabel: "text-origen-bosque",
      },
      warning: {
        track: "bg-amber-100",
        indicator: "bg-amber-500",
        icon: <Clock className="h-4 w-4" aria-hidden="true" />,
        label: "text-amber-900",
        valueLabel: "text-amber-700",
      },
    };

    const sizeClasses: Record<ProgressSize, string> = {
      sm: "h-2",
      md: "h-2.5",
      lg: "h-3",
    };

    const config = variantConfig[variant];

    return (
      <div
        ref={ref}
        {...props}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.round(safeValue)}
        aria-valuetext={`${Math.round(percentage)}%`}
        className={cn("w-full space-y-2", className)}
      >
        {(showLabel || label) && (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {showIcon && <span className="shrink-0">{config.icon}</span>}
              {label && <span className={cn("text-sm font-medium", config.label)}>{label}</span>}
            </div>
            {showLabel && <span className={cn("text-sm font-semibold tabular-nums", config.valueLabel)}>{Math.round(percentage)}%</span>}
          </div>
        )}

        <div className={cn("relative overflow-hidden rounded-full", config.track, sizeClasses[size])}>
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-500 ease-out",
              config.indicator,
              animated && "after:absolute after:inset-0 after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {description && <p className="text-xs text-text-subtle">{description}</p>}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };