"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ScrollChipItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: number;
}

export interface ScrollChipFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ScrollChipItem[];
  value?: string | string[];
  multiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
  hasAll?: boolean;
  allLabel?: string;
  size?: "sm" | "md";
  /**
   * Render prop opcional para personalizar el elemento raíz de cada chip.
   * Cuando se proporciona, reemplaza el <button> interno, permitiendo usar <Link> u otros elementos.
   * El componente mantiene los estilos y el contenedor scroll.
   * @example
   * renderItem={(item, { active, handleSelect }) => (
   *   <Link href={`/section/${item.id}`} className={getChipClassName(item, active)}>
   *     {item.label}
   *   </Link>
   * )}
   */
  renderItem?: (
    item: ScrollChipItem,
    state: {
      active: boolean;
      handleSelect: () => void;
      chipClassName: string;
    }
  ) => React.ReactNode;
}

const ALL_ID = "__all__";

const SIZE_CLASSES: Record<"sm" | "md", string> = {
  sm: "px-4 py-2",
  md: "px-4 py-2.5 min-h-11",
};

export const ScrollChipFilter = React.forwardRef<HTMLDivElement, ScrollChipFilterProps>(
  (
    {
      items,
      value,
      multiple = false,
      onValueChange,
      hasAll = false,
      allLabel = "Todos",
      size = "md",
      className,
      renderItem,
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

    const getChipClassName = (item: ScrollChipItem, active: boolean): string => {
      return cn(
        "relative inline-flex shrink-0 items-center gap-1.5 rounded-full",
        SIZE_CLASSES[size],
        "text-small font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-1",
        active
          ? "bg-gradient-origen text-white shadow-subtle"
          : "bg-surface-alt text-origen-bosque hover:bg-origen-pastel/60 border border-border-subtle",
        item.disabled && "pointer-events-none opacity-45"
      );
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
          const chipClassName = getChipClassName(item, active);

          if (renderItem) {
            return (
              <div key={item.id} className="shrink-0">
                {renderItem(item, {
                  active,
                  handleSelect: () => handleSelect(item.id),
                  chipClassName,
                })}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={active}
              disabled={item.disabled}
              onClick={() => handleSelect(item.id)}
              className={chipClassName}
            >
              {item.icon && (
                <span className="flex items-center justify-center" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
              {item.badge != null && item.badge > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-feedback-danger px-1 text-[10px] font-semibold text-white"
                  aria-hidden
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

ScrollChipFilter.displayName = "ScrollChipFilter";
