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
  /**
   * Modo de visualizacion:
   * - `bar` (por defecto): barra de progreso estandar con `showLabel`/`label`/`description`.
   * - `char-count`: modo contador de caracteres con umbral (`threshold`). Antes del
   *   umbral muestra "value / threshold minimos" en ambar con mensaje de
   *   caracteres restantes; al alcanzarlo, cambia a indicador verde con
   *   mensaje de confirmacion. Util para descripciones con minimo de
   *   caracteres (ver /onboarding, Paso 1 - Historia).
   */
  mode?: "bar" | "char-count";
  /** Umbral minimo de caracteres en modo `char-count` */
  threshold?: number;
  /** Mensaje mostrado cuando se alcanza el umbral en modo `char-count` (por defecto "¡Listo! Ya puedes continuar") */
  completeMessage?: string;
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
      mode = "bar",
      threshold = 50,
      completeMessage = "¡Listo! Ya puedes continuar",
      ...props
    },
    ref
  ) => {
    const safeMax = max <= 0 ? 100 : max;
    const safeValue = Math.min(Math.max(value, 0), safeMax);
    const percentage = Math.min(Math.max((safeValue / safeMax) * 100, 0), 100);

    if (mode === "char-count") {
      const remaining = Math.max(threshold - safeValue, 0);
      const isComplete = safeValue >= threshold;
      const charPercentage = Math.min((safeValue / threshold) * 100, 100);

      return (
        <div
          ref={ref}
          {...props}
          role="status"
          aria-live="polite"
          className={cn("w-full space-y-1", className)}
        >
          {!isComplete && (
            <>
              <div className="mb-1 flex justify-between text-xs text-text-subtle">
                <span>{safeValue} / {threshold} mínimos</span>
                <span>{safeValue}/{safeMax}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-origen-pradera transition-all duration-300"
                  style={{ width: `${charPercentage}%` }}
                />
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {remaining} caracteres más para poder continuar
              </p>
            </>
          )}

          {isComplete && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-green-600">
                <Sprout className="h-3.5 w-3.5" aria-hidden="true" />
                {completeMessage}
              </span>
              <span className="text-xs text-text-subtle">{safeValue}/{safeMax}</span>
            </div>
          )}
        </div>
      );
    }

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