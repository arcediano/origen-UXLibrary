/**
 * @file PageContainer.tsx
 * @description Contenedor estándar de página para todos los proyectos Origen.
 * Centraliza el padding responsive y el fondo de página, eliminando la necesidad
 * de repetir la cadena de clases en cada página.
 *
 * También gestiona el bottom padding seguro para el BottomTabBar en mobile
 * (solo aplicable en proyectos con barra de navegación inferior).
 *
 * @example
 * // Sección interna del dashboard (fondo crema)
 * <PageContainer>
 *   <ProductStats />
 *   <ProductTable />
 * </PageContainer>
 *
 * // Dashboard overview (gradiente)
 * <PageContainer variant="gradient">
 *   <StatsGrid />
 *   <Charts />
 * </PageContainer>
 */

import * as React from "react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type PageContainerVariant = "default" | "gradient" | "crema" | "transparent";

export interface PageContainerProps {
  /**
   * Variante de fondo de la página.
   * - `default`: `bg-surface` (blanco/crema claro — secciones internas)
   * - `gradient`: `bg-gradient-to-b from-white to-origen-crema` (overview principal)
   * - `crema`: `bg-origen-crema/40` (fondos secundarios suaves)
   * - `transparent`: sin fondo (hereda del layout)
   * @default "default"
   */
  variant?: PageContainerVariant;
  /**
   * Aplica el padding inferior seguro para el BottomTabBar en mobile.
   * Usar solo en layouts que tienen barra de navegación inferior.
   * @default false
   */
  safeBottomPadding?: boolean;
  children: React.ReactNode;
  className?: string;
}

// ─── Variantes ────────────────────────────────────────────────────────────────

const variantClasses: Record<PageContainerVariant, string> = {
  default:     "",
  gradient:    "bg-gradient-to-b from-white to-origen-crema",
  crema:       "bg-origen-crema/40",
  transparent: "",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function PageContainer({
  variant = "default",
  safeBottomPadding = false,
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
        "space-y-5 sm:space-y-6 lg:space-y-8",
        safeBottomPadding && "pb-[calc(88px+env(safe-area-inset-bottom))] sm:pb-8",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
