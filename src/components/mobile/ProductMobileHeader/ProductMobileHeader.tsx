"use client";

import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ProductMobileHeaderProps {
  /** Nombre del producto, se muestra truncado en el centro. */
  productName: string;
  /**
   * Callback al pulsar el botón back. El proyecto consumidor gestiona la
   * lógica de navegación (router.back() vs router.push('/productos')).
   */
  onBack: () => void;
  /**
   * Slot trailing opcional. Se reserva un ancho fijo de 40px para que el
   * título permanezca centrado cuando no hay elemento trailing.
   */
  trailing?: React.ReactNode;
  className?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ProductMobileHeader({
  productName,
  onBack,
  trailing,
  className,
}: ProductMobileHeaderProps) {
  return (
    <div
      className={cn(
        "lg:hidden fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border-subtle",
        className
      )}
    >
      <div className="flex items-center h-14 px-2 gap-2">
        {/* Botón back */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-surface-alt text-text-primary transition-colors shrink-0"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Título centrado */}
        <p className="flex-1 text-sm font-semibold text-text-primary truncate text-center">
          {productName}
        </p>

        {/* Slot trailing — ancho fijo para mantener el título centrado */}
        <div className="w-10 flex justify-end shrink-0">
          {trailing ?? null}
        </div>
      </div>
    </div>
  );
}

ProductMobileHeader.displayName = "ProductMobileHeader";
