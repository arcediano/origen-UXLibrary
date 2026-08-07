/**
 * @file NotificationCard.tsx
 * @description Componente NotificationCard del Origen Design System.
 * Muestra una notificación con iconografía por tipo de evento, badge de prioridad,
 * badge de categoría, indicador de no leído (borde izquierdo) y modo compact
 * para el dropdown de campana.
 *
 * No lleva "use client" — los handlers se pasan como props desde el padre.
 *
 * @example
 * <NotificationCard
 *   notification={notification}
 *   onMarkAsRead={(id) => markAsRead(id)}
 * />
 * <NotificationCard notification={notification} compact />
 */

import type { KeyboardEvent, MouseEvent } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../Badge";
import { getNotificationIconConfig } from "./notification-icon-map";

// ─── Tipos de soporte (espejo de notification.ts del dashboard) ───────────────

export type NotificationCardCategory =
  | "ORDER"
  | "PRODUCT"
  | "REVIEW"
  | "ACCOUNT"
  | "SYSTEM"
  | "MARKETING";

export type NotificationCardPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface NotificationCardProps {
  notification: {
    id: string;
    title: string;
    description: string;
    timestamp: Date;
    read: boolean;
    category?: NotificationCardCategory;
    /** Acepta los valores definidos del sistema y cualquier string para extensibilidad */
    eventType?: string;
    priority?: NotificationCardPriority;
    action?: { url?: string };
  };
  onMarkAsRead?: (id: string) => void;
  onClose?: () => void;
  compact?: boolean;
  className?: string;
}

// ─── Labels de categoría ──────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<NotificationCardCategory, string> = {
  ORDER:     "Pedido",
  PRODUCT:   "Producto",
  REVIEW:    "Reseña",
  ACCOUNT:   "Cuenta",
  SYSTEM:    "Sistema",
  MARKETING: "Marketing",
};

// ─── Utilidad timeAgo ─────────────────────────────────────────────────────────

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "ahora mismo";
  if (diffMins < 60) return `hace ${diffMins} ${diffMins === 1 ? "minuto" : "minutos"}`;
  if (diffHours < 24) return `hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;
  if (diffDays < 7) return `hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`;

  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * NotificationCard — tarjeta de notificación individual.
 *
 * Modo normal: avatar + título + badge prioridad + descripción 2 líneas +
 * timestamp + badge categoría + botón marcar como leída (si procede).
 *
 * Modo compact (prop compact): padding reducido, descripción 1 línea,
 * sin badge de categoría, sin badge de prioridad, sin botón marcar como leída.
 */
export function NotificationCard({
  notification,
  onMarkAsRead,
  onClose: _onClose,
  compact = false,
  className,
}: NotificationCardProps) {
  // `action` (URL de navegación) ya no se lee aquí: el botón de "marcar como
  // leída" es independiente de si existe enlace (ver comentario de
  // `showMarkAsRead` más abajo). Se mantiene en `NotificationCardProps` por
  // compatibilidad con consumidores que lo siguen pasando.
  const { id, title, description, timestamp, read, category, eventType, priority } =
    notification;

  const iconConfig = getNotificationIconConfig(eventType, category);
  const Icon = iconConfig.icon;

  // El control de "marcar como leída" ya no depende de si la notificación
  // tiene action.url: es un botón propio con stopPropagation, independiente
  // del click de navegación de la tarjeta (antes se ocultaba por completo
  // para notificaciones con enlace, dejando sin forma de marcarlas leídas
  // sin navegar).
  const showMarkAsRead = !compact && !read && !!onMarkAsRead;
  const showCategoryBadge = !compact && category;
  const showPriorityBadge = !compact && (priority === "URGENT" || priority === "HIGH");

  const handleMarkAsReadClick = (event: MouseEvent | KeyboardEvent) => {
    event.stopPropagation();
    onMarkAsRead?.(id);
  };

  return (
    <div
      role="listitem"
      className={cn(
        "relative transition-colors hover:bg-surface group",
        compact ? "px-3 py-2.5" : "px-4 py-3.5 sm:px-6",
        // Fondo tenue reservado a lo no leído: refuerza el indicador de
        // color sin bajar la opacidad del texto (evita fallos de contraste
        // en notificaciones ya leídas). También en modo compact (dropdown/
        // panel móvil) — la distinción leído/no leído debe ser igual de
        // clara en la vista previa que en la bandeja completa.
        !read && "bg-origen-pastel/25",
        className,
      )}
    >
      {/* Indicador de no leído: borde izquierdo coloreado */}
      {!read && (
        <div
          className="absolute left-0 inset-y-0 w-[3px] rounded-r-full"
          style={{ backgroundColor: iconConfig.borderColor }}
          aria-hidden
        />
      )}

      {/* Fila principal */}
      <div className="flex gap-3 items-start">
        {/* Avatar de icono */}
        <div
          className={cn(
            "flex-shrink-0 rounded-xl flex items-center justify-center",
            compact ? "w-8 h-8" : "w-9 h-9",
            iconConfig.bg,
            // Leído: icono desaturado para que el ojo priorice lo pendiente
            // sin tocar el contraste del texto (heurística de escaneabilidad).
            read && "opacity-60",
          )}
          aria-hidden
        >
          <Icon className={cn("w-4 h-4", iconConfig.color)} />
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {/* Fila de título + badge de prioridad + marcar como leída */}
          <div className="flex items-start justify-between gap-2">
            <p
              className={cn(
                "text-sm leading-snug",
                read ? "font-medium text-foreground" : "font-semibold text-origen-bosque",
              )}
            >
              {title}
            </p>

            <span className="flex-shrink-0 flex items-center gap-1.5">
              {showPriorityBadge && (
                priority === "URGENT" ? (
                  <Badge variant="danger" size="xs">URGENTE</Badge>
                ) : (
                  <Badge variant="warning" size="xs">ALTA</Badge>
                )
              )}

              {showMarkAsRead && (
                <button
                  type="button"
                  onClick={handleMarkAsReadClick}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleMarkAsReadClick(event);
                    }
                  }}
                  className={cn(
                    // 44px de hit target (R13 del manual): el marcador visual
                    // sigue siendo un punto pequeño, pero el área táctil real
                    // cubre todo el botón — crítico en la bandeja completa,
                    // que se usa igual en móvil que en escritorio.
                    "flex items-center justify-center w-11 h-11 -m-2 rounded-full",
                    "hover:bg-origen-pradera/15 active:scale-90 transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera",
                  )}
                  aria-label={`Marcar como leída: ${title}`}
                  title="Marcar como leída"
                >
                  <span
                    className="block w-2 h-2 rounded-full bg-origen-bosque"
                    aria-hidden
                  />
                </button>
              )}
            </span>
          </div>

          {/* Descripción */}
          <p
            className={cn(
              "text-xs text-muted-foreground mt-0.5",
              compact ? "line-clamp-1" : "line-clamp-2",
            )}
          >
            {description}
          </p>

          {/* Fila inferior: timestamp + badge de categoría */}
          <div className="flex items-center justify-between mt-1 gap-2">
            <span
              className="text-[10px] text-text-subtle"
              title={timestamp.toLocaleString("es-ES")}
            >
              {timeAgo(timestamp)}
            </span>

            {showCategoryBadge && (
              <Badge variant="leaf" size="xs">
                {CATEGORY_LABELS[category!]}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
