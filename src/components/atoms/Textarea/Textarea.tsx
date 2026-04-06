"use client";

import * as React from "react";
import { AlertCircle, Check, Info, Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  autoResize?: boolean;
  success?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "filled" | "minimal";
  textareaSize?: "sm" | "md" | "lg";
  tooltip?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      autoResize = true,
      disabled,
      success,
      loading,
      icon,
      variant = "default",
      textareaSize = "md",
      tooltip,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);
    const [isFocused, setIsFocused] = React.useState(false);

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const warningLevel = maxLength ? (charCount / maxLength) * 100 : 0;

    const isNearLimit = warningLevel >= 80;
    const isAtLimit = charCount === maxLength;

    const variantClasses = {
      default: cn(
        "bg-white border border-origen-pradera/30",
        "hover:border-origen-hoja",
        "focus:border-origen-pradera focus:ring-2 focus:ring-origen-pradera/20",
        error && "border-feedback-danger hover:border-red-600 focus:ring-feedback-danger/20",
        success && !error && "border-green-500 hover:border-green-600 focus:ring-green-500/20"
      ),
      outline: cn(
        "bg-transparent border-2 border-origen-bosque/30",
        "hover:border-origen-bosque/50",
        "focus:border-origen-pradera focus:ring-2 focus:ring-origen-pradera/20",
        error && "border-feedback-danger",
        success && !error && "border-green-500"
      ),
      filled: cn(
        "bg-origen-crema border border-transparent",
        "hover:bg-origen-pastel",
        "focus:bg-white focus:border-origen-pradera",
        error && "bg-feedback-danger-subtle border-feedback-danger",
        success && !error && "bg-green-50 border-green-500"
      ),
      minimal: cn(
        "bg-transparent border-b-2 border-origen-pradera/30",
        "hover:border-origen-hoja",
        "focus:border-origen-pradera",
        "rounded-none px-0",
        error && "border-feedback-danger",
        success && !error && "border-green-500"
      ),
    };

    const sizeClasses = {
      sm: "min-h-[60px] sm:min-h-[80px] px-3 py-2 text-xs sm:text-sm",
      md: "min-h-[80px] sm:min-h-[100px] px-4 py-3 text-sm sm:text-base",
      lg: "min-h-[100px] sm:min-h-[120px] px-5 py-4 text-base sm:text-lg",
    };

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea && autoResize) {
        textarea.style.height = "auto";
        const newHeight = Math.max(textarea.scrollHeight, textareaSize === "sm" ? 60 : textareaSize === "lg" ? 100 : 80);
        textarea.style.height = `${newHeight}px`;
      }
    }, [autoResize, textareaSize]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCharCount) {
        setCharCount(event.target.value.length);
      }
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(event);
    };

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      if (autoResize) {
        const timer = window.setTimeout(adjustHeight, 0);
        return () => window.clearTimeout(timer);
      }
      return undefined;
    }, [adjustHeight, autoResize]);

    return (
      <div className="w-full space-y-2">
        {(label || tooltip) && (
          <div className="flex items-center gap-2">
            {label && (
              <label
                htmlFor={textareaId}
                className={cn(
                  "block text-xs font-medium text-origen-bosque sm:text-sm",
                  disabled && "cursor-not-allowed opacity-50",
                  error && "text-red-600"
                )}
              >
                {label}
                {props.required && (
                  <span className="ml-1 text-red-500" aria-label="requerido">
                    *
                  </span>
                )}
              </label>
            )}

            {tooltip && (
              <div className="group relative">
                <Info className="h-3 w-3 cursor-help text-text-disabled sm:h-4 sm:w-4" />
                <div
                  className={cn(
                    "absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-origen-oscuro p-2 text-xs text-white shadow-lg sm:w-64",
                    "animate-in fade-in-0 zoom-in-95 group-hover:block"
                  )}
                >
                  {tooltip}
                  <div className="absolute -top-1 left-3 h-2 w-2 rotate-45 bg-origen-oscuro" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative">
          {icon && (
            <div
              className={cn(
                "absolute left-3 top-3 text-text-disabled",
                isFocused && "text-origen-pradera",
                error && "text-feedback-danger",
                success && !error && "text-green-500"
              )}
            >
              {icon}
            </div>
          )}

          <textarea
            ref={setRefs}
            {...props}
            id={textareaId}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={(event) => {
              setIsFocused(true);
              props.onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              props.onBlur?.(event);
            }}
            aria-invalid={!!error}
            aria-describedby={cn(error && errorId, helperText && helperId) || undefined}
            aria-busy={loading}
            className={cn(
              "flex w-full rounded-xl",
              "text-origen-oscuro placeholder:text-text-disabled",
              "transition-all duration-200",
              "disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-50",
              "focus:outline-none focus:ring-2 focus:ring-origen-pradera/50",
              variantClasses[variant],
              sizeClasses[textareaSize],
              icon && "pl-9 sm:pl-10",
              className
            )}
          />

          <div className="absolute right-3 top-3 flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-origen-pradera" />}
            {success && !error && !loading && <Check className="h-4 w-4 text-green-500" />}
            {error && !loading && <AlertCircle className="h-4 w-4 text-feedback-danger" />}
          </div>
        </div>

        {(error || helperText || (showCharCount && maxLength)) && (
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              {error && (
                <p id={errorId} className="flex items-center gap-1 text-xs text-red-600" role="alert">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{error}</span>
                </p>
              )}

              {helperText && !error && (
                <p id={helperId} className="text-xs text-text-subtle">
                  {helperText}
                </p>
              )}

              {showCharCount && maxLength && isNearLimit && !isAtLimit && !error && (
                <p className="flex items-center gap-1 text-xs text-amber-600">
                  <Info className="h-3 w-3 shrink-0" />
                  <span>Cerca del límite ({Math.round(warningLevel)}%)</span>
                </p>
              )}
            </div>

            {showCharCount && maxLength && (
              <span
                className={cn(
                  "text-xs tabular-nums",
                  isAtLimit ? "text-red-600" : isNearLimit ? "text-amber-600" : "text-text-subtle"
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
