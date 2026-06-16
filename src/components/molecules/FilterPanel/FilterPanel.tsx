/**
 * @file FilterPanel.tsx
 * @description Panel de filtros unificado para móvil y escritorio.
 *
 * Implementa el patrón canónico de filtros de Origen ("Bosque Comercial" v5.4):
 * - **Móvil/tablet (`<lg`)**: bottom sheet a pantalla casi completa, con drag
 *   handle y footer fijo, idéntico al comportamiento previo de `FilterSheet`.
 * - **Escritorio (`lg`)**: popover anclado al botón "Filtros" de `FilterToolbar`,
 *   ancho fijo `w-80`, altura máxima `max-h-[70vh]`, con header, scroll interno
 *   y footer "Limpiar filtros / Aplicar".
 *
 * Ambas modalidades comparten:
 * - Las mismas secciones tipadas: `chips`, `daterange`, `numberrange`, `toggles`.
 * - Estado "draft" — los cambios no se aplican hasta pulsar "Aplicar". Cerrar
 *   sin aplicar descarta el draft sin modificar los filtros activos.
 * - Un único "Limpiar filtros" dentro del panel (nunca múltiples botones de
 *   limpieza en la barra principal).
 *
 * Patrón de uso (ver sección 4.16 del manual "Bosque Comercial"):
 *
 * ```tsx
 * const filtersButtonRef = React.useRef<HTMLButtonElement>(null);
 * const [panelOpen, setPanelOpen] = React.useState(false);
 *
 * <FilterToolbar
 *   ...
 *   onOpenFilters={() => setPanelOpen(true)}
 *   filtersButtonRef={filtersButtonRef}
 * />
 *
 * <FilterPanel
 *   isOpen={panelOpen}
 *   onClose={() => setPanelOpen(false)}
 *   triggerRef={filtersButtonRef}
 *   sections={[ ... ]}
 *   onClearAll={onClearFilters}
 *   resultCount={total}
 *   resultLabel="productos"
 * />
 * ```
 */

"use client";

import * as React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { createPortal } from "react-dom";
import { FilterBottomSheet as FilterPanelMobile } from "../../mobile/FilterBottomSheet";
import { cn } from "../../../lib/utils";
import { useIsMobile } from "../../../lib/hooks/useIsMobile";
import {
  type FilterSection,
  type Draft,
  buildDraft,
  applyDraft,
  isDraftActive,
  SectionList,
} from "./FilterPanel.sections";

// Re-export types so consumers only need to import from FilterPanel
export type { FilterSection, ChipOption, ToggleOption } from "./FilterPanel.sections";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sections: FilterSection[];
  onClearAll: () => void;
  resultCount?: number;
  resultLabel?: string;
  title?: string;
  /**
   * Ref al botón que abre el panel — necesario para anclar el popover de
   * escritorio. Pasar el mismo ref que se pasa a `FilterToolbar.filtersButtonRef`.
   */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  className?: string;
}

// ─── Hook de draft state compartido ──────────────────────────────────────────

function useFilterDraft(isOpen: boolean, sections: FilterSection[]) {
  const [draft, setDraft] = React.useState<Draft>({});

  // Sincronizar draft al abrir el panel
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

// ─── FilterPanelDesktop — Popover (≥1024px) ───────────────────────────────────

function FilterPanelDesktop({
  isOpen,
  onClose,
  sections,
  onClearAll,
  resultCount,
  resultLabel = "resultados",
  title = "Filtros",
  triggerRef,
}: FilterPanelProps) {
  const { draft, setChips, setDateFrom, setDateTo, setNumMin, setNumMax, setToggle } =
    useFilterDraft(isOpen, sections);

  const [mounted, setMounted] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  React.useEffect(() => {
    if (!isOpen) { setEntered(false); return; }
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setStyle({
      position: "fixed",
      zIndex: 9999,
      top: rect.bottom + 8,
      left: rect.left,
    });
  }, [triggerRef]);

  React.useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current && !contentRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const hasActive = isDraftActive(draft);

  const handleApply = () => {
    applyDraft(sections, draft);
    onClose();
  };

  const handleClear = () => {
    // Emitir limpieza al consumidor y cerrar. El draft se reinicializa
    // desde los valores externos (ya limpios) cuando el panel vuelva a abrirse.
    onClearAll();
    onClose();
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      style={style}
      className={cn(
        "hidden lg:flex flex-col w-80 max-h-[70vh]",
        "rounded-2xl border border-border bg-surface-alt shadow-2xl",
        "transition-all duration-200",
        entered ? "opacity-100 scale-100" : "opacity-0 scale-95",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle flex-shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-origen-bosque" />
          <span className="text-sm font-semibold text-origen-bosque">{title}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar panel de filtros"
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface transition-colors text-text-subtle hover:text-origen-bosque"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Secciones — scroll interno */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0">
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

      {/* Footer */}
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
          {resultCount !== undefined ? `Ver ${resultCount} ${resultLabel}` : "Aplicar filtros"}
        </button>
      </div>
    </div>,
    document.body,
  );
}

// ─── FilterPanelMobileWrapper — Bottom sheet (<1024px) ────────────────────────

/**
 * IMPORTANTE: `FilterBottomSheet` usa `createPortal` para inyectar el overlay y
 * el panel directamente en `document.body`. Por ello, cualquier clase CSS del
 * componente padre (como `lg:hidden`) no tiene efecto sobre los elementos del
 * portal — éstos escapan del árbol DOM local.
 *
 * La exclusión del bottom sheet en desktop se gestiona en el componente público
 * `FilterPanel` mediante `useIsMobile`, no aquí con CSS.
 */
function FilterPanelMobileWrapper({
  isOpen,
  onClose,
  sections,
  onClearAll,
  resultCount,
  resultLabel = "resultados",
  title = "Filtros",
}: Omit<FilterPanelProps, "triggerRef">) {
  const { draft, setChips, setDateFrom, setDateTo, setNumMin, setNumMax, setToggle } =
    useFilterDraft(isOpen, sections);

  // Notificar a integraciones del proyecto consumidor (p. ej. BottomTabBar
  // de origen-dashboard) que el panel se ha abierto/cerrado.
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("filter-sheet:toggle", { detail: { open: isOpen } }));
    return () => {
      if (isOpen) window.dispatchEvent(new CustomEvent("filter-sheet:toggle", { detail: { open: false } }));
    };
  }, [isOpen]);

  const hasActive = isDraftActive(draft);

  const handleApply = () => {
    applyDraft(sections, draft);
    onClose();
  };

  const handleClear = () => {
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
    <FilterPanelMobile open={isOpen} onClose={onClose} title={title} footer={footer}>
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
    </FilterPanelMobile>
  );
}

// ─── FilterPanel — componente público ─────────────────────────────────────────

/**
 * Panel de filtros unificado: popover en escritorio (≥1024px) y bottom sheet
 * en móvil/tablet (<1024px). Comparte secciones tipadas y draft state.
 *
 * La distinción de breakpoint se resuelve con `useIsMobile(1024)` (JS), no con
 * CSS (`hidden` / `lg:flex`). Esto es necesario porque ambas implementaciones
 * usan `createPortal` para inyectar sus elementos directamente en `document.body`,
 * escapando del árbol DOM local. Las clases CSS del componente padre no tienen
 * efecto sobre los elementos del portal, por lo que una separación puramente CSS
 * provocaría que ambos paneles sean visibles a la vez en desktop.
 *
 * Nota SSR: `useIsMobile` devuelve `false` en el servidor (SSR) — lo que hace
 * que en la hidratación inicial se renderice `FilterPanelDesktop`. El cambio al
 * bottom sheet ocurre después de que el cliente conoce el tamaño de la ventana,
 * evitando un mismatch de hidratación. Si el panel está cerrado (`isOpen=false`)
 * en ese momento, no hay flash visible.
 */
export function FilterPanel(props: FilterPanelProps) {
  // 1024px = breakpoint `lg` de Tailwind
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return (
      <FilterPanelMobileWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        sections={props.sections}
        onClearAll={props.onClearAll}
        resultCount={props.resultCount}
        resultLabel={props.resultLabel}
        title={props.title}
        className={props.className}
      />
    );
  }

  return <FilterPanelDesktop {...props} />;
}

FilterPanel.displayName = "FilterPanel";
