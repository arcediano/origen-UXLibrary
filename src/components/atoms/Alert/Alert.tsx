"use client";

import * as React from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, Leaf, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "default" | "success" | "warning" | "error" | "info" | "organic";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantClasses: Record<AlertVariant, string> = {
  default: "border-origen-hoja bg-origen-crema text-origen-bosque",
  success: "border-green-700 bg-green-50 text-green-900",
  warning: "border-amber-700 bg-amber-50 text-amber-900",
  error: "border-red-700 bg-red-50 text-red-900",
  info: "border-blue-700 bg-blue-50 text-blue-900",
  organic:
    "border-origen-pradera/30 bg-gradient-to-br from-origen-pastel to-origen-crema text-origen-oscuro shadow-md shadow-origen-pradera/10",
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  default: <Info className="h-4 w-4" aria-hidden="true" />,
  success: <CheckCircle className="h-4 w-4" aria-hidden="true" />,
  warning: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
  error: <AlertCircle className="h-4 w-4" aria-hidden="true" />,
  info: <Info className="h-4 w-4" aria-hidden="true" />,
  organic: <Leaf className="h-4 w-4" aria-hidden="true" />,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", dismissible = false, onDismiss, children, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true);
    const isAssertive = variant === "error";

    if (!visible) return null;

    return (
      <div
        ref={ref}
        {...props}
        role={isAssertive ? "alert" : "status"}
        aria-live={isAssertive ? "assertive" : "polite"}
        className={cn(
          "relative flex w-full items-start gap-3 rounded-xl border p-4",
          "transition-all duration-200",
          variantClasses[variant],
          className
        )}
      >
        <span className="mt-0.5 shrink-0 text-current">{variantIcons[variant]}</span>

        <div className="flex-1 space-y-1">{children}</div>

        {dismissible && (
          <button
            type="button"
            aria-label="Cerrar alerta"
            onClick={() => {
              setVisible(false);
              onDismiss?.();
            }}
            className={cn(
              "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg",
              "text-current/70 transition-colors hover:bg-black/5 hover:text-current",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pino"
            )}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("text-sm font-semibold leading-tight", className)} {...props} />
  )
);

const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm leading-relaxed", className)} {...props} />
);

Alert.displayName = "Alert";
AlertTitle.displayName = "AlertTitle";
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };