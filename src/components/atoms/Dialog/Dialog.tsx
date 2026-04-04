"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const FOCUSABLE = [
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function useFocusTrap(isOpen: boolean, containerRef: React.RefObject<HTMLDivElement | null>): void {
  React.useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;

    const focusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => getComputedStyle(el).display !== "none"
      );

    focusable()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, containerRef]);
}

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  titleId: string;
  descriptionId: string;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

function useDialogContext(): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used inside Dialog");
  }
  return context;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
}

const Dialog = ({ open, defaultOpen = false, onOpenChange, children }: DialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open: currentOpen, setOpen, contentRef, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild = false, onClick, children, className, ...props }, ref) => {
    const { open, setOpen } = useDialogContext();

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>;
      return React.cloneElement(child, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          child.props.onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        },
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        }}
        className={cn("min-h-[44px] min-w-[44px]", className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    { className, children, closeOnOutsideClick = true, showCloseButton = true, ...props },
    forwardedRef
  ) => {
    const { open, setOpen, contentRef, titleId, descriptionId } = useDialogContext();
    const isMobile = useIsMobile();
    const [mounted, setMounted] = React.useState(false);
    const [entered, setEntered] = React.useState(false);

    useFocusTrap(open, contentRef);

    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    React.useEffect(() => {
      if (!open) {
        setEntered(false);
        return;
      }
      const raf = window.requestAnimationFrame(() => setEntered(true));
      return () => window.cancelAnimationFrame(raf);
    }, [open]);

    React.useEffect(() => {
      if (!open) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, setOpen]);

    React.useEffect(() => {
      if (!open) return;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }, [open]);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [contentRef, forwardedRef]
    );

    if (!open || !mounted) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-origen-oscuro/60 p-4 backdrop-blur-sm"
        onMouseDown={
          closeOnOutsideClick
            ? (event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }
            : undefined
        }
      >
        <div
          ref={setRefs}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "relative w-full border border-border bg-surface-alt shadow-2xl",
            "transition-transform duration-300 ease-out",
            isMobile
              ? cn(
                  "fixed bottom-0 inset-x-0 max-h-[90dvh] rounded-t-3xl",
                  entered ? "translate-y-0" : "translate-y-full"
                )
              : cn("max-w-lg rounded-2xl", entered ? "translate-y-0" : "translate-y-4"),
            className
          )}
          {...props}
        >
          {isMobile && (
            <div className="mx-auto mb-2 mt-3 h-1 w-10 rounded-full bg-border-subtle" aria-hidden />
          )}

          {showCloseButton && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-3 top-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {children}
        </div>
      </div>,
      document.body
    );
  }
);

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-b border-border-subtle px-6 pb-3 pt-5", className)} {...props} />
  )
);

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDialogContext();
    return (
      <h2 ref={ref} id={titleId} className={cn("text-lg font-semibold text-origen-bosque", className)} {...props} />
    );
  }
);

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDialogContext();
    return <p ref={ref} id={descriptionId} className={cn("mt-1 text-sm text-text-subtle", className)} {...props} />;
  }
);

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-3 border-t border-border-subtle px-6 py-4", className)}
      {...props}
    />
  )
);

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild = false, onClick, children, className, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>;
      return React.cloneElement(child, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          child.props.onClick?.(event);
          if (!event.defaultPrevented) setOpen(false);
        },
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(false);
        }}
        className={cn("min-h-[44px] min-w-[44px]", className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";
DialogContent.displayName = "DialogContent";
DialogHeader.displayName = "DialogHeader";
DialogTitle.displayName = "DialogTitle";
DialogDescription.displayName = "DialogDescription";
DialogFooter.displayName = "DialogFooter";
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
