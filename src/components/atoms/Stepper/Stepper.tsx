/**
 * @file Stepper.tsx
 * @description Componente Stepper para formularios multi-paso
 */

"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

export type StepStatus = "completed" | "active" | "pending" | "error";

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status: StepStatus;
  disabled?: boolean;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pasos del stepper */
  steps: Step[];
  /** Paso actual (0-based index) */
  currentStep: number;
  /** Callback cuando se cambia de paso */
  onStepChange?: (step: number) => void;
  /** Variante visual */
  variant?: "default" | "minimal" | "card";
  /**
   * Orientación.
   * - `horizontal` / `vertical`: stepper completo con circulos, titulos y
   *   conectores (comportamiento original).
   * - `horizontal-dots`: variante compacta "dot trail" pensada para cabeceras
   *   moviles (p. ej. onboarding). Renderiza solo los indicadores de paso en
   *   linea horizontal, sin titulos ni descripciones; usa `step.title` como
   *   `aria-label` de cada punto.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical" | "horizontal-dots";
  /** Mostrar descripciones */
  showDescriptions?: boolean;
  /** Permitir navegación a pasos completados */
  allowBackwardNavigation?: boolean;
  /** Tamaño */
  size?: "sm" | "md" | "lg";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      currentStep,
      onStepChange,
      variant = "default",
      orientation = "horizontal",
      showDescriptions = true,
      allowBackwardNavigation = true,
      size = "md",
      ...props
    },
    ref
  ) => {
    const containerClass =
      orientation === "vertical"
        ? "flex flex-col gap-8"
        : "flex flex-row justify-between gap-4";

    if (orientation === "horizontal-dots") {
      return (
        <div
          ref={ref}
          {...props}
          role="list"
          aria-label="Progreso del proceso"
          className={cn("flex w-full items-center gap-1", className)}
        >
          {steps.map((step, index) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";

            return (
              <React.Fragment key={step.id}>
                <div
                  role="listitem"
                  aria-label={step.title}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "flex flex-shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted && "h-5 w-5 bg-origen-hoja",
                    isActive && "h-5 w-5 bg-origen-pradera ring-2 ring-origen-pradera/30",
                    !isCompleted && !isActive && "h-2.5 w-2.5 bg-border"
                  )}
                >
                  {isCompleted && <CheckCircle2 className="h-3 w-3 text-white" aria-hidden="true" />}
                  {isActive && <span className="h-2 w-2 rounded-full bg-surface-alt" aria-hidden="true" />}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-all duration-300",
                      index < currentStep ? "bg-origen-pradera" : "bg-border"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
    }

    const handleStepClick = (index: number) => {
      const step = steps[index];

      if (step.disabled) return;

      const canNavigate =
        index === currentStep + 1 ||
        (allowBackwardNavigation && index < currentStep) ||
        (allowBackwardNavigation && step.status === "completed");

      if (canNavigate && onStepChange) {
        onStepChange(index);
      }
    };

    const getStepIcon = (step: Step) => {
      const iconSize = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      };

      if (step.status === "completed") {
        return (
          <CheckCircle2 className={cn(iconSize[size], "text-green-600")} />
        );
      }

      if (step.status === "active") {
        return (
          <Circle
            className={cn(
              iconSize[size],
              "text-origin-pradera animate-pulse"
            )}
          />
        );
      }

      if (step.status === "error") {
        return <AlertCircle className={cn(iconSize[size], "text-red-500")} />;
      }

      return <Circle className={cn(iconSize[size], "text-origin-pradera/30")} />;
    };

    const stepSizeClasses = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    };

    return (
      <div
        ref={ref}
        {...props}
        role="list"
        className={cn(
          "w-full",
          orientation === "vertical" && "flex flex-col gap-8",
          className
        )}
      >
        <div className={containerClass}>
          {steps.map((step, index) => {
            const isClickable =
              !step.disabled &&
              (index === currentStep + 1 ||
                (allowBackwardNavigation && index < currentStep) ||
                (allowBackwardNavigation && step.status === "completed"));

            return (
              <div
                key={step.id}
                role="listitem"
                className={cn(
                  "flex flex-col items-center gap-2",
                  orientation === "horizontal" && "flex-1 relative",
                  isClickable && "cursor-pointer"
                )}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-5",
                      orientation === "horizontal"
                        ? "left-[calc(50%+20px)] right-[calc(-50%-20px)] h-0.5"
                        : "left-5 top-10 bottom-0 w-0.5",
                      steps[index].status === "completed"
                        ? "bg-green-600"
                        : step.status === "active"
                          ? "bg-origin-pradera"
                          : "bg-origin-pradera/20"
                    )}
                  />
                )}

                {/* Step Circle */}
                <button
                  type="button"
                  aria-label={step.title}
                  aria-current={step.status === "active" ? "step" : undefined}
                  aria-disabled={step.disabled || undefined}
                  disabled={step.disabled}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "relative z-10 rounded-full border-2 flex items-center justify-center transition-all",
                    stepSizeClasses[size],
                    step.status === "completed"
                      ? "bg-green-100 border-green-600"
                      : step.status === "active"
                        ? "bg-origin-pastel border-origin-pradera ring-2 ring-origin-pradera/20"
                        : step.status === "error"
                          ? "bg-red-100 border-red-500"
                          : "bg-white border-origin-pradera/30",
                    step.disabled && "opacity-50 cursor-not-allowed",
                    isClickable && "hover:shadow-md active:scale-95",
                    !step.disabled && !isClickable && "cursor-default"
                  )}
                >
                  {step.icon || getStepIcon(step)}
                </button>

                {/* Step Label */}
                <div className="text-center">
                  <p
                    className={cn(
                      "font-semibold",
                      step.status === "active"
                        ? "text-origin-bosque"
                        : "text-origin-oscuro/70"
                    )}
                  >
                    {step.title}
                  </p>
                  {showDescriptions && step.description && (
                    <p className="text-xs text-origin-oscuro/50 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-in fade-in-0 duration-300", className)}
      {...props}
    >
      {children}
    </div>
  )
);

StepperContent.displayName = "StepperContent";

export interface StepperFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  finishLabel?: string;
  previousLabel?: string;
  showPrevious?: boolean;
  nextDisabled?: boolean;
  loading?: boolean;
}

const StepperFooter = React.forwardRef<HTMLDivElement, StepperFooterProps>(
  (
    {
      className,
      currentStep,
      totalSteps,
      onNext,
      onPrevious,
      nextLabel = "Siguiente",
      finishLabel = "Finalizar",
      previousLabel = "Anterior",
      showPrevious = true,
      nextDisabled = false,
      loading = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn("flex gap-4 justify-between mt-8", className)}
      {...props}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 0 || !showPrevious}
        className="px-4 py-2 rounded-lg border border-origin-pradera/30 text-origin-bosque hover:bg-origin-pastel/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {previousLabel}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="px-4 py-2 rounded-lg bg-origin-pradera text-white hover:bg-origin-pradera/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Cargando..." : currentStep === totalSteps - 1 ? finishLabel : nextLabel}
      </button>
    </div>
  )
);

StepperFooter.displayName = "StepperFooter";

export { Stepper, StepperContent, StepperFooter };
