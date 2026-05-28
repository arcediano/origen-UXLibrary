/**
 * @file MobileCardList.tsx
 * @description Named wrapper para listas de tarjetas móviles.
 * Encapsula el estilo canónico usado en todas las secciones del dashboard
 * (productos, pedidos, reseñas) para evitar repetición de la cadena de clases.
 *
 * @example
 * <MobileCardList isLoading={loading} renderSkeleton={() => <OrderCardSkeleton />} skeletonCount={5}>
 *   {orders.map(o => <OrderCard key={o.id} order={o} />)}
 * </MobileCardList>
 */

import * as React from "react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface MobileCardListProps {
  children?: React.ReactNode;
  className?: string;
  /** Cuando true y se proporciona renderSkeleton, muestra los skeletons */
  isLoading?: boolean;
  /** Número de skeletons a mostrar en estado de carga */
  skeletonCount?: number;
  /** Factory que devuelve el elemento skeleton de la lista */
  renderSkeleton?: () => React.ReactNode;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function MobileCardList({
  children,
  className,
  isLoading = false,
  skeletonCount = 5,
  renderSkeleton,
}: MobileCardListProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-subtle bg-surface-alt overflow-hidden shadow-subtle",
        className,
      )}
      aria-busy={isLoading || undefined}
    >
      {isLoading && renderSkeleton
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <React.Fragment key={i}>{renderSkeleton()}</React.Fragment>
          ))
        : children}
    </div>
  );
}
