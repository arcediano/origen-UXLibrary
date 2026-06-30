/**
 * @file FilterSidebar.tsx
 * @description Sidebar de filtros siempre visible para layouts de catálogo a
 * 2 columnas (filtros a la izquierda, contenido a la derecha).
 *
 * A diferencia de `FilterPanel` (panel on-demand con draft state, pensado
 * para listados de gestión en `origen-dashboard`/`origen-admin`), este
 * componente está pensado para catálogos públicos de cara al comprador
 * (`origen-web`) donde se prioriza tener todos los filtros visibles de forma
 * permanente en escritorio, sin paso intermedio de "Aplicar":
 *
 * - **Escritorio (`lg` y superior)**: columna fija siempre visible, sin
 *   interacción previa para abrir ningún panel. Cada cambio de filtro se
 *   aplica de inmediato (no hay draft state ni botón "Aplicar") — el listado
 *   asociado debe reaccionar al instante, igual que el resto de controles de
 *   filtro de Origen.
 * - **Móvil/tablet (`<lg`)**: el sidebar no se renderiza inline (ocuparía la
 *   pantalla completa). El consumidor debe mostrar un botón "Filtros" (p.ej.
 *   `FilterToolbar`) que abra este mismo contenido dentro de `FilterSheet`
 *   (bottom sheet ya existente del sistema) — ver `asSheetContent`.
 *
 * Comparte el motor de secciones tipadas (`chips`, `daterange`, `numberrange`,
 * `toggles`) con `FilterPanel`/`FilterSheet` a través de `FilterPanel.sections`,
 * por lo que cualquier mejora a esas secciones beneficia a los tres
 * componentes por igual.
 *
 * @example
 * ```tsx
 * <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 lg:items-start">
 *   <FilterSidebar
 *     className="hidden lg:block lg:sticky lg:top-24"
 *     title="Filtros"
 *     sections={[
 *       { type: 'chips', id: 'category', title: 'Categoría', options, value, onChange },
 *       { type: 'chips', id: 'rating', title: 'Valoración', options: ratingOptions, value, onChange },
 *     ]}
 *     onClearAll={onClearFilters}
 *     resultCount={total}
 *     resultLabel="productos"
 *   />
 *   <main>{children}</main>
 * </div>
 * ```
 */

"use client";

import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  type FilterSection,
  isSectionActive,
} from "./FilterSidebar.sections";
import { SectionList as SharedSectionList, type Draft, buildDraft } from "../FilterPanel/FilterPanel.sections";

// Re-export shared types so consumers only need to import from FilterSidebar
export type { FilterSection, ChipOption, ToggleOption } from "../FilterPanel/FilterPanel.sections";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FilterSidebarProps {
  /** Secciones de filtro a renderizar (mismo motor que `FilterPanel`). */
  sections: FilterSection[];
  /** Limpia todos los filtros activos. Aplicación inmediata (sin draft). */
  onClearAll: () => void;
  /** Número total de resultados, mostrado en la cabecera del sidebar. */
  resultCount?: number;
  /** Etiqueta del contador de resultados. Por defecto "resultados". */
  resultLabel?: string;
  /** Título de la cabecera. Por defecto "Filtros". */
  title?: string;
  /**
   * Contenido adicional renderizado entre la cabecera y las `sections`
   * tipadas — por ejemplo, un `Select searchable` para filtros de
   * cardinalidad alta (categoría, productor) que no encajan en los 4 tipos
   * de `FilterSection`. Opcional.
   */
  children?: ReactNode;
  className?: string;
}

/**
 * Determina si hay al menos un filtro activo a partir de las secciones
 * (aplicación inmediata: el estado "activo" se lee directamente de los
 * valores controlados de cada sección, no de un draft).
 */
function hasAnyActiveFilter(sections: FilterSection[]): boolean {
  return sections.some(isSectionActive);
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Columna de filtros siempre visible para catálogos públicos. Renderizar
 * únicamente en `lg:block` (o superior) desde el consumidor — en móvil/tablet
 * usar el mismo array de `sections` dentro de `FilterSheet`.
 */
export function FilterSidebar({
  sections,
  onClearAll,
  resultCount,
  resultLabel = "resultados",
  title = "Filtros",
  children,
  className,
}: FilterSidebarProps) {
  // Draft "espejo" del estado controlado externo — únicamente para reutilizar
  // `SectionList`, que espera la forma `Draft`. No hay estado propio: cada
  // sección sigue gestionando su propio valor controlado vía `value`/`onChange`,
  // por lo que los cambios se aplican de inmediato (no hay paso "Aplicar").
  const draft: Draft = buildDraft(sections);

  const hasActive = hasAnyActiveFilter(sections);

  return (
    <aside
      aria-label={title}
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-surface-alt",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle flex-shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-origen-bosque" aria-hidden="true" />
          <span className="text-sm font-semibold text-origen-bosque">{title}</span>
        </div>
        {resultCount !== undefined && (
          <span className="text-xs text-text-subtle">
            {resultCount} {resultLabel}
          </span>
        )}
      </div>

      {/* Contenido adicional (p. ej. Select searchable de categoría/productor) —
          va antes de las secciones tipadas porque suele tratarse de los filtros
          de mayor frecuencia de uso. */}
      {children && (
        <div className="flex flex-col gap-3 px-4 pt-4">
          {children}
        </div>
      )}

      {/* Secciones — aplicación inmediata, sin scroll interno forzado */}
      <div className="px-4 py-4">
        <SharedSectionList
          sections={sections}
          draft={draft}
          onSetChips={(id, v) => {
            const section = sections.find((s) => s.id === id);
            if (section?.type === "chips") section.onChange(v);
          }}
          onSetDateFrom={(id, v) => {
            const section = sections.find((s) => s.id === id);
            if (section?.type === "daterange") section.onChangeFrom(v);
          }}
          onSetDateTo={(id, v) => {
            const section = sections.find((s) => s.id === id);
            if (section?.type === "daterange") section.onChangeTo(v);
          }}
          onSetNumMin={(id, v) => {
            const section = sections.find((s) => s.id === id);
            if (section?.type === "numberrange") section.onChangeMin(v);
          }}
          onSetNumMax={(id, v) => {
            const section = sections.find((s) => s.id === id);
            if (section?.type === "numberrange") section.onChangeMax(v);
          }}
          onSetToggle={(sectionId, optId, v) => {
            const section = sections.find((s) => s.id === sectionId);
            if (section?.type !== "toggles") return;
            const opt = section.options.find((o) => o.id === optId);
            opt?.onChange(v);
          }}
        />
      </div>

      {/* Footer — único punto de limpieza, deshabilitado si no hay filtros activos */}
      <div className="px-4 py-3 border-t border-border-subtle flex-shrink-0">
        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasActive}
          className={cn(
            "w-full h-9 rounded-xl border text-sm font-medium transition-all",
            hasActive
              ? "border-origen-bosque/40 text-origen-bosque hover:border-origen-bosque/70 hover:bg-origen-bosque/5"
              : "border-border text-text-subtle opacity-40 cursor-not-allowed",
          )}
        >
          Limpiar filtros
        </button>
      </div>
    </aside>
  );
}

FilterSidebar.displayName = "FilterSidebar";
