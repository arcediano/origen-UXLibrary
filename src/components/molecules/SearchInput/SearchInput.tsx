/**
 * @file SearchInput.tsx
 * @description Componente SearchInput del Origen Design System.
 * Campo de búsqueda con icono, estado de carga, limpieza y debounce opcional.
 *
 * @example
 * // Uso controlado sin debounce
 * <SearchInput value={q} onChange={setQ} placeholder="Buscar productos…" />
 *
 * // Con debounce (dispara onDebouncedChange tras la pausa)
 * <SearchInput
 *   defaultValue=""
 *   onDebouncedChange={(v) => fetchSearch(v)}
 *   debounceMs={400}
 *   loading={isLoading}
 * />
 */

"use client";

import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  /** Valor controlado */
  value?: string;
  /** Callback controlado */
  onChange?: (value: string) => void;
  /** Callback con debounce (sólo si no es controlado o junto a onChange) */
  onDebouncedChange?: (value: string) => void;
  /** Milisegundos de debounce. Por defecto 300 */
  debounceMs?: number;
  /** Mostrar spinner de carga */
  loading?: boolean;
  /** Mostrar botón X para limpiar. Por defecto true */
  clearable?: boolean;
  /** Tamaño del input */
  size?: "sm" | "md" | "lg";
  /** Clases adicionales del wrapper */
  className?: string;
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

const sizeMap = {
  sm: { input: "h-9 text-xs pl-8 pr-8", icon: "h-3.5 w-3.5 left-2.5", clear: "right-2" },
  md: { input: "h-10 text-sm pl-9 pr-9", icon: "h-4 w-4 left-2.5", clear: "right-2.5" },
  lg: { input: "h-11 text-base pl-10 pr-10", icon: "h-4.5 w-4.5 left-3", clear: "right-3" },
};

// ─── Componente ───────────────────────────────────────────────────────────────

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value: controlledValue,
      onChange,
      onDebouncedChange,
      debounceMs = 300,
      loading = false,
      clearable = true,
      size = "md",
      className,
      placeholder = "Buscar…",
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      isControlled ? "" : (props.defaultValue as string) ?? "",
    );
    const value = isControlled ? controlledValue : internalValue;

    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const next = e.target.value;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);

      if (onDebouncedChange) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => onDebouncedChange(next), debounceMs);
      }
    }

    function handleClear() {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      if (onDebouncedChange) {
        if (timerRef.current) clearTimeout(timerRef.current);
        onDebouncedChange("");
      }
    }

    // Limpiar timer al desmontar
    React.useEffect(
      () => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      },
      [],
    );

    const s = sizeMap[size];

    return (
      <div className={cn("relative flex items-center", className)}>
        {/* Icono izquierdo — spinner si loading, lupa si no */}
        <span
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-text-subtle",
            s.icon,
          )}
          aria-hidden
        >
          {loading ? (
            <Loader2 className="h-full w-full animate-spin" />
          ) : (
            <Search className="h-full w-full" />
          )}
        </span>

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            // base
            "w-full rounded-xl border border-border-subtle bg-surface-alt text-origen-oscuro",
            "placeholder:text-text-subtle transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pino focus-visible:border-transparent",
            "disabled:pointer-events-none disabled:opacity-50",
            // quitar UI nativa de type=search
            "[&::-webkit-search-cancel-button]:appearance-none",
            s.input,
          )}
          {...props}
        />

        {/* Botón limpiar */}
        {clearable && value && !loading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 p-0.5 rounded-md",
              "text-text-subtle hover:text-origen-oscuro hover:bg-origen-pastel/60 transition-colors",
              s.clear,
            )}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
