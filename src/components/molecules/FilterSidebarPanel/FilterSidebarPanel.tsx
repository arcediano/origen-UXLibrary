/**
 * @file FilterSidebarPanel.tsx
 * @description Sidebar de filtros siempre visible para listados de gestión
 * (`origen-dashboard`/`origen-admin`), con el modelo de interacción de
 * `FilterPanel` (estado "draft" + botón "Aplicar" explícito) en vez del de
 * `FilterSidebar` (aplicación inmediata).
 *
 * Nace como variante de `FilterSidebar` en vez de reutilizarlo tal cual: el
 * acabado visual de columna lateral fija de `FilterSidebar` encaja mejor en
 * pantallas de gestión que el popover/bottom-sheet on-demand de `FilterPanel`
 * (ver su propio docblock) — pero su aplicación inmediata sin "Aplicar" no
 * encaja bien en listados de gestión con filtros combinables (varios campos
 * a la vez, ej. rango de fechas + importe + estado antes de disparar la
 * consulta). Mantiene la cabecera, el contenedor y el footer de
 * `FilterSidebar`, sustituyendo su cuerpo por `SectionList` en modo draft
 * (mismo motor que usa `FilterPanel`, sin duplicar los renderers de sección).
 *
 * - **Aplicación diferida**: cada cambio de sección solo modifica un draft
 *   local — nada se envía a `onChange` de las secciones hasta pulsar
 *   "Aplicar filtros". Navegar fuera sin aplicar descarta el draft sin tocar
 *   los filtros activos, igual que `FilterPanel`.
 * - **Resincronización con el estado aplicado**: a diferencia de
 *   `FilterPanel` (que resincroniza el draft solo al reabrirse, porque las
 *   secciones detrás del popover no cambian mientras está cerrado), este
 *   componente nunca se desmonta — si los valores de `sections` cambian por
 *   una vía externa (ej. se quita un chip en `ActiveFilterChips`, o se
 *   resetean filtros desde otro control), el draft se resincroniza
 *   automáticamente para reflejarlo, comparando contra una huella de los
 *   valores aplicados en cada render.
 * - **"Limpiar filtros"**: llama a `onClearAll` (igual que `FilterSidebar`) y
 *   además vacía el draft local en el mismo gesto — sin esto, quedaría
 *   desactualizado hasta el próximo cambio externo, mostrando como "activo"
 *   un filtro que el consumidor ya limpió.
 * - **Sin acordeón, sin scroll interno propio**: mismo criterio que
 *   `FilterSidebar` — cada sección tipada se renderiza siempre visible, y es
 *   responsabilidad del consumidor decidir el comportamiento de scroll de la
 *   columna (`sticky`, altura de página, etc.).
 *
 * Comparte el motor de secciones tipadas con `FilterPanel`/`FilterSidebar`
 * (`SectionList`, `buildDraft`, `clearDraft`, `applyDraft`, `isDraftActive`)
 * — cualquier mejora a esas piezas beneficia a los tres componentes por igual.
 *
 * @example
 * ```tsx
 * <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-6 lg:items-start">
 *   <FilterSidebarPanel
 *     sections={[
 *       { type: 'daterange', id: 'range', title: 'Fecha', valueFrom, valueTo, onChangeFrom, onChangeTo },
 *       { type: 'chips', id: 'status', title: 'Estado', options, value, onChange },
 *     ]}
 *     onClearAll={onClearFilters}
 *     resultCount={total}
 *     resultLabel="pedidos"
 *   />
 *   <main>{children}</main>
 * </div>
 * ```
 */

"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  type FilterSection,
  type Draft,
  buildDraft,
  clearDraft,
  applyDraft,
  isDraftActive,
  SectionList,
} from "../FilterPanel/FilterPanel.sections";

// Re-export shared types so consumers only need to import from FilterSidebarPanel
export type { FilterSection, ChipOption, ToggleOption } from "../FilterPanel/FilterPanel.sections";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FilterSidebarPanelProps {
  /** Secciones de filtro a renderizar (mismo motor que `FilterPanel`/`FilterSidebar`). */
  sections: FilterSection[];
  /** Limpia todos los filtros activos (aplicados) y el draft local a la vez. */
  onClearAll: () => void;
  /** Número total de resultados, mostrado en la cabecera. Refleja siempre el estado aplicado, no el draft. */
  resultCount?: number;
  /** Etiqueta del contador de resultados. Por defecto "resultados". */
  resultLabel?: string;
  /** Título de la cabecera. Por defecto "Filtros". */
  title?: string;
  /**
   * Indica si hay algún filtro activo fuera de `sections` (p. ej. un `Select
   * searchable` de alta cardinalidad renderizado aparte por el consumidor).
   * El botón "Limpiar filtros" solo puede detectar el estado del draft de
   * `sections` por sí mismo — si el consumidor filtra también por fuera,
   * debe reportarlo aquí o el botón nunca reflejará ese filtro externo.
   */
  hasExternalActiveFilters?: boolean;
  className?: string;
}

// ─── Hook de draft state, resincronizado con el estado aplicado ──────────────
// A diferencia de `useFilterDraft` de `FilterPanel` (resincroniza solo al
// pasar `isOpen` a `true`, porque el panel se desmonta/oculta entre
// aperturas), este componente vive siempre montado: resincroniza cada vez
// que los valores APLICADOS de `sections` cambian por una vía externa,
// usando una huella (`JSON.stringify`) de esos valores como dependencia del
// efecto -- no se dispara por ediciones propias del draft, que no tocan los
// valores aplicados hasta pulsar "Aplicar".

function useSidebarDraft(sections: FilterSection[]) {
  const [draft, setDraft] = React.useState<Draft>(() => buildDraft(sections));
  const appliedSnapshot = JSON.stringify(buildDraft(sections));

  React.useEffect(() => {
    setDraft(buildDraft(sections));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedSnapshot]);

  const setChips = (id: string, v: string) =>
    setDraft((p) => ({ ...p, [id]: { type: "chips", value: v } }));

  const setDateFrom = (id: string, v: string) =>
    setDraft((p) => {
      const c = p[id] as { type: "daterange"; from: string; to: string } | undefined;
      return { ...p, [id]: { type: "daterange", from: v, to: c?.to ?? "" } };
    });

  const setDateTo = (id: string, v: string) =>
    setDraft((p) => {
      const c = p[id] as { type: "daterange"; from: string; to: string } | undefined;
      return { ...p, [id]: { type: "daterange", from: c?.from ?? "", to: v } };
    });

  const setNumMin = (id: string, v: string) =>
    setDraft((p) => {
      const c = p[id] as { type: "numberrange"; min: string; max: string } | undefined;
      return { ...p, [id]: { type: "numberrange", min: v, max: c?.max ?? "" } };
    });

  const setNumMax = (id: string, v: string) =>
    setDraft((p) => {
      const c = p[id] as { type: "numberrange"; min: string; max: string } | undefined;
      return { ...p, [id]: { type: "numberrange", min: c?.min ?? "", max: v } };
    });

  const setToggle = (sectionId: string, optionId: string, v: boolean) =>
    setDraft((p) => {
      const c = p[sectionId] as { type: "toggles"; values: Record<string, boolean> } | undefined;
      return { ...p, [sectionId]: { type: "toggles", values: { ...c?.values, [optionId]: v } } };
    });

  return { draft, setDraft, setChips, setDateFrom, setDateTo, setNumMin, setNumMax, setToggle };
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Columna de filtros siempre visible con draft + "Aplicar", para listados de
 * gestión. Renderizar únicamente en `lg:block` (o superior) desde el
 * consumidor — en móvil/tablet usar el mismo array de `sections` dentro de
 * `FilterPanel` (que ya cubre el bottom sheet con este mismo modelo de
 * interacción).
 */
export function FilterSidebarPanel({
  sections,
  onClearAll,
  resultCount,
  resultLabel = "resultados",
  title = "Filtros",
  hasExternalActiveFilters = false,
  className,
}: FilterSidebarPanelProps) {
  const { draft, setDraft, setChips, setDateFrom, setDateTo, setNumMin, setNumMax, setToggle } =
    useSidebarDraft(sections);

  const hasActive = isDraftActive(draft) || hasExternalActiveFilters;

  const handleApply = () => {
    applyDraft(sections, draft);
  };

  const handleClear = () => {
    onClearAll();
    setDraft(clearDraft(sections));
  };

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

      {/* Secciones — mismo motor que FilterPanel, en modo draft */}
      <div className="px-4">
        <SectionList
          sections={sections}
          draft={draft}
          onSetChips={setChips}
          onSetDateFrom={setDateFrom}
          onSetDateTo={setDateTo}
          onSetNumMin={setNumMin}
          onSetNumMax={setNumMax}
          onSetToggle={setToggle}
        />
      </div>

      {/* Footer — Limpiar filtros / Aplicar, igual que FilterPanel en escritorio */}
      <div className="flex gap-2 px-4 py-3 border-t border-border-subtle flex-shrink-0">
        <button
          type="button"
          onClick={handleClear}
          disabled={!hasActive}
          className={cn(
            "flex-1 h-9 rounded-xl border text-sm font-medium transition-all",
            hasActive
              ? "border-origen-bosque/40 text-origen-bosque hover:border-origen-bosque/70 hover:bg-origen-bosque/5"
              : "border-border text-text-subtle opacity-40 cursor-not-allowed",
          )}
        >
          Limpiar filtros
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="flex-[2] h-9 rounded-xl bg-origen-bosque text-white text-sm font-semibold transition-all hover:bg-origen-pino active:scale-95"
        >
          Aplicar filtros
        </button>
      </div>
    </aside>
  );
}

FilterSidebarPanel.displayName = "FilterSidebarPanel";
