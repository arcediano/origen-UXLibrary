"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AlertCircle, Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useIsMobile } from "../../../lib/hooks/useIsMobile";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  registerLabel: (value: string, label: string) => void;
  getLabel: (value: string) => string | undefined;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

function useSelect(): SelectContextType {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("Select components must be used inside Select");
  return context;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: string;
  children: React.ReactNode;
  items?: Array<{ value: string; label: string }>;
  className?: string;
}

const Select = ({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Selecciona una opción",
  searchable = false,
  disabled = false,
  required = false,
  name,
  error,
  children,
  items,
  className,
}: SelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const labelsRef = React.useRef(new Map<string, string>());

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const registerLabel = React.useCallback((optionValue: string, label: string) => {
    labelsRef.current.set(optionValue, label);
  }, []);

  const getLabel = React.useCallback((optionValue: string) => labelsRef.current.get(optionValue), []);

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      if (!isControlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
      setOpen(false);
      setSearchTerm("");
    },
    [isControlled, onValueChange]
  );

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
        placeholder,
        searchTerm,
        setSearchTerm,
        searchable,
        disabled,
        error,
        triggerRef,
        registerLabel,
        getLabel,
      }}
    >
      <div className={cn("relative w-full", className)}>
        <select
          name={name}
          value={currentValue}
          onChange={(event) => handleValueChange(event.target.value)}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          disabled={disabled}
          required={required}
        >
          <option value="">{placeholder}</option>
          {items?.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {children}

        {error && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const { open, setOpen, disabled: ctxDisabled, error, triggerRef } = useSelect();
    const disabled = props.disabled || ctxDisabled;

    const setRefs = React.useCallback(
      (element: HTMLButtonElement | null) => {
        triggerRef.current = element;
        if (typeof forwardedRef === "function") forwardedRef(element);
        else if (forwardedRef) forwardedRef.current = element;
      },
      [forwardedRef, triggerRef]
    );

    return (
      <button
        ref={setRefs}
        {...props}
        type="button"
        onClick={(event) => {
          if (!disabled) setOpen(!open);
          props.onClick?.(event);
        }}
        className={cn(
          "flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl border bg-white px-3 py-2 text-left transition-all duration-200 sm:px-4 sm:py-3",
          "focus:outline-none focus:ring-2 focus:ring-origen-pradera/50 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-50",
          error
            ? "border-feedback-danger hover:border-red-600"
            : cn("border-origen-pradera/30 hover:border-origen-hoja", open && "border-origen-pradera ring-2 ring-origen-pradera/20"),
          className
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={!!error}
        disabled={disabled}
      >
        {children ?? (
          <>
            <span className="flex-1 truncate text-sm sm:text-base">Seleccionar</span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-text-subtle transition-transform", open && "rotate-180")} />
          </>
        )}
      </button>
    );
  }
);

export interface SelectValueProps {
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

const SelectValue = ({ placeholder: customPlaceholder, className, children }: SelectValueProps) => {
  const { value, placeholder, getLabel } = useSelect();

  if (children) {
    return <span className={cn("flex-1 truncate text-sm sm:text-base", className)}>{children}</span>;
  }

  const selectedLabel = value ? getLabel(value) ?? value : customPlaceholder ?? placeholder;

  return (
    <span className={cn("flex-1 truncate text-sm sm:text-base", !value && "text-text-disabled", className)}>
      {selectedLabel}
    </span>
  );
};

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const { open, setOpen, searchTerm, setSearchTerm, searchable, triggerRef } = useSelect();
    const isMobile = useIsMobile();
    const contentRef = React.useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
    const [mounted, setMounted] = React.useState(false);
    const [entered, setEntered] = React.useState(false);
    const [style, setStyle] = React.useState<React.CSSProperties>({});

    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    React.useEffect(() => {
      if (!open) {
        setEntered(false);
        return;
      }
      const raf = window.requestAnimationFrame(() => setEntered(true));
      return () => window.cancelAnimationFrame(raf);
    }, [open]);

    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current || isMobile) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }, [isMobile, triggerRef]);

    React.useEffect(() => {
      if (!open || isMobile) return;
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [open, isMobile, updatePosition]);

    React.useEffect(() => {
      if (!open) return;
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const outsideContent = contentRef.current && !contentRef.current.contains(target);
        const outsideTrigger = triggerRef.current && !triggerRef.current.contains(target);
        if (outsideContent && outsideTrigger) {
          setOpen(false);
          setSearchTerm("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen, setSearchTerm, triggerRef]);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    if (!open || !mounted) return null;

    return createPortal(
      <div
        ref={setRefs}
        style={isMobile ? undefined : style}
        className={cn(
          "border border-border bg-white shadow-lg",
          "flex max-h-[90dvh] flex-col overflow-hidden",
          "transition-transform duration-300 ease-out",
          isMobile
            ? cn(
                "fixed bottom-0 inset-x-0 z-[90] rounded-t-3xl",
                entered ? "translate-y-0" : "translate-y-full"
              )
            : "z-[90] max-h-80 rounded-xl",
          className
        )}
        {...props}
      >
        {isMobile && <div className="mx-auto mb-2 mt-3 h-1 w-10 rounded-full bg-border-subtle" aria-hidden />}

        {searchable && (
          <div className="border-b border-border p-2 sm:p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-disabled" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar..."
                className="w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-9 text-sm outline-none focus:border-origen-pradera focus:ring-1 focus:ring-origen-pradera/50"
                onClick={(event) => event.stopPropagation()}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center text-text-disabled hover:text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-1" role="listbox">
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ value, className, children, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange, searchTerm, registerLabel } = useSelect();
    const isSelected = selectedValue === value;

    const textLabel = typeof children === "string" ? children : undefined;

    React.useEffect(() => {
      if (textLabel) {
        registerLabel(value, textLabel);
      }
    }, [registerLabel, textLabel, value]);

    if (searchTerm && textLabel) {
      if (!textLabel.toLowerCase().includes(searchTerm.toLowerCase())) return null;
    }

    return (
      <button
        ref={ref}
        {...props}
        type="button"
        className={cn(
          "relative flex min-h-[52px] w-full cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-9 text-sm outline-none transition-all duration-150 sm:min-h-[44px]",
          "hover:bg-origen-crema hover:text-origen-bosque",
          "focus:bg-origen-crema focus:text-origen-bosque focus:outline-none focus:ring-2 focus:ring-origen-pradera/50",
          disabled && "pointer-events-none opacity-50",
          isSelected && "bg-origen-crema/80 font-medium text-origen-bosque",
          className
        )}
        onClick={(event) => {
          if (!disabled) onValueChange(value);
          props.onClick?.(event);
        }}
        disabled={disabled}
        role="option"
        aria-selected={isSelected}
      >
        <span className="truncate">{children}</span>
        {isSelected && (
          <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
            <Check className="h-4 w-4 text-origen-pradera" />
          </span>
        )}
      </button>
    );
  }
);

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: React.ReactNode;
}

const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-surface/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-text-subtle",
        className
      )}
      {...props}
    />
  )
);

const SelectGroup = ({ label, children, className, ...props }: SelectGroupProps) => (
  <div role="group" aria-label={label} className={className} {...props}>
    {label && <SelectLabel>{label}</SelectLabel>}
    {children}
  </div>
);

Select.displayName = "Select";
SelectTrigger.displayName = "SelectTrigger";
SelectValue.displayName = "SelectValue";
SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";
SelectGroup.displayName = "SelectGroup";
SelectLabel.displayName = "SelectLabel";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
};
