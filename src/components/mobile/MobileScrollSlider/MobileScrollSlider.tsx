/**
 * @file MobileScrollSlider.tsx
 * @description Slider horizontal táctil con scroll-snap para cards en mobile.
 * Migrado desde origen-dashboard/src/components/features/landing/components/mobile-card-slider.tsx
 *
 * @example
 * <MobileScrollSlider cardWidthClass="w-[82vw] max-w-xs">
 *   {items.map((item) => <MyCard key={item.id} {...item} />)}
 * </MobileScrollSlider>
 */

"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface MobileScrollSliderProps {
  /** Elementos del slider — cada hijo se envuelve en un contenedor snap */
  children: React.ReactNode[];
  /**
   * Clases de ancho para cada tarjeta.
   * @default "w-[82vw] max-w-xs"
   */
  cardWidthClass?: string;
  /** Clase CSS adicional para el contenedor raíz */
  className?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function MobileScrollSlider({
  children,
  cardWidthClass = "w-[82vw] max-w-xs",
  className,
}: MobileScrollSliderProps) {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIndex(index);
  }, []);

  const goTo = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 pb-3 px-4"
      >
        {children.map((child, i) => (
          <div key={i} className={cn("snap-start flex-shrink-0", cardWidthClass)}>
            {child}
          </div>
        ))}
      </div>

      {children.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4" role="tablist" aria-label="Navegación de tarjetas">
          {children.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              aria-label={`Ir a la tarjeta ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "bg-origen-pradera w-6"
                  : "bg-border w-1.5"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

MobileScrollSlider.displayName = "MobileScrollSlider";
