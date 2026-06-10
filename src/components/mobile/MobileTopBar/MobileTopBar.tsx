"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface MobileTopBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Titulo principal. Acepta texto simple (recomendado para la mayoria de
   * casos) o contenido React enriquecido (logo con marca, titulo animado, etc).
   * Cuando se pasa `center`, esta prop se ignora.
   */
  title?: React.ReactNode;
  subtitle?: string;
  /**
   * Slot izquierdo. Por defecto se renderiza con `shrink-0` (icono/boton).
   * Para bloques que necesiten ocupar el ancho flexible (p. ej. "boton volver
   * + titulo animado"), usa `leadingClassName` para sobreescribir el layout
   * del wrapper, o usa `center` para sustituir todo el bloque central.
   */
  leading?: React.ReactNode;
  /** Clases adicionales para el wrapper de `leading` (sobreescribe `shrink-0`). */
  leadingClassName?: string;
  trailing?: React.ReactNode;
  /**
   * Sustituye por completo el bloque central (title/subtitle), manteniendo
   * `min-w-0 flex-1`. Util para contenido muy dinamico (logo + marca,
   * boton volver + titulo animado por ruta, etc.).
   */
  center?: React.ReactNode;
  /** Clases adicionales para el wrapper del bloque central (title/subtitle/center). */
  centerClassName?: string;
  sticky?: boolean;
}

const MobileTopBar = React.forwardRef<HTMLDivElement, MobileTopBarProps>(
  (
    {
      className,
      title,
      subtitle,
      leading,
      leadingClassName,
      trailing,
      center,
      centerClassName,
      sticky = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "w-full border-b border-border-subtle bg-surface/92 px-4 pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.875rem)] backdrop-blur-md",
        sticky && "sticky top-0 z-30",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        {leading ? (
          <div className={cn("flex shrink-0 items-center", leadingClassName)}>{leading}</div>
        ) : null}
        {center ? (
          <div className={cn("min-w-0 flex-1", centerClassName)}>{center}</div>
        ) : (
          <div className={cn("min-w-0 flex-1", centerClassName)}>
            {typeof title === "string" ? (
              <p className="truncate text-body font-semibold text-origen-bosque">{title}</p>
            ) : (
              title
            )}
            {subtitle ? <p className="truncate text-micro text-text-subtle">{subtitle}</p> : null}
          </div>
        )}
        {trailing ? <div className="flex shrink-0 items-center gap-2">{trailing}</div> : null}
      </div>
    </div>
  )
);

MobileTopBar.displayName = "MobileTopBar";

export { MobileTopBar };
