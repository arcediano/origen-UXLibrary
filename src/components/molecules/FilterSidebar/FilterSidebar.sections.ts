/**
 * @file FilterSidebar.sections.ts
 * @description Utilidades específicas de `FilterSidebar` sobre el motor de
 * secciones compartido de `FilterPanel.sections`. No exportado desde
 * `src/index.ts` — módulo privado de la carpeta molecules.
 */

import type { FilterSection } from "../FilterPanel/FilterPanel.sections";

export type { FilterSection } from "../FilterPanel/FilterPanel.sections";

/**
 * Determina si una sección tiene algún valor activo, leyendo directamente el
 * estado controlado de la sección (no un draft) — apto para el modelo de
 * aplicación inmediata de `FilterSidebar`.
 */
export function isSectionActive(section: FilterSection): boolean {
  if (section.type === "chips") return Boolean(section.value);
  if (section.type === "daterange") return Boolean(section.valueFrom || section.valueTo);
  if (section.type === "numberrange") return Boolean(section.valueMin || section.valueMax);
  if (section.type === "toggles") return section.options.some((opt) => opt.value);
  return false;
}
