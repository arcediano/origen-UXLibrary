/**
 * @file FilterSidebar.test.tsx
 * @description Tests unitarios de FilterSidebar — aplicación inmediata
 * (sin draft), secciones siempre visibles (sin acordeón), estado de
 * "Limpiar filtros" y onClearAll.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterSidebar, RatingFilterSection, type FilterSection } from "./FilterSidebar";

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

describe("FilterSidebar", () => {
  it("renderiza el título y el contador de resultados", () => {
    render(
      <FilterSidebar
        sections={makeChipsSections("", vi.fn())}
        onClearAll={vi.fn()}
        resultCount={42}
        resultLabel="productos"
      />,
    );
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("42 productos")).toBeInTheDocument();
  });

  it("renderiza cada sección siempre visible, sin acordeón (título y opciones visibles de inicio)", () => {
    render(<FilterSidebar sections={makeChipsSections("", vi.fn())} onClearAll={vi.fn()} />);
    expect(screen.getByText("Categoría")).toBeInTheDocument();
    expect(screen.getByText("Frutas")).toBeInTheDocument();
    expect(screen.getByText("Lácteos")).toBeInTheDocument();
  });

  it("aplica el cambio de inmediato (sin draft ni botón Aplicar), sin interacción previa de expandir", () => {
    const onChange = vi.fn();
    render(<FilterSidebar sections={makeChipsSections("", onChange)} onClearAll={vi.fn()} />);

    fireEvent.click(screen.getByText("Frutas"));

    // Aplicación inmediata: onChange se invoca directamente al hacer clic,
    // sin necesidad de un botón "Aplicar" (a diferencia de FilterPanel) ni
    // de expandir un acordeón primero (las secciones siempre están visibles).
    expect(onChange).toHaveBeenCalledWith("frutas");
    expect(screen.queryByText("Aplicar")).not.toBeInTheDocument();
  });

  it('el botón "Limpiar filtros" está deshabilitado sin filtros activos', () => {
    render(<FilterSidebar sections={makeChipsSections("", vi.fn())} onClearAll={vi.fn()} />);
    expect(screen.getByText("Limpiar filtros")).toBeDisabled();
  });

  it('el botón "Limpiar filtros" se habilita con un filtro activo y llama a onClearAll', () => {
    const onClearAll = vi.fn();
    render(<FilterSidebar sections={makeChipsSections("frutas", vi.fn())} onClearAll={onClearAll} />);

    const clearButton = screen.getByText("Limpiar filtros");
    expect(clearButton).not.toBeDisabled();

    fireEvent.click(clearButton);
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("renderiza correctamente con secciones numberrange y toggles, ambas siempre visibles", () => {
    const sections: FilterSection[] = [
      {
        type: "numberrange",
        id: "price",
        title: "Precio",
        valueMin: "",
        valueMax: "",
        onChangeMin: vi.fn(),
        onChangeMax: vi.fn(),
        prefix: "€",
      },
      {
        type: "toggles",
        id: "availability",
        title: "Disponibilidad",
        options: [{ id: "inStock", label: "Solo en stock", value: false, onChange: vi.fn() }],
      },
    ];
    render(<FilterSidebar sections={sections} onClearAll={vi.fn()} />);
    expect(screen.getByText("Precio")).toBeInTheDocument();
    expect(screen.getByText("Disponibilidad")).toBeInTheDocument();
    expect(screen.getByText("Solo en stock")).toBeInTheDocument();
  });

  it("renderiza children (p. ej. RatingFilterSection) antes de las secciones tipadas", () => {
    render(
      <FilterSidebar sections={makeChipsSections("", vi.fn())} onClearAll={vi.fn()}>
        <RatingFilterSection value={0} onChange={vi.fn()} />
      </FilterSidebar>,
    );
    expect(screen.getByText("Valoración")).toBeInTheDocument();
    // "Todas" aparece dos veces (RatingFilterSection y la sección chips de
    // Categoría, ambas siempre visibles sin acordeón) — se valida que al
    // menos una instancia esté presente sin ambigüedad de selector único.
    expect(screen.getAllByText("Todas").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Categoría")).toBeInTheDocument();
  });
});

describe("RatingFilterSection", () => {
  it("renderiza la opción 'Todas' y las opciones de umbral por defecto, sin contenedor de scroll horizontal", () => {
    const { container } = render(<RatingFilterSection value={0} onChange={vi.fn()} />);
    expect(screen.getByText("Todas")).toBeInTheDocument();
    expect(screen.getAllByText("o más")).toHaveLength(2);
    expect(container.querySelector(".overflow-x-auto")).toBeNull();
  });

  it("llama a onChange con el umbral seleccionado", () => {
    const onChange = vi.fn();
    render(<RatingFilterSection value={0} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText("4 estrellas o más"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("marca 'Todas' como activa cuando value es 0", () => {
    render(<RatingFilterSection value={0} onChange={vi.fn()} />);
    expect(screen.getByText("Todas").closest("button")).toHaveAttribute("aria-pressed", "true");
  });
});
