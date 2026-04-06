/**
 * @file AlertDialog.tsx
 * @description Diálogo de alerta premium - 100% responsive
 */

"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { X, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface AlertDialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const AlertDialogContext = React.createContext<
  AlertDialogContextType | undefined
>(undefined);

const useAlertDialog = () => {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlertDialog debe usarse dentro de un AlertDialog");
  }
  return context;
};

interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const AlertDialog = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const titleId = React.useId();
  const descriptionId = React.useId();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange: handleOpenChange, titleId, descriptionId }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

AlertDialog.displayName = "AlertDialog";

interface AlertDialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const AlertDialogTrigger = ({
  children,
  onClick,
  className,
  asChild,
}: AlertDialogTriggerProps) => {
  const { onOpenChange } = useAlertDialog();

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler<HTMLElement>;
    }>;

    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        handleClick(e);
      },
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("inline-flex min-h-[44px] min-w-[44px] items-center justify-center", className)}
    >
      {children}
    </button>
  );
};

AlertDialogTrigger.displayName = "AlertDialogTrigger";

interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showClose?: boolean;
  variant?: "default" | "warning" | "success" | "info";
  size?: "sm" | "md" | "lg";
}

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(
  (
    {
      className,
      children,
      showClose = true,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange, titleId, descriptionId } = useAlertDialog();

    const variantClasses = {
      default:
        "bg-white border border-origin-pradera/30 text-origin-oscuro",
      warning:
        "bg-yellow-50 border border-yellow-200 text-yellow-900",
      success:
        "bg-green-50 border border-green-200 text-green-900",
      info: "bg-blue-50 border border-blue-200 text-blue-900",
    };

    const sizeClasses = {
      sm: "max-w-sm p-4",
      md: "max-w-md p-6",
      lg: "max-w-lg p-8",
    };

    const iconMap = {
      warning: <AlertTriangle className="h-5 w-5" />,
      success: <CheckCircle className="h-5 w-5" />,
      info: <Info className="h-5 w-5" />,
      default: null,
    };

    if (!open) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in-0"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onOpenChange(false);
          }
        }}
      >
        <div
          ref={ref}
          {...props}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "relative rounded-xl shadow-lg animate-in zoom-in-95",
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
        >
          {showClose && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-lg p-1 hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="flex gap-4">
            {variant !== "default" && (
              <div className="shrink-0">{iconMap[variant as keyof typeof iconMap]}</div>
            )}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

AlertDialogContent.displayName = "AlertDialogContent";

interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  AlertDialogHeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 mb-4", className)}
    {...props}
  />
));

AlertDialogHeader.displayName = "AlertDialogHeader";

interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => {
  const { titleId } = useAlertDialog();
  return (
    <h2
      ref={ref}
      {...props}
      id={titleId}
      className={cn("text-lg font-semibold", className)}
    />
  );
});

AlertDialogTitle.displayName = "AlertDialogTitle";

interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useAlertDialog();
  return (
    <p ref={ref} {...props} id={descriptionId} className={cn("text-sm opacity-90", className)} />
  );
});

AlertDialogDescription.displayName = "AlertDialogDescription";

interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-3 mt-6 justify-end", className)}
    {...props}
  />
));

AlertDialogFooter.displayName = "AlertDialogFooter";

interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ onClick, ...props }, ref) => {
  const { onOpenChange } = useAlertDialog();

  return (
    <Button
      ref={ref}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        onOpenChange(false);
      }}
      {...props}
    />
  );
});

AlertDialogAction.displayName = "AlertDialogAction";

interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ onClick, ...props }, ref) => {
  const { onOpenChange } = useAlertDialog();

  return (
    <Button
      ref={ref}
      variant="outline"
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        onOpenChange(false);
      }}
      {...props}
    />
  );
});

AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

export type { AlertDialogProps, AlertDialogContentProps };
