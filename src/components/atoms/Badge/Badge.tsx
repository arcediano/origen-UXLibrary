/**
 * @file Badge.tsx
 * @description Componente Badge del Origen Design System.
 * Incluye variantes semánticas y un helper StatusBadge para estados de negocio.
 *
 * @example
 * <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Activo</Badge>
 * <StatusBadge status="out_of_stock" />
 */

"use client";

import * as React from "react";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Package,
  FileText,
} from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | "success"   // Verde    — Activo, Completado, Verificado
  | "warning"   // Ámbar    — Pendiente, Stock bajo
  | "danger"    // Rojo     — Error, Agotado, Cancelado
  | "info"      // Azul     — Procesando, Enviado
  | "neutral"   // Gris     — Inactivo, Borrador
  | "leaf"      // Corporativo verde — Certificaciones, tags de marca
  | "outline"   // Borde neutro
  | "warm";     // Mandarina — Temporada, oferta, tiempo limitado

export type BadgeSize = "xs" | "sm" | "md" | "lg";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Cualquier icono de React (recomendado: lucide-react h-3 w-3) */
  icon?: React.ReactNode;
  className?: string;
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-50 text-green-900 border-green-700",
  warning: "bg-amber-50 text-amber-900 border-amber-700",
  danger:  "bg-red-50 text-red-900 border-red-700",
  info:    "bg-blue-50 text-blue-900 border-blue-700",
  neutral: "bg-gray-100 text-gray-700 border-gray-400",
  leaf:    "bg-origen-pastel text-origen-bosque border-origen-hoja",
  outline: "bg-white text-gray-700 border-gray-400",
  warm:    "bg-origen-mandarina/12 text-origen-mandarina border-origen-mandarina/30",
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "px-1.5 py-0.5 text-[10px] gap-1",
  sm: "px-2   py-1   text-xs     gap-1",
  md: "px-2.5 py-1.5 text-xs     gap-1.5",
  lg: "px-3   py-2   text-sm     gap-1.5",
};

// ─── Badge Base ───────────────────────────────────────────────────────────────

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="shrink-0" aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

export type StatusType =
  | "active" | "inactive" | "out_of_stock" | "draft" | "pending_approval"
  | "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  | "confirmed" | "returned" | "refunded"
  | "review_pending" | "review_approved" | "review_rejected" | "review_flagged"
  | "verified" | "pending_verification" | "approved" | "suspended";

export interface StatusBadgeProps {
  status: StatusType;
  size?: BadgeSize;
  className?: string;
}

const STATUS_MAP: Record<StatusType, { variant: BadgeVariant; label: string; icon: React.ReactNode }> = {
  // Producto
  active:              { variant: "success", label: "Activo",                  icon: <CheckCircle className="w-3 h-3" /> },
  inactive:            { variant: "neutral", label: "Inactivo",                icon: <Clock       className="w-3 h-3" /> },
  out_of_stock:        { variant: "danger",  label: "Sin stock",               icon: <AlertCircle className="w-3 h-3" /> },
  draft:               { variant: "neutral", label: "Borrador",                icon: <FileText    className="w-3 h-3" /> },
  pending_approval:    { variant: "warning", label: "Pendiente aprobación",    icon: <Clock       className="w-3 h-3" /> },
  // Pedido
  pending:             { variant: "warning", label: "Pendiente",               icon: <Clock       className="w-3 h-3" /> },
  processing:          { variant: "info",    label: "Procesando",              icon: <Package     className="w-3 h-3" /> },
  shipped:             { variant: "info",    label: "Enviado",                 icon: <Package     className="w-3 h-3" /> },
  delivered:           { variant: "success", label: "Entregado",               icon: <CheckCircle className="w-3 h-3" /> },
  cancelled:           { variant: "danger",  label: "Cancelado",               icon: <XCircle     className="w-3 h-3" /> },
  confirmed:           { variant: "info",    label: "Confirmado",              icon: <CheckCircle className="w-3 h-3" /> },
  returned:            { variant: "warning", label: "Devuelto",                icon: <AlertCircle className="w-3 h-3" /> },
  refunded:            { variant: "neutral", label: "Reembolsado",             icon: <FileText    className="w-3 h-3" /> },
  // Reseña
  review_pending:      { variant: "warning", label: "Pendiente de aprobación", icon: <Clock       className="w-3 h-3" /> },
  review_approved:     { variant: "success", label: "Publicada",               icon: <CheckCircle className="w-3 h-3" /> },
  review_rejected:     { variant: "danger",  label: "Rechazada",               icon: <XCircle     className="w-3 h-3" /> },
  review_flagged:      { variant: "warning", label: "Reportada",               icon: <AlertCircle className="w-3 h-3" /> },
  // Verificación
  verified:            { variant: "success", label: "Verificado",              icon: <CheckCircle className="w-3 h-3" /> },
  pending_verification:{ variant: "neutral", label: "Pendiente verificación",  icon: <Clock       className="w-3 h-3" /> },
  approved:            { variant: "success", label: "Aprobado",                icon: <CheckCircle className="w-3 h-3" /> },
  suspended:           { variant: "danger",  label: "Suspendido",              icon: <AlertCircle className="w-3 h-3" /> },
};

/**
 * Versión semántica de Badge para estados de negocio.
 * Mapea automáticamente el estado a la variante e icono correctos.
 *
 * @example
 * <StatusBadge status="active" />
 * <StatusBadge status="out_of_stock" size="sm" />
 */
export function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const config = STATUS_MAP[status] ?? STATUS_MAP.pending;
  return (
    <Badge variant={config.variant} size={size} icon={config.icon} className={className}>
      {config.label}
    </Badge>
  );
}
