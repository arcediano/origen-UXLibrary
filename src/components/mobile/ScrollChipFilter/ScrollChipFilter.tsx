"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ScrollChipItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ScrollChipFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ScrollChipItem[];
  value?: string | string[];
  multiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
  hasAll?: boolean;
  allLabel?: string;
}

const ALL_ID = "__all__";

export const ScrollChipFilter = React.forwardRef<HTMLDivElement, ScrollChipFilterProps>(
  (
    {
      items,
      value,
      multiple = false,
      onValueChange,
      hasAll = false,
      allLabel = "Todos",
      className,
      ...props
    },
    ref
  ) => {
    const activeValues = React.useMemo<string[]>(() => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    }, [value]);

    const isActive = (id: string) => {
      if (id === ALL_ID) return activeValues.length === 0;
      return activeValues.includes(id);
    };

    const handleSelect = (id: string) => {
      if (id === ALL_ID) {
        onValueChange?.(multiple ? [] : "");
        return;
      }
      if (multiple) {
        const current = Array.isArray(value) ? value : [];
        const next = current.includes(id)
          ? current.filter((v) => v !== id)
          : [...current, id];
        onValueChange?.(next);
      } else {
        const current = Array.isArray(value) ? value[0] : value;
        onValueChange?.(current === id ? "" : id);
      }
    };

    const chipItems: ScrollChipItem[] = hasAll
      ? [{ id: ALL_ID, label: allLabel }, ...items]
      : items;

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Filtros"
        className={cn(
          "flex gap-2 overflow-x-auto px-4 py-2",
          "[&::-webkit-scrollbar]:hidden",
          className
        )}
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
        {...props}
      >
        {chipItems.map((item) => {
          const active = isActive(item.id);
          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={active}
              disabled={item.disabled}
              onClick={() => handleSelect(item.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2",
                "text-small font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-1",
                active
                  ? "bg-gradient-origen text-white shadow-subtle"
                  : "bg-surface-alt text-origen-bosque hover:bg-origen-pastel/60 border border-border-subtle",
                item.disabled && "pointer-events-none opacity-45"
              )}
            >
              {item.icon && (
                <span className="flex items-center justify-center" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }
);

ScrollChipFilter.displayName = "ScrollChipFilter";
