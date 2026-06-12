"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface MobileBottomNavItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
  /**
   * Renderiza este item como un boton FAB circular elevado por encima de la
   * barra (gradiente `bg-gradient-origen`, sombra `shadow-origen`). Util para
   * patrones "floating island + accion principal" (p. ej. carrito, accion
   * central de una tab bar).
   */
  central?: boolean;
}

export interface MobileBottomNavProps extends React.HTMLAttributes<HTMLElement> {
  items: MobileBottomNavItem[];
  activeId?: string;
  onValueChange?: (id: string) => void;
  fixed?: boolean;
  /**
   * `default`: barra de ancho completo (comportamiento actual).
   * `island`: "isla flotante" con margenes laterales, `rounded-2xl` y
   * `shadow-origen-lg`, pensada para combinarse con `fixed` y con items
   * `central`.
   */
  variant?: "default" | "island";
}

function MobileBottomNavLink({
  item,
  active,
  onSelect,
}: {
  item: MobileBottomNavItem;
  active: boolean;
  onSelect?: (id: string) => void;
}) {
  const content = (
    <>
      <span
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200",
          active ? "bg-gradient-origen text-white shadow-origen" : "bg-transparent text-text-subtle"
        )}
      >
        <span className="flex items-center justify-center">{item.icon}</span>
        {item.badge !== undefined && item.badge !== 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full border border-white bg-origen-cereza px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
            {item.badge}
          </span>
        ) : null}
      </span>
      <span className={cn("text-micro font-medium transition-colors", active ? "text-origen-bosque" : "text-text-subtle")}>
        {item.label}
      </span>
    </>
  );

  const className = cn(
    "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-2",
    item.disabled && "pointer-events-none opacity-45"
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={className}
        onClick={() => onSelect?.(item.id)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={item.disabled}
      className={className}
      onClick={() => onSelect?.(item.id)}
    >
      {content}
    </button>
  );
}

function MobileBottomNavCentralLink({
  item,
  active,
  onSelect,
}: {
  item: MobileBottomNavItem;
  active: boolean;
  onSelect?: (id: string) => void;
}) {
  const fabClassName = cn(
    "relative -translate-y-4 flex h-14 w-14 items-center justify-center rounded-2xl",
    "bg-gradient-origen text-white shadow-origen transition-transform duration-200",
    "hover:-translate-y-5 active:scale-95",
    active && "-translate-y-5 ring-2 ring-origen-pradera/40 ring-offset-2 ring-offset-surface-alt",
    item.disabled && "pointer-events-none opacity-45"
  );

  const fab = (
    <span className={fabClassName}>
      <span className="flex items-center justify-center">{item.icon}</span>
      {item.badge !== undefined && item.badge !== 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full border-2 border-surface-alt bg-origen-cereza px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
          {item.badge}
        </span>
      ) : null}
    </span>
  );

  const wrapperClassName = "flex min-w-0 flex-1 flex-col items-center justify-end gap-1 px-2 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-2 rounded-2xl";

  const labelEl = (
    <span className={cn("text-micro font-medium transition-colors", active ? "text-origen-bosque" : "text-text-subtle")}>
      {item.label}
    </span>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={wrapperClassName}
        onClick={() => onSelect?.(item.id)}
      >
        {fab}
        {labelEl}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={item.disabled}
      className={wrapperClassName}
      onClick={() => onSelect?.(item.id)}
    >
      {fab}
      {labelEl}
    </button>
  );
}

const MobileBottomNav = React.forwardRef<HTMLElement, MobileBottomNavProps>(
  ({ className, items, activeId, onValueChange, fixed = false, variant = "default", ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Mobile bottom navigation"
      className={cn(
        "w-full",
        variant === "default" && "border-t border-border-subtle bg-surface px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-2",
        variant === "island" && "px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.625rem)] pt-2",
        fixed && "fixed bottom-0 left-0 right-0 z-40",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-stretch justify-between gap-1 border border-border-subtle bg-surface-alt p-1.5",
          variant === "default" && "rounded-[1.75rem] shadow-origen-lg",
          variant === "island" && "mx-auto max-w-md rounded-2xl shadow-origen-lg"
        )}
      >
        {items.map((item) =>
          item.central ? (
            <MobileBottomNavCentralLink
              key={item.id}
              item={item}
              active={item.id === activeId}
              onSelect={onValueChange}
            />
          ) : (
            <MobileBottomNavLink
              key={item.id}
              item={item}
              active={item.id === activeId}
              onSelect={onValueChange}
            />
          )
        )}
      </div>
    </nav>
  )
);

MobileBottomNav.displayName = "MobileBottomNav";

export { MobileBottomNav };
