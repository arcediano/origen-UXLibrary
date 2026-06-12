/**
 * @file CategoryCard.tsx
 * @description Tarjeta de seleccion de categoria con icono, nombre y
 * descripcion. Promovido desde origen-dashboard/src/components/shared/category-card.tsx.
 *
 * A diferencia de la version local (que resolvia el icono internamente por
 * el id de categoria de productor), esta version recibe `icon` como prop
 * para no acoplar la libreria al dominio de productor — el mapeo de
 * categoria -> icono queda en el proyecto consumidor.
 */

"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface CategoryCardCategory {
  id: string;
  name: string;
  description: string;
}

export interface CategoryCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  category: CategoryCardCategory;
  /** Icono representativo de la categoria (recomendado: lucide-react h-6 w-6) */
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  /** Permite selección multiple (onboarding) o unica (registro) — uso documental, no cambia el render */
  multiple?: boolean;
}

/**
 * Tarjeta de categoria con icono, nombre y descripcion. Estado activo con
 * color corporativo `origen-pradera`.
 *
 * @example
 * <CategoryCard
 *   category={cat}
 *   icon={<Sprout className="h-6 w-6" />}
 *   isSelected={selected.includes(cat.id)}
 *   onSelect={handleSelect}
 * />
 */
export const CategoryCard = React.forwardRef<HTMLButtonElement, CategoryCardProps>(
  ({ category, icon, isSelected, onSelect, multiple, className, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) onSelect(category.id);
        }}
        className={cn(
          "group relative w-full rounded-xl border-2 bg-surface-alt p-3",
          "transition-all duration-200",
          "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/50",
          isSelected
            ? "border-origen-pradera bg-origen-pradera/[0.03] shadow-md"
            : "border-border-subtle hover:border-origen-pradera",
          className
        )}
        aria-pressed={isSelected}
        {...props}
      >
        {isSelected && (
          <div className="absolute right-2 top-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-origen-pradera shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all",
              isSelected
                ? "bg-gradient-to-br from-origen-pradera to-origen-hoja text-white shadow-md"
                : "bg-gradient-to-br from-origen-crema to-origen-pastel text-origen-bosque group-hover:scale-110"
            )}
            aria-hidden="true"
          >
            {icon}
          </div>

          <div className="w-full">
            <h3 className={cn("text-sm font-semibold leading-tight", isSelected ? "text-origen-bosque" : "text-foreground")}>
              {category.name}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-text-subtle">{category.description}</p>
          </div>
        </div>
      </button>
    );
  }
);

CategoryCard.displayName = "CategoryCard";
