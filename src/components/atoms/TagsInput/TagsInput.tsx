"use client";

import * as React from "react";
import { Info, Plus, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  tooltip?: string;
  className?: string;
  maxTags?: number;
  suggestions?: string[];
  required?: boolean;
}

export function TagsInput({
  value = [],
  onChange,
  placeholder = "Anadir etiqueta...",
  label,
  helperText,
  error,
  tooltip,
  className,
  maxTags = 10,
  suggestions = [],
  required,
}: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputId = React.useId();
  const errorId = `${inputId}-error`;

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(suggestion)
  );

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag) && value.length < maxTags) {
      onChange([...value, trimmedTag]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "," || event.key === " ") {
      event.preventDefault();
      if (inputValue.trim()) {
        handleAddTag(inputValue);
      }
    } else if (event.key === "Backspace" && !inputValue && value.length > 0) {
      handleRemoveTag(value[value.length - 1]);
    }
  };

  return (
    <div className={cn("w-full space-y-1.5 sm:space-y-2", className)}>
      {(label || tooltip) && (
        <div className="flex items-center gap-2">
          {label && (
            <label
              htmlFor={inputId}
              className={cn("text-xs sm:text-sm font-medium text-origen-bosque", error && "text-red-600")}
            >
              {label}
              {required && (
                <span className="ml-1 text-red-500" aria-label="requerido">
                  *
                </span>
              )}
            </label>
          )}

          {tooltip && (
            <div className="group relative">
              <Info className="h-3.5 w-3.5 cursor-help text-text-disabled" aria-hidden="true" />
              <div
                className={cn(
                  "absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-origen-oscuro p-2 text-xs text-white",
                  "shadow-lg animate-in fade-in-0 zoom-in-95 group-hover:block"
                )}
                role="tooltip"
              >
                {tooltip}
                <div className="absolute -top-1 left-2 h-1.5 w-1.5 rotate-45 bg-origen-oscuro" />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex min-h-[44px] flex-wrap gap-1.5 rounded-xl border bg-white p-2 sm:gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg border border-origen-pradera/30",
              "bg-origen-crema px-2 py-1 text-xs text-origen-bosque",
              "transition-all duration-200 hover:border-origen-pradera hover:bg-origen-pastel"
            )}
          >
            <Tag className="h-3 w-3 text-origen-pradera" aria-hidden="true" />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-origen-pradera/20 transition-colors"
              aria-label={`Eliminar etiqueta ${tag}`}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}

        <input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={value.length >= maxTags ? "Limite alcanzado" : placeholder}
          disabled={value.length >= maxTags}
          className={cn(
            "min-h-[44px] min-w-[120px] flex-1 border-0 bg-transparent outline-none",
            "text-xs sm:text-sm placeholder:text-text-disabled",
            "focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />

        {value.length < maxTags && (
          <button
            type="button"
            onClick={() => inputValue.trim() && handleAddTag(inputValue)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-origen-pradera/40 text-origen-pradera hover:bg-origen-crema transition-colors"
            aria-label="Anadir etiqueta"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="relative">
          <div className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-xl border border-border bg-white shadow-lg">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleAddTag(suggestion)}
                className="min-h-[44px] w-full px-4 py-2 text-left text-xs hover:bg-origen-crema transition-colors sm:text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex-1">
          {error && (
            <p id={errorId} className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}
          {helperText && !error && <p className="text-xs text-text-subtle">{helperText}</p>}
        </div>

        <span
          className={cn(
            "text-xs tabular-nums",
            value.length >= maxTags ? "text-amber-600" : "text-text-subtle"
          )}
        >
          {value.length}/{maxTags}
        </span>
      </div>
    </div>
  );
}
