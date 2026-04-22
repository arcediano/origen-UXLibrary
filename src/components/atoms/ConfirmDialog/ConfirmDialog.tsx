"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Dialog, DialogContent } from "../Dialog";
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

  /** Highlighted block — label (small caps) */
  highlightLabel?: string;
  /** Highlighted block — value (bold) */
  highlightValue?: string;

  /** Warning body paragraph */
  body?: string;

  /** Confirm button label */
  confirmLabel?: string;
  /** danger = red (destructive actions); primary = green (standard actions) */
  confirmVariant?: "danger" | "primary";
  /** Called when user clicks confirm */
  onConfirm: () => void;

  /** Shows spinner on confirm button */
  isLoading?: boolean;
  /** Label shown while loading */
  loadingLabel?: string;

  /** Cancel button label */
  cancelLabel?: string;
  /** Called when user clicks cancel (onOpenChange(false) is always called too) */
  onCancel?: () => void;

  /** Inline error message */
  error?: string | null;

  /** Lucide React node rendered inside the badge icon */
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

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm" showCloseButton={false}>
        <div className="p-6">

          {/* ── Icon + Title + Description ─────────────────────────────────── */}
          <div className="flex flex-col items-center text-center">
            {icon && (
              <div
                className={cn(
                  "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
                  isDanger
                    ? "bg-feedback-danger-subtle"
                    : "bg-origen-pradera/10"
                )}
              >
                <span
                  className={cn(
                    isDanger ? "text-feedback-danger" : "text-origen-pradera"
                  )}
                >
                  {icon}
                </span>
              </div>
            )}

            <h2 className="text-lg font-semibold text-origen-bosque text-center">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground text-center">
                {description}
              </p>
            )}
          </div>

          {/* ── Highlight block ────────────────────────────────────────────── */}
          {highlightValue && (
            <div className="mt-4 rounded-xl border border-origen-pradera/20 bg-origen-crema/60 px-4 py-3">
              {highlightLabel && (
                <p className="mb-0.5 text-[11px] uppercase tracking-wide text-text-subtle">
                  {highlightLabel}
                </p>
              )}
              <p className="text-sm font-semibold text-origen-bosque">
                {highlightValue}
              </p>
            </div>
          )}

          {/* ── Body text ──────────────────────────────────────────────────── */}
          {body && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          )}

          {/* ── Error block ────────────────────────────────────────────────── */}
          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-feedback-danger/20 bg-feedback-danger-subtle px-3 py-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-feedback-danger" />
              <p className="text-xs text-feedback-danger">{error}</p>
            </div>
          )}

          {/* ── Action buttons ─────────────────────────────────────────────── */}
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

            {/* Confirm — danger: native button with CSS var to guarantee white text */}
            {isDanger ? (
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2",
                  "h-11 rounded-xl px-5 text-sm font-semibold",
                  "transition-all duration-300 active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  "border-0 disabled:pointer-events-none disabled:opacity-70"
                )}
                style={{
                  backgroundColor: "var(--feedback-danger)",
                  color: "#ffffff",
                }}
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
              /* Confirm — primary: use Button component */
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
      </DialogContent>
    </Dialog>
  );
}

ConfirmDialog.displayName = "ConfirmDialog";
