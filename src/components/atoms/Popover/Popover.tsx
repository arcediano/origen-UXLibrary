"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/utils";

// ─── Context ──────────────────────────────────────────────────────────────────

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined);

function usePopoverContext(): PopoverContextType {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used inside Popover");
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type PopoverAlign = "start" | "center" | "end";
export type PopoverSide = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: PopoverAlign;
  side?: PopoverSide;
  sideOffset?: number;
}

// ─── Popover ──────────────────────────────────────────────────────────────────

const Popover = ({ open, defaultOpen = false, onOpenChange, children }: PopoverProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <PopoverContext.Provider value={{ open: currentOpen, setOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
};

// ─── PopoverTrigger ───────────────────────────────────────────────────────────

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild = false, onClick, children, className, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef } = usePopoverContext();

    const setRefs = React.useCallback(
      (el: HTMLButtonElement | null) => {
        triggerRef.current = el;
        if (typeof forwardedRef === "function") forwardedRef(el);
        else if (forwardedRef) forwardedRef.current = el;
      },
      [triggerRef, forwardedRef]
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        onClick?: React.MouseEventHandler<HTMLElement>;
        ref?: React.Ref<HTMLButtonElement>;
      }>;
      return React.cloneElement(child, {
        ref: setRefs as React.Ref<HTMLButtonElement>,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          child.props.onClick?.(e);
          if (!e.defaultPrevented) setOpen(!open);
        },
      });
    }

    return (
      <button
        ref={setRefs}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) setOpen(!open);
        }}
        className={cn("min-h-[44px] min-w-[44px]", className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// ─── PopoverContent ───────────────────────────────────────────────────────────

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { align = "start", side = "bottom", sideOffset = 8, className, children, ...props },
    forwardedRef
  ) => {
    const { open, setOpen, triggerRef } = usePopoverContext();
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = React.useState(false);
    const [entered, setEntered] = React.useState(false);
    const [style, setStyle] = React.useState<React.CSSProperties>({});

    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    React.useEffect(() => {
      if (!open) { setEntered(false); return; }
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }, [open]);

    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const next: React.CSSProperties = { position: "fixed", zIndex: 9999 };

      if (side === "bottom") {
        next.top = rect.bottom + sideOffset;
      } else if (side === "top") {
        next.bottom = window.innerHeight - rect.top + sideOffset;
      } else if (side === "right") {
        next.left = rect.right + sideOffset;
        next.top = rect.top;
      } else {
        next.right = window.innerWidth - rect.left + sideOffset;
        next.top = rect.top;
      }

      if (side === "bottom" || side === "top") {
        if (align === "start") next.left = rect.left;
        else if (align === "end") next.right = window.innerWidth - rect.right;
        else { next.left = rect.left + rect.width / 2; next.transform = "translateX(-50%)"; }
      }

      setStyle(next);
    }, [triggerRef, side, sideOffset, align]);

    React.useEffect(() => {
      if (!open) return;
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [open, updatePosition]);

    React.useEffect(() => {
      if (!open) return;
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          contentRef.current && !contentRef.current.contains(target) &&
          triggerRef.current && !triggerRef.current.contains(target)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen, triggerRef]);

    React.useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, setOpen]);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    if (!mounted || !open) return null;

    return createPortal(
      <div
        ref={setRefs}
        role="dialog"
        aria-modal="false"
        style={style}
        className={cn(
          "rounded-xl border border-border bg-surface-alt shadow-2xl",
          "transition-all duration-200",
          entered ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
        {...props}
      >
        {children}
      </div>,
      document.body
    );
  }
);

// ─── PopoverClose ─────────────────────────────────────────────────────────────

const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, children, className, ...props }, ref) => {
  const { setOpen } = usePopoverContext();
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpen(false);
      }}
      className={cn("min-h-[44px] min-w-[44px]", className)}
      {...props}
    >
      {children}
    </button>
  );
});

// ─── Display names ────────────────────────────────────────────────────────────

Popover.displayName = "Popover";
PopoverTrigger.displayName = "PopoverTrigger";
PopoverContent.displayName = "PopoverContent";
PopoverClose.displayName = "PopoverClose";

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
