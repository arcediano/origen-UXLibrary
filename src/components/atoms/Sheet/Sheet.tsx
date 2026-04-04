"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetSide = "left" | "right" | "top" | "bottom";

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
        (element) => getComputedStyle(element).display !== "none"
      );

    focusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
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

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  titleId: string;
  descriptionId: string;
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined);

function useSheetContext(): SheetContextValue {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used inside Sheet");
  }
  return context;
}

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: SheetSide;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
}

const Sheet = ({ open, defaultOpen = false, onOpenChange, children }: SheetProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const contentRef = React.useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
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
    <SheetContext.Provider value={{ open: currentOpen, setOpen, contentRef, titleId, descriptionId }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ asChild = false, onClick, children, className, ...props }, ref) => {
    const { open, setOpen } = useSheetContext();

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

const sidePositionClasses: Record<SheetSide, string> = {
  right: "inset-y-0 right-0 h-full w-[85vw] sm:w-full sm:max-w-sm border-l",
  left: "inset-y-0 left-0 h-full w-[85vw] sm:w-full sm:max-w-sm border-r",
  top: "inset-x-0 top-0 w-full border-b",
  bottom: "inset-x-0 bottom-0 w-full border-t",
};

function getTranslateClass(side: SheetSide, entered: boolean): string {
  if (entered) return "translate-x-0 translate-y-0";
  if (side === "right") return "translate-x-full";
  if (side === "left") return "-translate-x-full";
  if (side === "top") return "-translate-y-full";
  return "translate-y-full";
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, closeOnOutsideClick = true, showCloseButton = true, ...props }, forwardedRef) => {
    const { open, setOpen, contentRef, titleId, descriptionId } = useSheetContext();
    const [mounted, setMounted] = React.useState(false);
    const [entered, setEntered] = React.useState(false);

    const touchStartX = React.useRef<number | null>(null) as React.MutableRefObject<number | null>;
    const touchStartY = React.useRef<number | null>(null) as React.MutableRefObject<number | null>;

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

    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

    const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
      if (!isMobile) return;
      touchStartX.current = event.touches[0]?.clientX ?? null;
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
      if (!isMobile || touchStartX.current === null || touchStartY.current === null) return;

      const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
      const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
      const deltaX = endX - touchStartX.current;
      const deltaY = endY - touchStartY.current;
      const threshold = 50;

      const shouldClose =
        (side === "right" && deltaX > threshold) ||
        (side === "left" && deltaX < -threshold) ||
        (side === "top" && deltaY < -threshold) ||
        (side === "bottom" && deltaY > threshold);

      if (shouldClose) setOpen(false);

      touchStartX.current = null;
      touchStartY.current = null;
    };

    if (!open || !mounted) return null;

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-[80]",
          "bg-origen-oscuro/60 backdrop-blur-sm",
          entered ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300"
        )}
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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "fixed z-[81] bg-white p-4 shadow-2xl transition-transform duration-300 ease-out sm:p-6",
            sidePositionClasses[side],
            getTranslateClass(side, entered),
            className
          )}
          {...props}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn(
                "absolute right-3 top-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg",
                "text-muted-foreground transition-colors hover:bg-origen-crema hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45"
              )}
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          {children}
        </div>
      </div>,
      document.body
    );
  }
);

const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4 flex flex-col space-y-2 text-left", className)} {...props} />
  )
);

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { titleId } = useSheetContext();
    return <h2 ref={ref} id={titleId} className={cn("text-lg font-semibold text-origen-bosque", className)} {...props} />;
  }
);

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useSheetContext();
    return <p ref={ref} id={descriptionId} className={cn("text-sm text-text-subtle", className)} {...props} />;
  }
);

const SheetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end", className)} {...props} />
  )
);

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ asChild = false, onClick, children, className, ...props }, ref) => {
    const { setOpen } = useSheetContext();

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

SheetTrigger.displayName = "SheetTrigger";
SheetContent.displayName = "SheetContent";
SheetHeader.displayName = "SheetHeader";
SheetTitle.displayName = "SheetTitle";
SheetDescription.displayName = "SheetDescription";
SheetFooter.displayName = "SheetFooter";
SheetClose.displayName = "SheetClose";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
};