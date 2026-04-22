"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function FilterBottomSheet({
  open,
  onClose,
  title,
  description,
  footer,
  children,
  className,
}: FilterBottomSheetProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  // Mount/unmount with transition buffer
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const id = setTimeout(() => setMounted(false), 360);
      return () => clearTimeout(id);
    }
  }, [open]);

  // iOS-compatible scroll lock: position:fixed + top offset avoids jumps on Safari
  React.useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Escape key
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Auto-focus panel when opened
  React.useEffect(() => {
    if (open) {
      const id = setTimeout(() => panelRef.current?.focus(), 0);
      return () => clearTimeout(id);
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.28s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
        aria-hidden
        onPointerDown={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal
        aria-label={title ?? "Panel de filtros"}
        tabIndex={-1}
        onPointerDown={(e) => e.stopPropagation()}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[51]",
          "flex flex-col max-h-[92dvh]",
          "bg-surface-alt rounded-t-3xl shadow-origen-lg focus:outline-none",
          className
        )}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.36s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="h-1 w-10 rounded-full bg-border-subtle" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex-shrink-0 px-6 pt-2 pb-4 border-b border-border-subtle">
            <h2 className="text-base font-semibold text-origen-bosque">{title}</h2>
            {description && (
              <p className="text-sm text-text-subtle mt-0.5">{description}</p>
            )}
          </div>
        )}

        {/* Scrollable content */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-6 py-4"
          style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {children}
        </div>

        {/* Footer with iOS safe-area */}
        {footer && (
          <div
            className="flex-shrink-0 px-6 pt-4 border-t border-border-subtle bg-surface-alt"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

FilterBottomSheet.displayName = "FilterBottomSheet";
