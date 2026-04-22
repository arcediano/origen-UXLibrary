"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../Button";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConfirmDialogProps {
  /** Controls open state */
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /** Main title */
  title: string;
  /** Subtitle below title */
  description?: string;

  /** Highlighted block — small-caps label */
  highlightLabel?: string;
  /** Highlighted block — bold value */
  highlightValue?: string;

  /** Body paragraph */
  body?: string;

  /** Confirm button label */
  confirmLabel?: string;
  /** danger = red destructive; primary = green standard */
  confirmVariant?: "danger" | "primary";
  /** Called when user clicks confirm */
  onConfirm: () => void;

  /** Shows spinner on confirm button */
  isLoading?: boolean;
  /** Label shown while loading */
  loadingLabel?: string;

  /** Cancel button label */
  cancelLabel?: string;
  /** Called when user clicks cancel */
  onCancel?: () => void;

  /** Inline error message */
  error?: string | null;

  /** Lucide icon rendered inside the badge */
  icon?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  highlightLabel,
  highlightValue,
  body,
  confirmLabel = "Confirmar",
  confirmVariant = "primary",
  onConfirm,
  isLoading = false,
  loadingLabel = "Procesando...",
  cancelLabel = "Cancelar",
  onCancel,
  error,
  icon,
}: ConfirmDialogProps) {
  const isDanger = confirmVariant === "danger";
  const [mounted, setMounted] = React.useState(false);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Animate in/out
  React.useEffect(() => {
    if (!open) { setEntered(false); return; }
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Escape key
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  if (!mounted || !open) return null;

  return createPortal(
    /* ── Overlay — always centered, mx-4 prevents touching screen edges ── */
    <div
      className={cn(
        "fixed inset-0 z-[80] flex items-center justify-center p-4",
        "bg-origen-oscuro/60 backdrop-blur-sm",
        "transition-opacity duration-200",
        entered ? "opacity-100" : "opacity-0"
      )}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onOpenChange(false); }}
      role="presentation"
    >
      {/* ── Modal panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative w-full max-w-sm",
          "rounded-2xl border border-border bg-surface-alt shadow-2xl",
          "p-6",                          // ← internal padding on the panel itself
          "transition-all duration-200",
          entered ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >

        {/* ── Icon + Title + Description ──────────────────────────────────── */}
        <div className="flex flex-col items-center text-center">
          {icon && (
            <div
              className={cn(
                "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
                isDanger ? "bg-feedback-danger-subtle" : "bg-origen-pradera/10"
              )}
            >
              <span className={isDanger ? "text-feedback-danger" : "text-origen-pradera"}>
                {icon}
              </span>
            </div>
          )}

          <h2 className="text-lg font-semibold text-origen-bosque">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {/* ── Highlight block ─────────────────────────────────────────────── */}
        {highlightValue && (
          <div className="mt-4 rounded-xl border border-origen-pradera/20 bg-origen-crema/60 px-4 py-3">
            {highlightLabel && (
              <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-text-subtle">
                {highlightLabel}
              </p>
            )}
            <p className="text-sm font-semibold text-origen-bosque">{highlightValue}</p>
          </div>
        )}

        {/* ── Body text ───────────────────────────────────────────────────── */}
        {body && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
        )}

        {/* ── Error ───────────────────────────────────────────────────────── */}
        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-feedback-danger/20 bg-feedback-danger-subtle px-3 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-feedback-danger" />
            <p className="text-xs text-feedback-danger">{error}</p>
          </div>
        )}

        {/* ── Buttons ─────────────────────────────────────────────────────── */}
        <div className="mt-6 flex gap-3">

          {/* Cancel */}
          <Button
            variant="outline"
            className="flex-1 rounded-xl border-border hover:border-origen-pradera hover:text-origen-pradera"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>

          {/* Confirm — danger: native <button> so text-white is guaranteed */}
          {isDanger ? (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2",
                "h-11 rounded-xl px-5 text-sm font-semibold text-white",
                "bg-feedback-danger hover:bg-feedback-danger/90",
                "transition-all duration-200 active:scale-[0.98]",
                "border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-feedback-danger/50 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-60"
              )}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" aria-hidden />
                  <span>{loadingLabel}</span>
                </>
              ) : (
                <span>{confirmLabel}</span>
              )}
            </button>
          ) : (
            <Button
              variant="primary"
              className="flex-1 rounded-xl"
              onClick={onConfirm}
              disabled={isLoading}
              loading={isLoading}
              loadingText={loadingLabel}
            >
              {confirmLabel}
            </Button>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}

ConfirmDialog.displayName = "ConfirmDialog";
