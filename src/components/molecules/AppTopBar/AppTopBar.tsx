"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface AppTopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Slot izquierdo: breadcrumb, título de sección, logo, etc. */
  leftSlot?: React.ReactNode;
  /** Slot derecho: controles de usuario, notificaciones, acciones, etc. */
  rightSlot?: React.ReactNode;
  /** Slot central: buscador global, título centrado, etc. */
  centerSlot?: React.ReactNode;
}

/**
 * AppTopBar — shell de cabecera sticky para proyectos Origen (dashboard, admin).
 *
 * Primitivo estructural: gestiona posicionamiento, superficie y comportamiento scroll.
 * Los slots permiten componer cualquier contenido sin acoplar lógica de negocio.
 *
 * @example
 * <AppTopBar
 *   leftSlot={<DashboardBreadcrumb />}
 *   rightSlot={<><NotificationBell /><UserMenu /></>}
 * />
 */
export const AppTopBar = React.forwardRef<HTMLElement, AppTopBarProps>(
  ({ className, leftSlot, rightSlot, centerSlot, ...props }, ref) => {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-30 transition-all duration-300",
          "border-b border-border-subtle bg-surface-alt/95 backdrop-blur-xl",
          isScrolled && "shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-6 lg:px-8">
          {leftSlot !== undefined && (
            <div className="min-w-0 flex-1">{leftSlot}</div>
          )}
          {centerSlot !== undefined && (
            <div className="flex-shrink-0">{centerSlot}</div>
          )}
          {rightSlot !== undefined && (
            <div className="flex flex-shrink-0 items-center gap-2.5">{rightSlot}</div>
          )}
        </div>
      </header>
    );
  }
);
AppTopBar.displayName = "AppTopBar";
