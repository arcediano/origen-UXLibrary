/**
 * @file FilterSidebarPanel.test.tsx
 * @description Tests unitarios de FilterSidebarPanel — sidebar siempre
 * visible (como FilterSidebar) con draft state + botón "Aplicar" (como
 * FilterPanel), incluida la resincronización con cambios externos al draft.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterSidebarPanel, type FilterSection } from "./FilterSidebarPanel";

function makeChipsSections(value: string, onChange: (v: string) => void): FilterSection[] {
  return [
    {
      type: "chips",
      id: "category",
      title: "Categoría",
      options: [
        { label: "Todas", value: "" },
        { label: "Frutas", value: "frutas" },
        { label: "Lácteos", value: "lacteos" },
      ],
      value,
      onChange,
    },
  ];
}

describe("FilterSidebarPanel", () => {
  it("renderiza el título y el contador de resultados", () => {
    render(
      <FilterSidebarPanel
        sections={makeChipsSections("", vi.fn())}
        onClearAll={vi.fn()}
        resultCount={7}
        resultLabel="pedidos"
      />,
    );
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("7 pedidos")).toBeInTheDocument();
  });

  it("renderiza cada sección siempre visible, sin acordeón", () => {
    render(<FilterSidebarPanel sections={makeChipsSections("", vi.fn())} onClearAll={vi.fn()} />);
    expect(screen.getByText("Categoría")).toBeInTheDocument();
    expect(screen.getByText("Frutas")).toBeInTheDocument();
    expect(screen.getByText("Lácteos")).toBeInTheDocument();
  });

  it("NO aplica el cambio de inmediato — hace falta pulsar Aplicar filtros", () => {
    const onChange = vi.fn();
    render(<FilterSidebarPanel sections={makeChipsSections("", onChange)} onClearAll={vi.fn()} />);

    fireEvent.click(screen.getByText("Frutas"));
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("Aplicar filtros"));
    expect(onChange).toHaveBeenCalledWith("frutas");
  });

  it('el botón "Limpiar filtros" está deshabilitado sin filtros activos', () => {
    render(<FilterSidebarPanel sections={makeChipsSections("", vi.fn())} onClearAll={vi.fn()} />);
    expect(screen.getByText("Limpiar filtros")).toBeDisabled();
  });

  it('el botón "Limpiar filtros" se habilita con un filtro activo (aplicado) y llama a onClearAll', () => {
    const onClearAll = vi.fn();
    render(<FilterSidebarPanel sections={makeChipsSections("frutas", vi.fn())} onClearAll={onClearAll} />);

    const clearButton = screen.getByText("Limpiar filtros");
    expect(clearButton).not.toBeDisabled();

    fireEvent.click(clearButton);
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('el botón "Limpiar filtros" se habilita también con un cambio pendiente en el draft, sin aplicar todavía', () => {
    render(<FilterSidebarPanel sections={makeChipsSections("", vi.fn())} onClearAll={vi.fn()} />);

    fireEvent.click(screen.getByText("Frutas"));
    expect(screen.getByText("Limpiar filtros")).not.toBeDisabled();
  });

  it("resincroniza el draft cuando el valor aplicado cambia por una vía externa (ej. se quita un chip fuera del panel)", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <FilterSidebarPanel sections={makeChipsSections("frutas", onChange)} onClearAll={vi.fn()} />,
    );

    // Simula que algo externo al panel (p. ej. ActiveFilterChips) resetea el filtro aplicado.
    rerender(<FilterSidebarPanel sections={makeChipsSections("", onChange)} onClearAll={vi.fn()} />);

    // El botón Limpiar debe reflejar el nuevo estado aplicado (sin filtros activos).
    expect(screen.getByText("Limpiar filtros")).toBeDisabled();
  });

  it("Limpiar filtros vacía también el draft local, no solo el estado aplicado", () => {
    const onChange = vi.fn();
    const onClearAll = vi.fn();
    render(<FilterSidebarPanel sections={makeChipsSections("frutas", onChange)} onClearAll={onClearAll} />);

    fireEvent.click(screen.getByText("Limpiar filtros"));
    expect(onClearAll).toHaveBeenCalledTimes(1);

    // Tras limpiar, el botón vuelve a estar deshabilitado sin esperar a que
    // el consumidor re-renderice con sections actualizadas.
    expect(screen.getByText("Limpiar filtros")).toBeDisabled();
  });

  it("renderiza correctamente con secciones numberrange y toggles, ambas siempre visibles", () => {
    const sections: FilterSection[] = [
      {
        type: "numberrange",
        id: "amount",
        title: "Importe",
        valueMin: "",
        valueMax: "",
        onChangeMin: vi.fn(),
        onChangeMax: vi.fn(),
        prefix: "€",
      },
      {
        type: "toggles",
        id: "status",
        title: "Estado",
        options: [{ id: "pending", label: "Pendientes", value: false, onChange: vi.fn() }],
      },
    ];
    render(<FilterSidebarPanel sections={sections} onClearAll={vi.fn()} />);
    expect(screen.getByText("Importe")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("Pendientes")).toBeInTheDocument();
  });
});
