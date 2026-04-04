"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "checked" | "onChange"> {
  variant?: "seed" | "leaf" | "forest" | "accent";
  size?: "sm" | "md" | "lg";
  hasError?: boolean;
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface CheckboxWithLabelProps extends Omit<CheckboxProps, "hasError"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  labelPosition?: "right" | "left";
}

export interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  description?: string;
  children: React.ReactNode;
  error?: string;
  layout?: "vertical" | "horizontal" | "grid";
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant = "seed",
      size = "md",
      hasError,
      checked,
      onCheckedChange,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = checked === "indeterminate";
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (!inputRef.current) return;
      inputRef.current.indeterminate = isIndeterminate;
    }, [isIndeterminate]);

    const variantClasses = {
      seed: cn(
        "border-origen-pradera/50 bg-white",
        "hover:border-origen-hoja hover:bg-origen-crema/30",
        "data-[state=checked]:bg-origen-pradera data-[state=checked]:border-origen-pradera",
        "data-[state=indeterminate]:bg-origen-pradera data-[state=indeterminate]:border-origen-pradera",
        hasError && "border-feedback-danger hover:border-red-600"
      ),
      leaf: cn(
        "border-origen-hoja/40 bg-white",
        "hover:border-origen-hoja hover:bg-origen-pastel/30",
        "data-[state=checked]:bg-origen-hoja data-[state=checked]:border-origen-hoja",
        "data-[state=indeterminate]:bg-origen-hoja data-[state=indeterminate]:border-origen-hoja",
        hasError && "border-feedback-danger hover:border-red-600"
      ),
      forest: cn(
        "border-origen-bosque/30 bg-white",
        "hover:border-origen-bosque hover:bg-origen-bosque/5",
        "data-[state=checked]:bg-origen-bosque data-[state=checked]:border-origen-bosque",
        "data-[state=indeterminate]:bg-origen-bosque data-[state=indeterminate]:border-origen-bosque",
        hasError && "border-feedback-danger hover:border-red-600"
      ),
      accent: cn(
        "border-origen-pradera/30 bg-white",
        "hover:border-origen-pradera hover:bg-origen-pradera/5",
        "data-[state=checked]:bg-origen-pradera data-[state=checked]:border-origen-pradera",
        "data-[state=indeterminate]:bg-origen-pradera data-[state=indeterminate]:border-origen-pradera",
        hasError && "border-feedback-danger hover:border-red-600"
      ),
    };

    const sizeClasses = {
      sm: cn("h-4 w-4 rounded", "[&_svg]:h-3 [&_svg]:w-3"),
      md: cn("h-5 w-5 rounded-md", "[&_svg]:h-3.5 [&_svg]:w-3.5"),
      lg: cn("h-6 w-6 rounded-md", "[&_svg]:h-4 [&_svg]:w-4"),
    };

    const stateValue = isIndeterminate ? "indeterminate" : checked ? "checked" : "unchecked";

    return (
      <span
        data-state={stateValue}
        className={cn(
          "relative inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center",
          "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-origen-pradera/50 has-[:focus-visible]:ring-offset-2",
          "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
          className
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-flex items-center justify-center border-2 transition-all duration-200",
            variantClasses[variant],
            sizeClasses[size]
          )}
        >
          {isIndeterminate ? <Minus className="text-white" /> : checked ? <Check className="text-white" /> : null}
        </span>

        <input
          {...props}
          ref={inputRef}
          type="checkbox"
          checked={checked === true}
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            onCheckedChange?.(event.target.checked);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </span>
    );
  }
);

const CheckboxWithLabel = React.forwardRef<HTMLInputElement, CheckboxWithLabelProps>(
  (
    {
      label,
      description,
      errorMessage,
      id,
      labelPosition = "right",
      className,
      size = "md",
      variant = "seed",
      checked,
      onCheckedChange,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className={cn("space-y-1", className)}>
        <div
          className={cn(
            "flex min-h-[44px] items-start gap-3",
            labelPosition === "left" && "flex-row-reverse justify-end"
          )}
        >
          <Checkbox
            ref={ref}
            id={checkboxId}
            size={size}
            variant={variant}
            hasError={!!errorMessage}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            required={required}
            className="mt-0.5"
            {...props}
          />

          {label && (
            <div className="flex-1">
              <label
                htmlFor={checkboxId}
                className={cn(
                  "cursor-pointer text-sm font-medium text-origen-bosque transition-colors duration-200",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
                {required && (
                  <span className="ml-1 text-red-500" aria-label="requerido">
                    *
                  </span>
                )}
              </label>

              {description && <p className="mt-1 text-xs text-text-subtle">{description}</p>}
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="ml-8 text-xs text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  ({ className, legend, description, children, error, layout = "vertical", ...props }, ref) => {
    const layoutClasses = {
      vertical: "space-y-3",
      horizontal: "flex flex-col flex-wrap gap-4 sm:flex-row",
      grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
    };

    return (
      <fieldset ref={ref} className={cn("space-y-3", className)} {...props}>
        {(legend || description) && (
          <div className="space-y-1">
            {legend && <legend className="text-sm font-semibold text-origen-bosque">{legend}</legend>}
            {description && <p className="text-xs text-text-subtle">{description}</p>}
          </div>
        )}

        <div className={layoutClasses[layout]}>{children}</div>

        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

Checkbox.displayName = "Checkbox";
CheckboxWithLabel.displayName = "CheckboxWithLabel";
CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxWithLabel, CheckboxGroup };
