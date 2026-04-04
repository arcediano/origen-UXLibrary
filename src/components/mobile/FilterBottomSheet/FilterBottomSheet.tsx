"use client";

import * as React from "react";
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

  // Lock body scroll and auto-focus when opening
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Defer focus so the element is rendered before we try to focus it
      const id = setTimeout(() => panelRef.current?.focus(), 0);
      return () => {
        clearTimeout(id);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // Escape key handler
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-origen-oscuro/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal={true}
        aria-label={title ?? "Panel de filtros"}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full bg-surface-alt rounded-t-3xl shadow-origen-lg",
          "flex flex-col max-h-[90dvh] focus:outline-none",
          className
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-border-subtle" />
        </div>

        {/* Header */}
        {title && (
          <div className="px-6 pt-2 pb-4 border-b border-border-subtle">
            <h2 className="text-body font-semibold text-origen-bosque">{title}</h2>
            {description && (
              <p className="text-small text-text-subtle mt-0.5">{description}</p>
            )}
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer with iOS safe-area padding */}
        {footer && (
          <div className="px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-border-subtle">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

FilterBottomSheet.displayName = "FilterBottomSheet";
