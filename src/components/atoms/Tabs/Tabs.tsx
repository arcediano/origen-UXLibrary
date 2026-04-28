"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  orientation: "horizontal" | "vertical";
  baseId: string;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>.");
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

function useControllableState({
  value,
  defaultValue,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange]
  );

  return [currentValue, setValue] as const;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    const baseId = React.useId();
    const [currentValue, setCurrentValue] = useControllableState({
      value,
      defaultValue,
      onChange: onValueChange,
    });

    return (
      <TabsContext.Provider
        value={{
          value: currentValue,
          setValue: setCurrentValue,
          orientation,
          baseId,
        }}
      >
        <div
          ref={ref}
          data-orientation={orientation}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, fullWidth = false, ...props }, ref) => {
    const { orientation } = useTabsContext();

    return (
      <div
        ref={ref}
        {...props}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "inline-flex rounded-2xl border border-border-subtle bg-surface-alt/90 p-1 shadow-subtle",
          orientation === "horizontal" && "flex-row gap-1",
          orientation === "vertical" && "flex-col gap-1",
          fullWidth && "flex w-full",
          className
        )}
      />
    );
  }
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, onClick, onKeyDown, ...props }, ref) => {
    const { value: currentValue, setValue, baseId, orientation } = useTabsContext();
    const isActive = currentValue === value;

    const moveToSibling = (currentTarget: HTMLButtonElement, nextIndex: number) => {
      const tabList = currentTarget.closest('[role="tablist"]');
      if (!tabList) return;
      const tabs = Array.from(tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
      if (tabs.length === 0) return;
      const normalizedIndex = (nextIndex + tabs.length) % tabs.length;
      const nextTab = tabs[normalizedIndex];
      nextTab.focus();
      const nextValue = nextTab.getAttribute("data-value");
      if (nextValue) {
        setValue(nextValue);
      }
    };

    return (
      <button
        ref={ref}
        {...props}
        type="button"
        role="tab"
        id={`${baseId}-tab-${value}`}
        data-value={value}
        aria-selected={isActive}
        aria-controls={`${baseId}-panel-${value}`}
        data-state={isActive ? "active" : "inactive"}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          "relative inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5 text-small font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pino focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:text-origen-bosque/65 disabled:hover:bg-transparent disabled:hover:text-origen-bosque/65",
          "whitespace-nowrap",
          isActive
            ? "bg-gradient-origen text-white shadow-origen"
            : "text-origen-pino hover:bg-origen-pastel/80 hover:text-origen-bosque",
          className
        )}
        onClick={(event) => {
          setValue(value);
          onClick?.(event);
        }}
        onKeyDown={(event) => {
          const target = event.currentTarget;
          const tabList = target.closest('[role="tablist"]');
          const tabs = tabList ? Array.from(tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')) : [];
          const currentIndex = tabs.findIndex((tab) => tab === target);

          if (currentIndex >= 0) {
            const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
            const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";

            if (event.key === previousKey) {
              event.preventDefault();
              moveToSibling(target, currentIndex - 1);
              return;
            }

            if (event.key === nextKey) {
              event.preventDefault();
              moveToSibling(target, currentIndex + 1);
              return;
            }

            if (event.key === "Home") {
              event.preventDefault();
              moveToSibling(target, 0);
              return;
            }

            if (event.key === "End") {
              event.preventDefault();
              moveToSibling(target, tabs.length - 1);
              return;
            }
          }

          onKeyDown?.(event);
        }}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: currentValue, baseId } = useTabsContext();
    const isActive = currentValue === value;

    if (!isActive) {
      return null;
    }

    return (
      <div
        ref={ref}
        {...props}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-tab-${value}`}
        tabIndex={0}
        className={cn("mt-4 outline-none animate-fade-in", className)}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };