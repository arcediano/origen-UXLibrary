"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../atoms/Button";
import type { ButtonProps } from "../../atoms/Button";

export interface ActionBarAction {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: ButtonProps["variant"];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export interface ActionBarProps extends React.HTMLAttributes<HTMLElement> {
  primaryAction: ActionBarAction;
  secondaryActions?: ActionBarAction[];
  fixed?: boolean;
  showOnDesktop?: boolean;
}

const ActionBar = React.forwardRef<HTMLElement, ActionBarProps>(
  (
    {
      className,
      primaryAction,
      secondaryActions = [],
      fixed = true,
      showOnDesktop = false,
      ...props
    },
    ref
  ) => {
    const hasSecondaryActions = secondaryActions.length > 0;

    return (
      <nav
        ref={ref}
        aria-label="Barra de acciones"
        className={cn(
          "w-full border-t border-border bg-surface-alt/95 backdrop-blur-sm",
          "px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]",
          showOnDesktop ? "" : "lg:hidden",
          fixed && "fixed bottom-0 inset-x-0 z-50",
          className
        )}
        {...props}
      >
        <div className="mx-auto w-full max-w-5xl space-y-2">
          <Button
            type="button"
            variant={primaryAction.variant ?? "primary"}
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            loading={primaryAction.loading}
            loadingText={primaryAction.loadingText}
            leftIcon={primaryAction.leftIcon}
            rightIcon={primaryAction.rightIcon}
            className={cn("w-full h-12", primaryAction.className)}
          >
            {primaryAction.label}
          </Button>

          {hasSecondaryActions && (
            <div className="flex items-center gap-2">
              {secondaryActions.map((action) => (
                <Button
                  key={action.id}
                  type="button"
                  variant={action.variant ?? "ghost"}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  loading={action.loading}
                  loadingText={action.loadingText}
                  leftIcon={action.leftIcon}
                  rightIcon={action.rightIcon}
                  className={cn("h-11 flex-1", action.className)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }
);

ActionBar.displayName = "ActionBar";

export { ActionBar };
