/**
 * @file StatHighlightCard.tsx
 * @description Tarjeta "stat" con icono y gradiente, pensada para fondos
 * oscuros o imágenes (hero de marketing, páginas de auth). Replica el patrón
 * visual usado en `HeroSection` (`/auth/register`) y `/auth/login` de
 * origen-dashboard, parametrizado.
 *
 * Diferencia con `StatCard`:
 * - `StatCard` (molecules/StatCard): tarjeta KPI para fondos CLAROS tipo
 *   dashboard (fondo `bg-white`/gris claro + borde + tinte de color sutil).
 * - `StatHighlightCard`: tarjeta "glass" (semitransparente + blur) para usar
 *   SOBRE fondos oscuros o imágenes — badge de icono con gradiente sólido,
 *   valor en blanco. NO usar sobre fondos claros (el texto blanco perdería
 *   contraste).
 *
 * @example
 * <div className="grid grid-cols-2 gap-3">
 *   <StatHighlightCard
 *     icon={<TrendingUp className="h-5 w-5" />}
 *     value="15%"
 *     label="Comisión"
 *     sublabel="Solo al vender"
 *     gradient="hoja"
 *   />
 * </div>
 */

"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type StatHighlightCardGradient = "hoja" | "pradera" | "bosque" | "mandarina";

export interface StatHighlightCardProps {
  /** Icono del badge (componente React, p. ej. de lucide-react) */
  icon: React.ReactNode;
  /** Valor principal, en grande y blanco */
  value: string;
  /** Etiqueta del stat */
  label: string;
  /** Texto secundario opcional, debajo del label */
  sublabel?: string;
  /**
   * Gradiente de marca para el badge del icono.
   * @default "hoja"
   */
  gradient?: StatHighlightCardGradient;
  /** Clases adicionales para el contenedor raíz */
  className?: string;
}

// ─── Mapa de gradientes (badge de icono) ──────────────────────────────────────

const gradientMap: Record<StatHighlightCardGradient, string> = {
  hoja: "from-origen-hoja/95 to-origen-hoja/80",
  pradera: "from-origen-pradera to-origen-hoja",
  bosque: "from-origen-bosque to-origen-pino",
  mandarina: "from-origen-mandarina to-origen-mandarina/80",
};

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Tarjeta "glass" de stat con icono y gradiente, para fondos oscuros o
 * imágenes. Ver diferenciación con `StatCard` en la documentación del
 * archivo.
 */
export function StatHighlightCard({
  icon,
  value,
  label,
  sublabel,
  gradient = "hoja",
  className,
}: StatHighlightCardProps) {
  return (
    <div
      className={cn(
        "group h-full rounded-xl border border-white/30 bg-surface-alt/20 p-3 backdrop-blur-md",
        "transition-all duration-300 hover:scale-[1.02] hover:border-origen-hoja hover:shadow-lg",
        "md:p-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg md:h-12 md:w-12 md:rounded-xl",
            "[&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white md:[&>svg]:h-6 md:[&>svg]:w-6",
            gradientMap[gradient],
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 text-xl font-bold text-white drop-shadow-sm md:text-2xl">
            {value}
          </div>
          <div className="text-sm font-medium text-white/90">{label}</div>
          {sublabel && <div className="text-xs text-white/75">{sublabel}</div>}
        </div>
      </div>
    </div>
  );
}

StatHighlightCard.displayName = "StatHighlightCard";
