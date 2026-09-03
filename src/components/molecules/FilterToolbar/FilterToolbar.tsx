/**
 * @file FilterToolbar.tsx
 * @description Barra superior de filtros — patrón canónico (sección 4 del
 * manual "Bosque Comercial"): `SearchInput` + botón "Filtros" (móvil/tablet,
 * con badge de contador) + slot de acciones opcional (p. ej. toggle
 * grid/lista).
 *
 * Se usa junto a `ActiveFilterChips` (chips de filtros activos) y
 * `FilterSheet` (panel de filtros para móvil/tablet) en cualquier listado
 * con filtros (Productos, Pedidos, Reseñas, etc.). Los filtros de escritorio
 * (Select, DateInput, etc.) permanecen en el bloque `hidden lg:flex` de cada
 * pantalla — son específicos del dominio y no se promueven.
 *
 * Responsive:
 * - Móvil (`<sm`, ~375px): `SearchInput` ocupa una fila completa propia
 *   (`basis-full`); el botón "Filtros" y el slot `actions` bajan a una
 *   segunda fila (el contenedor usa `flex-wrap`).
 * - Tablet/Desktop (`≥sm`, ~640px en adelante): una sola fila — `SearchInput`
 *   ocupa el espacio disponible (`flex-1`), seguido del botón "Filtros" (con
 *   badge de contador si `activeFilterCount > 0`) y el slot `actions`.
 * - El botón "Filtros" nativo se muestra en todos los breakpoints mientras
 *   se pase `onOpenFilters` — no se oculta automáticamente en desktop. Si la
 *   pantalla consumidora ya tiene una barra de filtros inline siempre
 *   visible en desktop, envolver todo el componente en `lg:hidden` desde el
 *   consumidor (patrón usado en origen-dashboard).
 *
 * @example
 * ```tsx
 * <FilterToolbar
 *   searchValue={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   searchPlaceholder="Buscar por nombre o SKU..."
 *   searchAriaLabel="Buscar productos"
 *   activeFilterCount={activeCount}
 *   onOpenFilters={() => setPanelOpen(true)}
 *   actions={<ViewModeToggle ... />}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { SearchInput } from "../SearchInput";
import { cn } from "../../../lib/utils";

export interface FilterToolbarProps {
  /** Valor controlado del campo de búsqueda */
  searchValue: string;
  /** Callback controlado al cambiar el texto de búsqueda */
  onSearchChange: (value: string) => void;
  /** Callback con debounce (opcional), pasado directamente a `SearchInput` */
  onSearchDebouncedChange?: (value: string) => void;
  /** Milisegundos de debounce de `onSearchDebouncedChange`. Por defecto 300 */
  searchDebounceMs?: number;
  /** Placeholder del campo de búsqueda */
  searchPlaceholder?: string;
  /** `aria-label` del campo de búsqueda */
  searchAriaLabel?: string;
  /**
   * Número de filtros activos (excluyendo la búsqueda). Si es > 0, el botón
   * "Filtros" se muestra resaltado con un badge numérico.
   */
  activeFilterCount?: number;
  /**
   * Callback al pulsar el botón "Filtros" (abre `FilterPanel`). Si se omite,
   * el botón no se renderiza — útil para pantallas sin panel de filtros.
   */
  onOpenFilters?: () => void;
  /** Texto del botón de filtros. Por defecto "Filtros" */
  filtersLabel?: string;
  /**
   * Ref al botón de filtros — necesario para anclar el popover de escritorio
   * de `FilterPanel`. Pasar el mismo ref que se pasa a `FilterPanel.triggerRef`.
   */
  filtersButtonRef?: React.Ref<HTMLButtonElement>;
  /**
   * Slot de acciones adicionales a la derecha de la toolbar (p. ej. toggle
   * de vista grid/lista). Se muestra en todos los breakpoints salvo que el
   * propio contenido incluya clases `hidden`/`lg:flex`.
   */
  actions?: React.ReactNode;
  /**
   * Modo compacto — pensado para toolbars con más de un botón junto al de
   * "Filtros" (p. ej. un botón de "Ordenar" propio vía `actions`) que si no,
   * no caben en una sola línea en móvil:
   * - La búsqueda nunca ocupa una fila propia (`flex-1` en todos los
   *   breakpoints, en vez de bajar a una segunda fila en `<sm`).
   * - El botón "Filtros" se muestra solo con icono en `<sm` (el texto
   *   reaparece en `sm:` en adelante) y el badge de contador pasa a un
   *   círculo superpuesto en la esquina en vez de inline.
   * Por defecto `false` — sin cambios para los consumidores existentes.
   */
  compact?: boolean;
  className?: string;
}

export function FilterToolbar({
  searchValue,
  onSearchChange,
  onSearchDebouncedChange,
  searchDebounceMs = 300,
  searchPlaceholder = "Buscar...",
  searchAriaLabel,
  activeFilterCount = 0,
  onOpenFilters,
  filtersLabel = "Filtros",
  filtersButtonRef,
  actions,
  compact = false,
  className,
}: FilterToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        onDebouncedChange={onSearchDebouncedChange}
        debounceMs={searchDebounceMs}
        placeholder={searchPlaceholder}
        aria-label={searchAriaLabel ?? searchPlaceholder}
        className={compact ? "flex-1 min-w-0" : "basis-full sm:flex-1 sm:basis-auto"}
        size="md"
      />

      {onOpenFilters && (
        <button
          ref={filtersButtonRef}
          type="button"
          onClick={onOpenFilters}
          aria-expanded={false}
          aria-haspopup="dialog"
          className={cn(
            "relative flex items-center gap-1.5 h-10 rounded-xl border text-sm font-medium transition-colors flex-shrink-0",
            compact ? "w-10 justify-center px-0 sm:w-auto sm:justify-start sm:px-3.5" : "px-3.5",
            activeFilterCount > 0
              ? "bg-origen-bosque border-origen-bosque text-white"
              : "bg-surface-alt border-border text-origen-bosque",
          )}
          aria-label={activeFilterCount > 0 ? `Filtros (${activeFilterCount} activos)` : "Abrir filtros"}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className={compact ? "hidden sm:inline" : undefined}>{filtersLabel}</span>
          {activeFilterCount > 0 && (
            <span
              className={cn(
                "inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold",
                compact
                  ? "absolute -top-1.5 -right-1.5 bg-white text-origen-bosque shadow-sm ring-1 ring-origen-bosque/10 sm:static sm:shadow-none sm:ring-0"
                  : "bg-white/25",
              )}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      )}

      {actions}
    </div>
  );
}

FilterToolbar.displayName = "FilterToolbar";
