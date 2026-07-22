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
 * - **Sin scroll interno**: el sidebar nunca fuerza `overflow-y-auto` ni
 *   `max-h` por sí mismo — es responsabilidad del consumidor decidir si la
 *   columna es `sticky`/con scroll de página normal. Las secciones de tipo
 *   `chips` tampoco fuerzan scroll horizontal (wrap vertical siempre).
 * - **Sin acordeones (v0.16.0)**: cada sección tipada (Precio, Etiquetas,
 *   Disponibilidad, etc.) se renderiza siempre visible, sin posibilidad de
 *   colapsar/expandir — mismo criterio que `RatingFilterSection`, que nunca
 *   tuvo comportamiento de acordeón. Un sidebar de filtros públicos es la
 *   interacción principal del catálogo: ocultar secciones tras un clic
 *   adicional añade carga cognitiva y un paso extra para ver controles que
 *   el usuario probablemente necesita usar. Revierte el patrón de
 *   `AccordionCard` introducido en v0.15.0 (ver manual de diseño, sección
 *   4.16.2, ahora marcada como histórico/revertida).
 *
 * Comparte el motor de secciones tipadas (`chips`, `daterange`, `numberrange`,
 * `toggles`) con `FilterPanel`/`FilterSheet` a través de `FilterPanel.sections`,
 * por lo que cualquier mejora a esas secciones beneficia a los tres
 * componentes por igual. La sección de valoración (estrellas grandes y
 * amarillas) **no** usa este motor — ver `RatingFilterSection`, pensada
 * específicamente para este caso visual y expuesta como bloque `children`,
 * igual que los `Select searchable` de cardinalidad alta.
 *
 * @example
 * ```tsx
 * <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 lg:items-start">
 *   <FilterSidebar
 *     className="hidden lg:flex lg:sticky lg:top-24"
 *     title="Filtros"
 *     sections={[
 *       { type: 'numberrange', id: 'price', title: 'Precio', valueMin, valueMax, onChangeMin, onChangeMax, prefix: '€' },
 *       { type: 'toggles', id: 'availability', title: 'Disponibilidad', options },
 *     ]}
 *     onClearAll={onClearFilters}
 *     resultCount={total}
 *     resultLabel="productos"
 *   >
 *     <RatingFilterSection value={minRating} onChange={setMinRating} />
 *   </FilterSidebar>
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
import {
  ChipsSection,
  DateRangeSection,
  NumberRangeSection,
  TogglesSection,
} from "../FilterPanel/FilterPanel.sections";

// Re-export shared types so consumers only need to import from FilterSidebar
export type { FilterSection, ChipOption, ToggleOption } from "../FilterPanel/FilterPanel.sections";
export { RatingFilterSection } from "./RatingFilterSection";
export type { RatingFilterSectionProps, RatingFilterOption } from "./RatingFilterSection";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FilterSidebarProps {
  /** Secciones de filtro a renderizar (mismo motor que `FilterPanel`). Siempre visibles, sin acordeón. */
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
   * de `FilterSection`, o `RatingFilterSection` (estrellas). Opcional.
   */
  children?: ReactNode;
  /**
   * Indica si hay algún filtro activo fuera de `sections` (p. ej. un `Select
   * searchable` de alta cardinalidad pasado como `children`). El botón
   * "Limpiar filtros" solo puede detectar el estado de `sections` por sí
   * mismo — si el consumidor filtra únicamente vía `children`, debe reportar
   * aquí si hay algo que limpiar, o el botón nunca se activará.
   */
  hasExternalActiveFilters?: boolean;
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
  hasExternalActiveFilters = false,
  className,
}: FilterSidebarProps) {
  const hasActive = hasAnyActiveFilter(sections) || hasExternalActiveFilters;

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

      {/* Contenido adicional (p. ej. Select searchable de categoría/productor,
          RatingFilterSection) — va antes de las secciones tipadas porque
          suele tratarse de los filtros de mayor frecuencia de uso. */}
      {children && (
        <div
          className={cn(
            "flex flex-col gap-4 px-4 pt-4",
            // Sin secciones tipadas después, este bloque es el último antes
            // del footer — necesita su propio pb-4 para no pegarse contra el
            // borde superior del botón "Limpiar filtros".
            sections.length === 0 && "pb-4",
          )}
        >
          {children}
        </div>
      )}

      {/* Secciones — siempre visibles, sin acordeón (v0.16.0): Precio,
          Etiquetas y Disponibilidad no deben requerir un clic adicional
          para mostrarse, igual que RatingFilterSection. Cada sección ya
          pinta su propio título (ver `*Section` en FilterPanel.sections),
          por lo que basta un contenedor plano con separador inferior entre
          secciones. Sin scroll interno forzado: con todas las secciones
          expandidas el sidebar simplemente es más alto. */}
      <div className="flex flex-col divide-y divide-border-subtle px-4">
        {sections.map((section) => (
          <div key={section.id} className="py-4 first:pt-4 last:pb-4">
            {section.type === "chips" && (
              <ChipsSection section={section} value={section.value} onChange={section.onChange} />
            )}
            {section.type === "daterange" && (
              <DateRangeSection
                section={section}
                from={section.valueFrom}
                to={section.valueTo}
                onFrom={section.onChangeFrom}
                onTo={section.onChangeTo}
              />
            )}
            {section.type === "numberrange" && (
              <NumberRangeSection
                section={section}
                min={section.valueMin}
                max={section.valueMax}
                onMin={section.onChangeMin}
                onMax={section.onChangeMax}
              />
            )}
            {section.type === "toggles" && (
              <TogglesSection
                section={section}
                values={Object.fromEntries(section.options.map((o) => [o.id, o.value]))}
                onToggle={(optId, v) => section.options.find((o) => o.id === optId)?.onChange(v)}
              />
            )}
          </div>
        ))}
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
