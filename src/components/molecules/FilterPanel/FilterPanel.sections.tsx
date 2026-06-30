/**
 * @file FilterPanel.sections.tsx
 * @description Secciones internas del panel de filtros: chips, daterange,
 * numberrange, toggles. Compartidas entre `FilterPanel` (popover desktop +
 * bottom sheet móvil) y `FilterSheet` (legado, solo bottom sheet).
 *
 * No exportado desde `src/index.ts` — es un módulo privado de la carpeta
 * molecules. Importar únicamente desde `FilterPanel.tsx` y `FilterSheet.tsx`.
 */

import * as React from "react";
import { DateRangeInput } from "../../atoms/DateInput";
import { cn } from "../../../lib/utils";

// ─── Tipos públicos ───────────────────────────────────────────────────────────

export interface ChipOption {
  label: string;
  value: string;
  icon?: React.ElementType;
  count?: number;
}

export interface ToggleOption {
  id: string;
  label: string;
  icon?: React.ElementType;
  value: boolean;
  onChange: (value: boolean) => void;
}

export type FilterSection =
  | {
      type: "chips";
      id: string;
      title: string;
      options: ChipOption[];
      value: string;
      onChange: (value: string) => void;
    }
  | {
      type: "daterange";
      id: string;
      title: string;
      valueFrom: string;
      valueTo: string;
      onChangeFrom: (value: string) => void;
      onChangeTo: (value: string) => void;
    }
  | {
      type: "numberrange";
      id: string;
      title: string;
      valueMin: string;
      valueMax: string;
      onChangeMin: (value: string) => void;
      onChangeMax: (value: string) => void;
      prefix?: string;
    }
  | {
      type: "toggles";
      id: string;
      title: string;
      options: ToggleOption[];
    };

// ─── Draft state ──────────────────────────────────────────────────────────────

export type DraftValue =
  | { type: "chips"; value: string }
  | { type: "daterange"; from: string; to: string }
  | { type: "numberrange"; min: string; max: string }
  | { type: "toggles"; values: Record<string, boolean> };

export type Draft = Record<string, DraftValue>;

export function buildDraft(sections: FilterSection[]): Draft {
  const d: Draft = {};
  sections.forEach((s) => {
    if (s.type === "chips") d[s.id] = { type: "chips", value: s.value };
    if (s.type === "daterange") d[s.id] = { type: "daterange", from: s.valueFrom, to: s.valueTo };
    if (s.type === "numberrange") d[s.id] = { type: "numberrange", min: s.valueMin, max: s.valueMax };
    if (s.type === "toggles")
      d[s.id] = { type: "toggles", values: Object.fromEntries(s.options.map((o) => [o.id, o.value])) };
  });
  return d;
}

export function clearDraft(sections: FilterSection[]): Draft {
  const d: Draft = {};
  sections.forEach((s) => {
    if (s.type === "chips") d[s.id] = { type: "chips", value: "" };
    if (s.type === "daterange") d[s.id] = { type: "daterange", from: "", to: "" };
    if (s.type === "numberrange") d[s.id] = { type: "numberrange", min: "", max: "" };
    if (s.type === "toggles")
      d[s.id] = { type: "toggles", values: Object.fromEntries(s.options.map((o) => [o.id, false])) };
  });
  return d;
}

export function applyDraft(sections: FilterSection[], draft: Draft): void {
  sections.forEach((s) => {
    const d = draft[s.id];
    if (!d) return;
    if (s.type === "chips" && d.type === "chips") s.onChange(d.value);
    if (s.type === "daterange" && d.type === "daterange") {
      s.onChangeFrom(d.from);
      s.onChangeTo(d.to);
    }
    if (s.type === "numberrange" && d.type === "numberrange") {
      s.onChangeMin(d.min);
      s.onChangeMax(d.max);
    }
    if (s.type === "toggles" && d.type === "toggles") {
      s.options.forEach((opt) => opt.onChange(d.values[opt.id] ?? false));
    }
  });
}

export function isDraftActive(draft: Draft): boolean {
  return Object.values(draft).some((d) => {
    if (d.type === "chips") return Boolean(d.value);
    if (d.type === "daterange") return Boolean(d.from || d.to);
    if (d.type === "numberrange") return Boolean(d.min || d.max);
    if (d.type === "toggles") return Object.values(d.values).some(Boolean);
    return false;
  });
}

// ─── ChipsSection ─────────────────────────────────────────────────────────────

export function ChipsSection({
  section,
  value,
  onChange,
}: {
  section: FilterSection & { type: "chips" };
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-text-subtle uppercase tracking-wide mb-3">{section.title}</p>
      <div className="flex flex-wrap gap-2">
        {section.options.map((opt) => {
          const active = value === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border min-h-[44px] transition-colors",
                active
                  ? "bg-origen-bosque border-origen-bosque text-white"
                  : "bg-surface border-border-subtle text-origen-bosque",
              )}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              {opt.label}
              {opt.count !== undefined && opt.count > 0 && (
                <span className={cn("text-xs font-bold", active ? "text-white/70" : "text-text-subtle")}>
                  {opt.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── DateRangeSection ─────────────────────────────────────────────────────────

export function DateRangeSection({
  section,
  from,
  to,
  onFrom,
  onTo,
}: {
  section: FilterSection & { type: "daterange" };
  from: string;
  to: string;
  onFrom: (v: string) => void;
  onTo: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-text-subtle uppercase tracking-wide mb-3">{section.title}</p>
      <DateRangeInput
        labelFrom="Desde"
        labelTo="Hasta"
        valueFrom={from}
        valueTo={to}
        onChangeFrom={onFrom}
        onChangeTo={onTo}
        inputSize="md"
      />
    </div>
  );
}

// ─── NumberRangeSection ───────────────────────────────────────────────────────

export function NumberRangeSection({
  section,
  min,
  max,
  onMin,
  onMax,
}: {
  section: FilterSection & { type: "numberrange" };
  min: string;
  max: string;
  onMin: (v: string) => void;
  onMax: (v: string) => void;
}) {
  const inputCls = cn(
    "w-full h-12 text-sm font-medium text-origen-bosque border border-border-subtle bg-surface rounded-xl",
    "focus:outline-none focus:ring-2 focus:ring-origen-pradera/25 focus:border-origen-pradera transition-colors",
    section.prefix ? "pl-7 pr-3" : "px-3",
  );
  return (
    <div>
      <p className="text-[11px] font-semibold text-text-subtle uppercase tracking-wide mb-3">{section.title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-medium text-text-subtle mb-1.5 block uppercase tracking-wide">
            Mínimo
          </label>
          <div className="relative">
            {section.prefix && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-text-subtle pointer-events-none">
                {section.prefix}
              </span>
            )}
            <input
              type="number"
              value={min}
              onChange={(e) => onMin(e.target.value)}
              placeholder="0"
              className={inputCls}
              min="0"
              inputMode="decimal"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium text-text-subtle mb-1.5 block uppercase tracking-wide">
            Máximo
          </label>
          <div className="relative">
            {section.prefix && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-subtle pointer-events-none">
                {section.prefix}
              </span>
            )}
            <input
              type="number"
              value={max}
              onChange={(e) => onMax(e.target.value)}
              placeholder="∞"
              className={inputCls}
              min="0"
              inputMode="decimal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TogglesSection ───────────────────────────────────────────────────────────

export function TogglesSection({
  section,
  values,
  onToggle,
}: {
  section: FilterSection & { type: "toggles" };
  values: Record<string, boolean>;
  onToggle: (optionId: string, value: boolean) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-text-subtle uppercase tracking-wide mb-3">{section.title}</p>
      <div className="flex flex-col gap-1">
        {section.options.map((opt) => {
          const active = values[opt.id] ?? false;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id, !active)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
                active ? "bg-origen-bosque/10 text-origen-bosque" : "bg-surface text-origen-bosque/70",
              )}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              <span className="flex-1 text-left">{opt.label}</span>
              <div
                className={cn(
                  "w-10 h-6 rounded-full p-0.5 transition-colors",
                  active ? "bg-origen-bosque" : "bg-border",
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                    active ? "translate-x-4" : "translate-x-0",
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── SectionList — renderiza todas las secciones de un draft ─────────────────

export function SectionList({
  sections,
  draft,
  onSetChips,
  onSetDateFrom,
  onSetDateTo,
  onSetNumMin,
  onSetNumMax,
  onSetToggle,
}: {
  sections: FilterSection[];
  draft: Draft;
  onSetChips: (id: string, v: string) => void;
  onSetDateFrom: (id: string, v: string) => void;
  onSetDateTo: (id: string, v: string) => void;
  onSetNumMin: (id: string, v: string) => void;
  onSetNumMax: (id: string, v: string) => void;
  onSetToggle: (sectionId: string, optId: string, v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => {
        const d = draft[section.id];

        if (section.type === "chips") {
          return (
            <ChipsSection
              key={section.id}
              section={section}
              value={(d?.type === "chips" ? d.value : "") ?? ""}
              onChange={(v) => onSetChips(section.id, v)}
            />
          );
        }
        if (section.type === "daterange") {
          const dd = d?.type === "daterange" ? d : { from: "", to: "" };
          return (
            <DateRangeSection
              key={section.id}
              section={section}
              from={dd.from}
              to={dd.to}
              onFrom={(v) => onSetDateFrom(section.id, v)}
              onTo={(v) => onSetDateTo(section.id, v)}
            />
          );
        }
        if (section.type === "numberrange") {
          const dn = d?.type === "numberrange" ? d : { min: "", max: "" };
          return (
            <NumberRangeSection
              key={section.id}
              section={section}
              min={dn.min}
              max={dn.max}
              onMin={(v) => onSetNumMin(section.id, v)}
              onMax={(v) => onSetNumMax(section.id, v)}
            />
          );
        }
        if (section.type === "toggles") {
          const dt = d?.type === "toggles" ? d.values : {};
          return (
            <TogglesSection
              key={section.id}
              section={section}
              values={dt}
              onToggle={(optId, v) => onSetToggle(section.id, optId, v)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
