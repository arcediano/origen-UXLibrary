"use client";

/**
 * @file StatGrid.tsx
 * @description Grid de tarjetas KPI reutilizable — envuelve StatCard en un grid
 * responsive mobile-first (2 cols en móvil, N cols en desktop).
 *
 * @example
 * <StatGrid
 *   periodLabel="Mes actual"
 *   items={[
 *     { label: 'Ingresos', value: '€4.280', icon: <TrendingUp />, variant: 'hoja' },
 *     { label: 'Pedidos',  value: 142,      icon: <ShoppingBag />, variant: 'pradera' },
 *   ]}
 * />
 */

import { cn } from "../../../lib/utils";
import { StatCard } from "../StatCard/StatCard";
import type { StatCardProps } from "../StatCard/StatCard";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Configuración de un KPI individual dentro del grid */
export type StatGridItem = Omit<StatCardProps, "className" | "loading">;

export interface StatGridProps {
  /** Lista de KPIs a mostrar — entre 2 y 6 items */
  items: StatGridItem[];
  /**
   * Número de columnas en desktop (≥1024px).
   * En móvil siempre 2 columnas.
   * @default 4
   */
  columns?: 2 | 3 | 4;
  /** Etiqueta de período debajo del cual aparece el grid ("Mes actual", "7 días") */
  periodLabel?: string;
  /** Activa skeleton en todos los StatCard del grid */
  loading?: boolean;
  className?: string;
}

// ─── Mapa de columnas ─────────────────────────────────────────────────────────

const colsMap: Record<2 | 3 | 4, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function StatGrid({
  items,
  columns = 4,
  periodLabel,
  loading = false,
  className,
}: StatGridProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {periodLabel && (
        <p className="text-[11px] font-medium text-text-subtle uppercase tracking-wide">
          {periodLabel}
        </p>
      )}
      <div
        className={cn("grid gap-3 sm:gap-4 lg:gap-6", colsMap[columns])}
        aria-busy={loading || undefined}
      >
        {items.map((item, i) => (
          <StatCard key={i} {...item} loading={loading} />
        ))}
      </div>
    </div>
  );
}
