"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MobileTopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  sticky?: boolean;
}

const MobileTopBar = React.forwardRef<HTMLDivElement, MobileTopBarProps>(
  ({ className, title, subtitle, leading, trailing, sticky = false, ...props }, ref) => (
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
        {leading ? <div className="flex shrink-0 items-center">{leading}</div> : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-body font-semibold text-origen-bosque">{title}</p>
          {subtitle ? <p className="truncate text-micro text-text-subtle">{subtitle}</p> : null}
        </div>
        {trailing ? <div className="flex shrink-0 items-center gap-2">{trailing}</div> : null}
      </div>
    </div>
  )
);

MobileTopBar.displayName = "MobileTopBar";

export { MobileTopBar };