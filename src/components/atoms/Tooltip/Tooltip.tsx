/**
 * @file Tooltip.tsx
 * @description Tooltip informativo del Origen Design System.
 * Usa Portal para evitar problemas de z-index. Detecta espacio disponible
 * en pantalla y posiciona automáticamente arriba o abajo.
 *
 * @example
 * <Tooltip content="Ayuda breve" detailed="Explicación extendida opcioal" />
 */

"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface TooltipProps {
  /** Texto principal del tooltip */
  content: string;
  /** Texto explicativo adicional */
  detailed?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const sizeMap = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };

export function Tooltip({ content, detailed, size = "md", className }: TooltipProps) {
  const [isOpen, setIsOpen]     = React.useState(false);
  const [position, setPosition] = React.useState<"top" | "bottom">("bottom");
  const [styles, setStyles]     = React.useState<React.CSSProperties>({});
  const [mounted, setMounted]   = React.useState(false);
  const tooltipId               = React.useId();
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const timerRef   = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const rect     = triggerRef.current.getBoundingClientRect();
    const newPos   = rect.top > window.innerHeight - rect.bottom && rect.top > 150 ? "top" : "bottom";
    setPosition(newPos);
    const base: React.CSSProperties = { position: "fixed", left: rect.left + rect.width / 2, zIndex: 9999999 };
    if (newPos === "bottom") {
      setStyles({ ...base, top: rect.bottom + 8, transform: "translateX(-50%)" });
    } else {
      setStyles({ ...base, bottom: window.innerHeight - rect.top + 8, transform: "translateX(-50%)" });
    }
  };

  const open  = () => { clearTimeout(timerRef.current); calculatePosition(); setIsOpen(true); };
  const close = () => { timerRef.current = setTimeout(() => setIsOpen(false), 200); };
  const closeImmediately = () => {
    clearTimeout(timerRef.current);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", calculatePosition, true);
    window.addEventListener("resize", calculatePosition);
    return () => {
      window.removeEventListener("scroll", calculatePosition, true);
      window.removeEventListener("resize", calculatePosition);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      ref={triggerRef}
      className={cn("relative inline-block", className)}
    >
      <button
        type="button"
        className="inline-flex items-center justify-center cursor-help text-text-subtle transition-colors hover:text-origen-pradera focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-2"
        aria-label="Mostrar ayuda"
        aria-describedby={isOpen ? tooltipId : undefined}
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={closeImmediately}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeImmediately();
          }
        }}
      >
        <HelpCircle className={sizeMap[size]} aria-hidden />
      </button>

      {isOpen && mounted &&
        createPortal(
          <div className="fixed inset-0 pointer-events-none z-[9999999]">
            <div style={styles} className="absolute w-72">
              <div id={tooltipId} role="tooltip" className="relative bg-origen-oscuro rounded-xl shadow-2xl border border-origen-pradera/20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="p-4">
                  <p className="text-sm font-semibold text-origen-crema mb-1">{content}</p>
                  {detailed && <p className="text-xs text-origen-crema/80 leading-relaxed">{detailed}</p>}
                </div>
                <div
                  className={cn(
                    "absolute w-4 h-4 bg-origen-oscuro border-l border-t border-origen-pradera/20 rotate-45",
                    position === "bottom" ? "-top-2 left-4" : "-bottom-2 left-4 -rotate-[135deg]"
                  )}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
