/**
 * @file NotificationCardSkeleton.tsx
 * @description Skeleton de carga para NotificationCard.
 * Replica la estructura visual del componente real con animate-pulse para
 * evitar CLS al transicionar del estado de carga al contenido real.
 *
 * Uso: estado de recarga (refetch) dentro de una página ya cargada,
 * no como loader de pantalla completa (para eso usar PageLoader).
 *
 * @example
 * {isLoading
 *   ? Array.from({ length: 5 }).map((_, i) => <NotificationCardSkeleton key={i} />)
 *   : notifications.map(n => <NotificationCard key={n.id} notification={n} />)
 * }
 */

import { cn } from "../../../lib/utils";

export interface NotificationCardSkeletonProps {
  className?: string;
  /** Réplica del modo compact de NotificationCard (dropdown de campana) */
  compact?: boolean;
}

/**
 * NotificationCardSkeleton — esqueleto animado que replica el layout de
 * NotificationCard (modo normal o compact) para evitar saltos de contenido (CLS).
 */
export function NotificationCardSkeleton({ className, compact = false }: NotificationCardSkeletonProps) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn(compact ? "px-3 py-2.5" : "px-4 py-3.5 sm:px-6", className)}
    >
      <div className="flex gap-3 items-start">
        {/* Avatar esqueleto */}
        <div className={cn("flex-shrink-0 rounded-xl bg-surface-alt animate-pulse", compact ? "w-8 h-8" : "w-9 h-9")} />

        {/* Contenido esqueleto */}
        <div className="flex-1 min-w-0 space-y-0">
          {/* Línea de título */}
          <div className="h-4 w-2/3 rounded bg-surface-alt animate-pulse" />

          {/* Descripción línea 1 */}
          <div className="h-3 w-full rounded bg-surface-alt animate-pulse mt-1.5" />

          {/* Descripción línea 2 — omitida en compact (descripción a 1 línea) */}
          {!compact && (
            <div className="h-3 w-1/2 rounded bg-surface-alt animate-pulse mt-1" />
          )}

          {/* Fila inferior: timestamp */}
          <div className="h-3 w-16 rounded bg-surface-alt animate-pulse mt-1" />
        </div>
      </div>
    </div>
  );
}
