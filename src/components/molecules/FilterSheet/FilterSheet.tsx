/**
 * @file FilterSheet.tsx
 * @description Panel de filtros para móvil/tablet (bottom sheet), con
 * secciones tipadas, estado "draft" y footer "Limpiar filtros / Ver N
 * resultados".
 *
 * Compone el `FilterBottomSheet` de bajo nivel (`mobile/FilterBottomSheet`,
 * overlay + panel genérico) añadiendo el catálogo de secciones del patrón
 * de filtros de Origen: `chips`, `daterange`, `numberrange`, `toggles`.
 *
 * **Nota**: a partir de la versión que introduce `FilterPanel`, el patrón
 * canónico recomendado es `FilterPanel`, que cubre tanto móvil (bottom sheet)
 * como escritorio (popover). `FilterSheet` se mantiene por compatibilidad —
 * su API pública no cambia. Los consumidores nuevos deben usar `FilterPanel`.
 *
 * @example
 * ```tsx
 * <FilterSheet
 *   isOpen={panelOpen}
 *   onClose={() => setPanelOpen(false)}
 *   sections={[
 *     { type: 'chips', id: 'status', title: 'Estado', options: STATUS_OPTIONS, value: status, onChange: setStatus },
 *     { type: 'daterange', id: 'period', title: 'Período', valueFrom, valueTo, onChangeFrom, onChangeTo },
 *   ]}
 *   onClearAll={onClearFilters}
 *   resultCount={total}
 *   resultLabel="productos"
 * />
 * ```
 */

"use client";

import * as React from "react";
import { FilterBottomSheet as FilterPanel } from "../../mobile/FilterBottomSheet";
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

// Re-export types for backward compatibility
export type { FilterSection, ChipOption, ToggleOption } from "../FilterPanel/FilterPanel.sections";

export interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sections: FilterSection[];
  onClearAll: () => void;
  resultCount?: number;
  resultLabel?: string;
  title?: string;
  /**
   * Contenido adicional renderizado antes de las `sections` tipadas —
   * mismo propósito que en `FilterSidebar` (p. ej. `Select searchable` de
   * categoría/productor). Opcional.
   */
  children?: React.ReactNode;
  /**
   * Indica si hay algún filtro activo fuera de `sections` (p. ej. un `Select
   * searchable` de alta cardinalidad pasado como `children`). Mismo
   * propósito que en `FilterSidebar` — sin esto, el botón de limpiar no
   * puede saber que hay algo que limpiar si el filtro activo vive solo en
   * `children`.
   */
  hasExternalActiveFilters?: boolean;
}

// ─── Draft state helpers ──────────────────────────────────────────────────────

function useFilterDraft(isOpen: boolean, sections: FilterSection[]) {
  const [draft, setDraft] = React.useState<Draft>({});

  React.useEffect(() => {
    if (isOpen) setDraft(buildDraft(sections));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  return { draft, setChips, setDateFrom, setDateTo, setNumMin, setNumMax, setToggle };
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function FilterSheet({
  isOpen,
  onClose,
  sections,
  onClearAll,
  resultCount,
  resultLabel = "resultados",
  title = "Filtros",
  children,
  hasExternalActiveFilters = false,
}: FilterSheetProps) {
  const { draft, setChips, setDateFrom, setDateTo, setNumMin, setNumMax, setToggle } =
    useFilterDraft(isOpen, sections);

  // Notificar a integraciones del proyecto consumidor (p. ej. BottomTabBar
  // de origen-dashboard) que el sheet se ha abierto/cerrado. Un evento DOM
  // custom sin listener no tiene efecto en otros consumidores.
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("filter-sheet:toggle", { detail: { open: isOpen } }));
    return () => {
      if (isOpen) window.dispatchEvent(new CustomEvent("filter-sheet:toggle", { detail: { open: false } }));
    };
  }, [isOpen]);

  const hasActive = isDraftActive(draft) || hasExternalActiveFilters;

  const handleApply = () => {
    applyDraft(sections, draft);
    onClose();
  };

  const handleClear = () => {
    clearDraft(sections);
    onClearAll();
    onClose();
  };

  const footer = (
    <div className="flex gap-3">
      <button
        onClick={handleClear}
        disabled={!hasActive}
        className={cn(
          "flex-1 h-12 rounded-2xl border-2 text-sm font-medium transition-all active:scale-95",
          hasActive
            ? "border-origen-bosque/40 text-origen-bosque hover:border-origen-bosque/70"
            : "border-border text-text-subtle opacity-40 cursor-not-allowed",
        )}
      >
        Limpiar filtros
      </button>
      <button
        onClick={handleApply}
        className="flex-[2] h-12 rounded-2xl bg-origen-bosque text-white text-sm font-semibold active:scale-95 transition-all hover:bg-origen-pino"
      >
        {resultCount !== undefined ? `Ver ${resultCount} ${resultLabel}` : "Aplicar filtros"}
      </button>
    </div>
  );

  return (
    <FilterPanel open={isOpen} onClose={onClose} title={title} footer={footer}>
      {children && <div className="flex flex-col gap-3 mb-4">{children}</div>}
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
    </FilterPanel>
  );
}

FilterSheet.displayName = "FilterSheet";
