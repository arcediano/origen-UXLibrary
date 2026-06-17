/**
 * @file notification-icon-map.ts
 * @description Mapa interno de iconos y colores por NotificationEventType y NotificationCategory.
 * Resuelve primero por eventType y usa category como fallback.
 * No forma parte de la API pública del componente.
 *
 * Grupos definidos en el Plan de Diseño notifications-redesign 2026-06-17.
 */

import {
  ShoppingBag,
  Star,
  Package,
  UserCheck,
  Briefcase,
  FileCheck,
  Megaphone,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

// ─── Tipos internos ───────────────────────────────────────────────────────────

export interface IconConfig {
  icon: LucideIcon;
  /** Clase Tailwind de color de texto para el icono (usa tokens Origen) */
  color: string;
  /** Clase Tailwind de fondo del avatar */
  bg: string;
  /** Color CSS para el borde izquierdo de "no leído" (var de custom property) */
  borderColor: string;
}

// ─── Mapa por eventType ───────────────────────────────────────────────────────

const EVENT_TYPE_MAP: Record<string, IconConfig> = {
  // Grupo ORDER
  NEW_ORDER:             { icon: ShoppingBag, color: "text-origen-bosque",  bg: "bg-origen-pradera/10", borderColor: "var(--origen-bosque)" },
  ORDER_STATUS_CHANGED:  { icon: ShoppingBag, color: "text-origen-bosque",  bg: "bg-origen-pradera/10", borderColor: "var(--origen-bosque)" },
  ORDER_DELIVERED:       { icon: ShoppingBag, color: "text-origen-bosque",  bg: "bg-origen-pradera/10", borderColor: "var(--origen-bosque)" },
  ORDER_CANCELLED:       { icon: ShoppingBag, color: "text-origen-bosque",  bg: "bg-origen-pradera/10", borderColor: "var(--origen-bosque)" },

  // Grupo REVIEW
  NEW_REVIEW:            { icon: Star,        color: "text-origen-menta",   bg: "bg-origen-menta/10",   borderColor: "var(--origen-menta)" },
  REVIEW_REPLY:          { icon: Star,        color: "text-origen-menta",   bg: "bg-origen-menta/10",   borderColor: "var(--origen-menta)" },

  // Grupo PRODUCT
  PRODUCT_LOW_STOCK:     { icon: Package,     color: "text-origen-hoja",    bg: "bg-origen-hoja/10",    borderColor: "var(--origen-hoja)" },
  PRODUCT_APPROVED:      { icon: Package,     color: "text-origen-hoja",    bg: "bg-origen-hoja/10",    borderColor: "var(--origen-hoja)" },
  PRODUCT_REJECTED:      { icon: Package,     color: "text-origen-hoja",    bg: "bg-origen-hoja/10",    borderColor: "var(--origen-hoja)" },

  // Grupo ACCOUNT_BASIC
  ACCOUNT_VERIFIED:      { icon: UserCheck,   color: "text-origen-bosque",  bg: "bg-origen-bosque/10",  borderColor: "var(--origen-bosque)" },
  ACCOUNT_SUSPENDED:     { icon: UserCheck,   color: "text-origen-bosque",  bg: "bg-origen-bosque/10",  borderColor: "var(--origen-bosque)" },
  PASSWORD_CHANGED:      { icon: UserCheck,   color: "text-origen-bosque",  bg: "bg-origen-bosque/10",  borderColor: "var(--origen-bosque)" },
  WELCOME:               { icon: UserCheck,   color: "text-origen-bosque",  bg: "bg-origen-bosque/10",  borderColor: "var(--origen-bosque)" },

  // Grupo ONBOARDING
  PRODUCER_REQUEST_RECEIVED: { icon: Briefcase, color: "text-origen-pradera", bg: "bg-origen-pradera/10", borderColor: "var(--origen-pradera)" },
  PRODUCER_REQUEST_APPROVED: { icon: Briefcase, color: "text-origen-pradera", bg: "bg-origen-pradera/10", borderColor: "var(--origen-pradera)" },
  PRODUCER_REQUEST_REJECTED: { icon: Briefcase, color: "text-origen-pradera", bg: "bg-origen-pradera/10", borderColor: "var(--origen-pradera)" },
  ONBOARDING_COMPLETED:      { icon: Briefcase, color: "text-origen-pradera", bg: "bg-origen-pradera/10", borderColor: "var(--origen-pradera)" },
  PROFILE_UNDER_REVIEW:      { icon: Briefcase, color: "text-origen-pradera", bg: "bg-origen-pradera/10", borderColor: "var(--origen-pradera)" },
  PROFILE_ACTIVATED:         { icon: Briefcase, color: "text-origen-pradera", bg: "bg-origen-pradera/10", borderColor: "var(--origen-pradera)" },
  ONBOARDING_REMINDER:       { icon: Briefcase, color: "text-origen-pradera", bg: "bg-origen-pradera/10", borderColor: "var(--origen-pradera)" },

  // Grupo DOCUMENTS
  DOCUMENT_APPROVED:         { icon: FileCheck, color: "text-origen-pino",   bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DOCUMENT_REJECTED:         { icon: FileCheck, color: "text-origen-pino",   bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DOCUMENT_EXPIRING_SOON:    { icon: FileCheck, color: "text-origen-pino",   bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DOCUMENT_EXPIRED:          { icon: FileCheck, color: "text-origen-pino",   bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },

  // Grupo MARKETING
  PROMOTION_CREATED:         { icon: Megaphone, color: "text-origen-hoja",   bg: "bg-origen-hoja/10",   borderColor: "var(--origen-hoja)" },

  // Grupo SYSTEM_AND_DISPUTES
  SYSTEM_MAINTENANCE:        { icon: AlertCircle, color: "text-origen-pino", bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  SYSTEM_ALERT:              { icon: AlertCircle, color: "text-origen-pino", bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DISPUTE_OPENED:            { icon: AlertCircle, color: "text-origen-pino", bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DISPUTE_ASSIGNED:          { icon: AlertCircle, color: "text-origen-pino", bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DISPUTE_MESSAGE:           { icon: AlertCircle, color: "text-origen-pino", bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DISPUTE_STATUS_CHANGED:    { icon: AlertCircle, color: "text-origen-pino", bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
  DISPUTE_RESOLVED:          { icon: AlertCircle, color: "text-origen-pino", bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },

  // Tipo legacy (compatibilidad con NotificationType anterior)
  CERTIFICATION_PENDING:     { icon: FileCheck, color: "text-origen-pino",   bg: "bg-origen-pino/10",   borderColor: "var(--origen-pino)" },
};

// ─── Fallback por category ────────────────────────────────────────────────────

const CATEGORY_FALLBACK_MAP: Record<string, IconConfig> = {
  ORDER:     { icon: ShoppingBag,  color: "text-origen-bosque",  bg: "bg-origen-pradera/10", borderColor: "var(--origen-bosque)" },
  PRODUCT:   { icon: Package,      color: "text-origen-hoja",    bg: "bg-origen-hoja/10",    borderColor: "var(--origen-hoja)" },
  REVIEW:    { icon: Star,         color: "text-origen-menta",   bg: "bg-origen-menta/10",   borderColor: "var(--origen-menta)" },
  ACCOUNT:   { icon: UserCheck,    color: "text-origen-bosque",  bg: "bg-origen-bosque/10",  borderColor: "var(--origen-bosque)" },
  SYSTEM:    { icon: AlertCircle,  color: "text-origen-pino",    bg: "bg-origen-pino/10",    borderColor: "var(--origen-pino)" },
  MARKETING: { icon: Megaphone,    color: "text-origen-hoja",    bg: "bg-origen-hoja/10",    borderColor: "var(--origen-hoja)" },
};

/** Config por defecto cuando ni eventType ni category tienen entrada en el mapa */
const DEFAULT_CONFIG: IconConfig = {
  icon: AlertCircle,
  color: "text-origen-pino",
  bg: "bg-origen-pino/10",
  borderColor: "var(--origen-pino)",
};

// ─── Función de resolución ────────────────────────────────────────────────────

/**
 * Devuelve la configuración de icono y color para una notificación.
 * Resuelve primero por eventType, luego por category, y finalmente usa el fallback.
 */
export function getNotificationIconConfig(
  eventType?: string,
  category?: string,
): IconConfig {
  if (eventType && eventType in EVENT_TYPE_MAP) {
    return EVENT_TYPE_MAP[eventType];
  }
  if (category && category in CATEGORY_FALLBACK_MAP) {
    return CATEGORY_FALLBACK_MAP[category];
  }
  return DEFAULT_CONFIG;
}
