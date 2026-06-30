/**
 * @file RatingFilterSection.tsx
 * @description Sección de filtro de valoración mínima con estrellas grandes
 * y amarillas como elemento visual principal (no chips de texto con el
 * símbolo "★" incrustado). Pensada para `FilterSidebar` (catálogo público de
 * `origen-web`), donde la valoración debe destacar visualmente sobre el
 * resto de filtros.
 *
 * No forma parte del motor de secciones tipadas (`FilterSection` en
 * `FilterPanel.sections.tsx`) deliberadamente: el patrón visual (estrellas
 * grandes, no chips de texto) es específico de este caso de uso y no
 * generaliza a otros filtros de cardinalidad baja (estado, disponibilidad),
 * que sí siguen usando `chips`. Ver manual de diseño, sección 4.16.1.
 *
 * Sin scroll horizontal: las opciones se disponen en columna (`flex-col`),
 * igual que `TogglesSection`, evitando cualquier overflow lateral dentro del
 * sidebar de 280px.
 */

"use client";

import { Star } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface RatingFilterOption {
  /** Valoración mínima representada por esta opción (0 = "Todas"). */
  threshold: number;
  /** Etiqueta accesible y visible junto a las estrellas (ej. "o más", "Todas"). */
  label: string;
}

export interface RatingFilterSectionProps {
  /** Título de la sección, por defecto "Valoración". */
  title?: string;
  /** Opciones de valoración mínima a mostrar, ordenadas de mayor a menor. */
  options?: RatingFilterOption[];
  /** Valor actualmente seleccionado (threshold), "" o 0 = sin filtro ("Todas"). */
  value: number;
  /** Callback de cambio inmediato (sin draft, igual que el resto de `FilterSidebar`). */
  onChange: (value: number) => void;
  className?: string;
}

const DEFAULT_OPTIONS: RatingFilterOption[] = [
  { threshold: 4, label: "o más" },
  { threshold: 3, label: "o más" },
];

/**
 * Fila de N estrellas, las primeras `count` rellenas en amarillo/dorado de
 * marca (`origen-mandarina`) y el resto en contorno neutro. Estrellas
 * grandes (`w-6 h-6`) para que la valoración sea el elemento más prominente
 * del sidebar, según requisito de usuario.
 */
function StarRow({ count, active }: { count: number; active: boolean }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "w-6 h-6 transition-colors",
            i < count
              ? "fill-origen-mandarina text-origen-mandarina"
              : active
                ? "fill-white/40 text-white/70"
                : "fill-transparent text-border",
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function RatingFilterSection({
  title = "Valoración",
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  className,
}: RatingFilterSectionProps) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold text-text-subtle uppercase tracking-wide mb-3">{title}</p>
      <div className="flex flex-col gap-2">
        {/* "Todas" — sin estrellas rellenas, deselecciona el filtro */}
        <button
          type="button"
          onClick={() => onChange(0)}
          aria-pressed={value === 0}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
            value === 0
              ? "bg-origen-bosque text-white"
              : "bg-surface border border-border-subtle text-origen-bosque hover:border-origen-pradera/40",
          )}
        >
          <StarRow count={0} active={value === 0} />
          <span>Todas</span>
        </button>

        {options.map((opt) => {
          const active = value === opt.threshold;
          return (
            <button
              key={opt.threshold}
              type="button"
              onClick={() => onChange(opt.threshold)}
              aria-pressed={active}
              aria-label={`${opt.threshold} estrellas ${opt.label}`}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
                active
                  ? "bg-origen-bosque text-white"
                  : "bg-surface border border-border-subtle text-origen-bosque hover:border-origen-pradera/40",
              )}
            >
              <StarRow count={opt.threshold} active={active} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

RatingFilterSection.displayName = "RatingFilterSection";
