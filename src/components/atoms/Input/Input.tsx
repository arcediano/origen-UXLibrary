/**
 * @file Input.tsx
 * @description Componente Input del Origen Design System.
 * Soporta iconos, estados de validación, contador de caracteres, password toggle
 * y agrupación de inputs.
 *
 * @example
 * <Input label="Email" type="email" placeholder="tu@email.com" required />
 * <Input label="Contraseña" type="password" error="Contraseña incorrecta" />
 * <Input label="Bio" showCharCount maxLength={200} />
 */

"use client";

import * as React from "react";
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Info,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showCharCount?: boolean;
  success?: boolean;
  loading?: boolean;
  tooltip?: string;
  variant?: "default" | "outline" | "filled" | "minimal";
  inputSize?: "sm" | "md" | "lg";
}

// ─── Helpers de estilo ────────────────────────────────────────────────────────

const variantClasses = (error?: string, success?: boolean) => ({
  default: cn(
    "bg-white border border-origen-pradera/30 hover:border-origen-hoja focus:border-origen-pradera",
    error && "border-red-500 hover:border-red-600",
    success && !error && "border-green-500"
  ),
  outline: cn(
    "bg-transparent border-2 border-origen-bosque/30 hover:border-origen-bosque/50 focus:border-origen-pradera",
    error && "border-red-500",
    success && !error && "border-green-500"
  ),
  filled: cn(
    "bg-origen-crema border border-transparent hover:bg-origen-pastel focus:bg-white focus:border-origen-pradera",
    error && "bg-red-50 border-red-500",
    success && !error && "bg-green-50 border-green-500"
  ),
  minimal: cn(
    "bg-transparent border-b-2 border-origen-pradera/30 hover:border-origen-hoja focus:border-origen-pradera rounded-none",
    error && "border-red-500",
    success && !error && "border-green-500"
  ),
});

const sizeClasses = { sm: "h-9 text-xs", md: "h-11 text-sm", lg: "h-12 text-base" };

// ─── Componente ───────────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      showCharCount,
      maxLength,
      success,
      loading,
      tooltip,
      variant = "default",
      inputSize = "md",
      disabled,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [charCount, setCharCount]       = React.useState(0);
    const [isFocused, setIsFocused]       = React.useState(false);

    const generatedId = React.useId();
    const inputId     = id || generatedId;
    const errorId     = `${inputId}-error`;
    const helperId    = `${inputId}-helper`;

    const isPassword  = type === "password";
    const inputType   = isPassword && showPassword ? "text" : type;
    const validationState = error ? "error" : success ? "success" : loading ? "loading" : null;

    const padMap = { sm: { base: "px-3", icon: "pl-8",  pr: "pr-8"  },
                     md: { base: "px-4", icon: "pl-10", pr: "pr-10" },
                     lg: { base: "px-5", icon: "pl-12", pr: "pr-12" } };
    const pad = padMap[inputSize];

    const paddingLeft  = leftIcon  ? pad.icon : pad.base;
    const paddingRight = (rightIcon || isPassword || validationState) ? pad.pr : pad.base;

    const iconSizeMap = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };
    const iconSize = iconSizeMap[inputSize];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showCharCount) setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const progressPct    = maxLength ? Math.min((charCount / maxLength) * 100, 100) : 0;
    const progressColor  = !maxLength
      ? "bg-origen-pradera"
      : charCount === maxLength
      ? "bg-red-500"
      : charCount > maxLength * 0.9
      ? "bg-amber-500"
      : "bg-origen-pradera";

    const variants = variantClasses(error, success);

    return (
      <div className="w-full space-y-1.5">
        {/* Label + Tooltip */}
        {(label || tooltip) && (
          <div className="flex items-center gap-2">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "block text-sm font-medium text-origen-bosque",
                  disabled && "opacity-50 cursor-not-allowed",
                  error && "text-red-600"
                )}
              >
                {label}
                {props.required && (
                  <span className="text-red-500 ml-1" aria-label="requerido">*</span>
                )}
              </label>
            )}
            {tooltip && (
              <div className="group relative">
                <Info className="h-4 w-4 text-gray-400 cursor-help" aria-hidden />
                <div
                  className="absolute left-0 top-6 z-50 hidden group-hover:block w-56 p-2 rounded-lg bg-origen-oscuro text-white text-xs shadow-lg"
                  role="tooltip"
                >
                  {tooltip}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none z-10",
                isFocused ? "text-origen-pradera" : "text-gray-400",
                error && "text-red-500",
                success && !error && "text-green-500"
              )}
            >
              {React.isValidElement(leftIcon)
                ? React.cloneElement(leftIcon as React.ReactElement<{ className?: string }>, { className: iconSize })
                : leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
            onBlur={(e)  => { setIsFocused(false); props.onBlur?.(e); }}
            aria-invalid={!!error}
            aria-describedby={cn(error && errorId, helperText && helperId) || undefined}
            aria-busy={loading}
            className={cn(
              "flex w-full rounded-xl transition-all duration-200",
              "text-origen-oscuro placeholder:text-gray-400",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
              "focus:outline-none focus:ring-2 focus:ring-origen-pradera/50",
              variants[variant],
              sizeClasses[inputSize],
              paddingLeft,
              paddingRight,
              className
            )}
            {...props}
          />

          {/* Right elements */}
          <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center gap-1 z-10">
            {validationState === "success" && <Check  className={cn(iconSize, "text-green-500")} />}
            {validationState === "loading" && <Loader2 className={cn(iconSize, "animate-spin text-origen-pradera")} />}
            {validationState === "error"   && <AlertCircle className={cn(iconSize, "text-red-500")} />}
            {isPassword && !validationState && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className={iconSize} /> : <Eye className={iconSize} />}
              </Button>
            )}
            {rightIcon && !validationState && !isPassword && (
              <span className="text-gray-400">
                {React.isValidElement(rightIcon)
                  ? React.cloneElement(rightIcon as React.ReactElement<{ className?: string }>, { className: iconSize })
                  : rightIcon}
              </span>
            )}
          </div>

          {/* Progress bar for char count */}
          {showCharCount && maxLength && (
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-300", progressColor)}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {(error || helperText || (showCharCount && maxLength)) && (
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              {error && (
                <p id={errorId} className="text-xs text-red-600 flex items-center gap-1" role="alert">
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
                  {error}
                </p>
              )}
              {helperText && !error && (
                <p id={helperId} className="text-xs text-gray-500">{helperText}</p>
              )}
            </div>
            {showCharCount && maxLength && (
              <span className={cn(
                "text-xs tabular-nums",
                charCount === maxLength ? "text-red-600"
                  : charCount > maxLength * 0.9 ? "text-amber-600"
                  : "text-gray-500"
              )}>
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ─── InputGroup ───────────────────────────────────────────────────────────────

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  groupLabel?: string;
  groupDescription?: string;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, direction = "vertical", groupLabel, groupDescription, children, ...props }, ref) => (
    <div className="space-y-3">
      {(groupLabel || groupDescription) && (
        <div className="space-y-1">
          {groupLabel    && <h4 className="text-sm font-semibold text-origen-bosque">{groupLabel}</h4>}
          {groupDescription && <p className="text-xs text-gray-500">{groupDescription}</p>}
        </div>
      )}
      <div
        ref={ref}
        role="group"
        className={cn(
          direction === "vertical" && "space-y-3",
          direction === "horizontal" && "flex flex-col sm:flex-row gap-3",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => (
          <div className="flex-1">{child}</div>
        ))}
      </div>
    </div>
  )
);

InputGroup.displayName = "InputGroup";

export { Input, InputGroup };
