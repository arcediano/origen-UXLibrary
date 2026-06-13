/**
 * @file ReviewSummary.tsx
 * @description Resumen de valoraciones del Origen Design System: media general
 * (vía `StarRating`) + desglose de votos por estrella (1-5) como barras de
 * progreso horizontales con porcentaje y nº de votos.
 *
 * @example
 * <ReviewSummary
 *   average={4.3}
 *   total={128}
 *   breakdown={[
 *     { stars: 5, count: 80 },
 *     { stars: 4, count: 30 },
 *     { stars: 3, count: 10 },
 *     { stars: 2, count: 5 },
 *     { stars: 1, count: 3 },
 *   ]}
 * />
 */

"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "../../../lib/utils";
import { StarRating } from "../../atoms/StarRating";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ReviewSummaryBreakdownItem {
  /** Valor de la estrella: 1 a 5 */
  stars: number;
  /** Número de votos para ese valor */
  count: number;
}

export interface ReviewSummaryProps {
  /** Media de valoración (p.ej. 4.3) */
  average: number;
  /** Número total de reseñas */
  total: number;
  /**
   * Desglose de votos por nº de estrellas (1-5). No es obligatorio incluir
   * los 5 valores; los que falten se asumen `count=0`.
   */
  breakdown: ReviewSummaryBreakdownItem[];
  /** Clases adicionales */
  className?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ReviewSummary({ average, total, breakdown, className }: ReviewSummaryProps) {
  const countByStars = React.useMemo(() => {
    const map = new Map<number, number>();
    for (const item of breakdown) {
      map.set(item.stars, item.count);
    }
    return map;
  }, [breakdown]);

  const rows = [5, 4, 3, 2, 1].map((stars) => {
    const count = countByStars.get(stars) ?? 0;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return { stars, count, pct };
  });

  return (
    <div className={cn("flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8", className)}>
      {/* Media general */}
      <div className="flex flex-col items-center text-center sm:w-48 sm:shrink-0">
        <p className="text-4xl font-bold text-origen-bosque">{average.toFixed(1)}</p>
        <StarRating value={average} readOnly size="md" className="mt-2" />
        <p className="mt-1 text-sm text-text-subtle">{total} valoraciones</p>
      </div>

      {/* Desglose por estrella */}
      <dl className="flex-1 space-y-2">
        {rows.map(({ stars, count, pct }) => (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <dt className="flex w-3 items-center text-text-subtle">{stars}</dt>
            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden="true" />
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border" role="img" aria-label={`${stars} estrellas: ${pct}% (${count} votos)`}>
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
            </div>
            <dd className="w-12 shrink-0 text-right text-text-subtle">{pct}%</dd>
            <dd className="hidden w-10 shrink-0 text-right text-text-subtle sm:inline-block">({count})</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

ReviewSummary.displayName = "ReviewSummary";
