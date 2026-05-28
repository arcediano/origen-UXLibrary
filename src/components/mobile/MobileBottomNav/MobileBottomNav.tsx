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
}

export interface MobileBottomNavProps extends React.HTMLAttributes<HTMLElement> {
  items: MobileBottomNavItem[];
  activeId?: string;
  onValueChange?: (id: string) => void;
  fixed?: boolean;
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

const MobileBottomNav = React.forwardRef<HTMLElement, MobileBottomNavProps>(
  ({ className, items, activeId, onValueChange, fixed = false, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Mobile bottom navigation"
      className={cn(
        "w-full border-t border-border-subtle bg-surface px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-2",
        fixed && "fixed bottom-0 left-0 right-0 z-40",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between gap-1 rounded-[1.75rem] border border-border-subtle bg-surface-alt p-1.5 shadow-origen-lg">
        {items.map((item) => (
          <MobileBottomNavLink
            key={item.id}
            item={item}
            active={item.id === activeId}
            onSelect={onValueChange}
          />
        ))}
      </div>
    </nav>
  )
);

MobileBottomNav.displayName = "MobileBottomNav";

export { MobileBottomNav };