/**
 * @file FilterPanel.test.tsx
 * @description Tests unitarios de FilterPanel — cubre draft state, apply,
 * clear y la lógica de secciones compartidas.
 */

import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FilterPanel, type FilterSection } from "./FilterPanel";

// Stub createPortal para que renderice inline en tests
jest.mock("react-dom", () => {
  const real = jest.requireActual("react-dom");
  return { ...real, createPortal: (node: React.ReactNode) => node };
});

// Helper: sections de chips mínimas
function makeChipsSections(value: string, onChange: (v: string) => void): FilterSection[] {
  return [
    {
      type: "chips",
      id: "status",
      title: "Estado",
      options: [
        { label: "Todos", value: "" },
        { label: "Activos", value: "active" },
        { label: "Borradores", value: "draft" },
      ],
      value,
      onChange,
    },
  ];
}

describe("FilterPanel", () => {
  const triggerRef = React.createRef<HTMLButtonElement>();

  it("no renderiza el popover desktop cuando isOpen=false", () => {
    const onChange = jest.fn();
    render(
      <FilterPanel
        isOpen={false}
        onClose={jest.fn()}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={jest.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("muestra las secciones de chips en el popover desktop cuando isOpen=true", async () => {
    const onChange = jest.fn();
    render(
      <FilterPanel
        isOpen={true}
        onClose={jest.fn()}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={jest.fn()}
        resultCount={5}
        resultLabel="productos"
      />,
    );
    // El popover desktop está en el DOM (puede estar hidden lg:flex — no visible
    // en jsdom, pero sí en el árbol de accesibilidad)
    await waitFor(() => {
      expect(screen.getByText("Estado")).toBeInTheDocument();
    });
    expect(screen.getByText("Activos")).toBeInTheDocument();
    expect(screen.getByText("Borradores")).toBeInTheDocument();
  });

  it("el botón Aplicar llama a onChange de cada sección con el valor del draft", async () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    render(
      <FilterPanel
        isOpen={true}
        onClose={onClose}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={jest.fn()}
        resultCount={3}
        resultLabel="productos"
      />,
    );

    // Seleccionar chip "Activos" en el draft
    const activosBtn = screen.getAllByText("Activos")[0];
    fireEvent.click(activosBtn);

    // Pulsar "Ver 3 productos" (Apply)
    const applyBtn = screen.getByText("Ver 3 productos");
    fireEvent.click(applyBtn);

    expect(onChange).toHaveBeenCalledWith("active");
    expect(onClose).toHaveBeenCalled();
  });

  it("el botón Limpiar filtros llama a onClearAll y onClose", async () => {
    const onClearAll = jest.fn();
    const onClose = jest.fn();
    // Sección con valor activo para que el botón no esté disabled
    render(
      <FilterPanel
        isOpen={true}
        onClose={onClose}
        triggerRef={triggerRef}
        sections={makeChipsSections("active", jest.fn())}
        onClearAll={onClearAll}
      />,
    );

    const clearBtns = screen.getAllByText("Limpiar filtros");
    fireEvent.click(clearBtns[0]);

    expect(onClearAll).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("el botón X del header cierra el panel sin aplicar cambios", async () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    render(
      <FilterPanel
        isOpen={true}
        onClose={onClose}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={jest.fn()}
      />,
    );

    // Cerrar con el botón X del header (solo desktop popover)
    const closeBtn = screen.getByLabelText("Cerrar panel de filtros");
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
    // No se llamó a onChange
    expect(onChange).not.toHaveBeenCalled();
  });

  it("no renderiza el botón de 'Ver N resultados' si resultCount no se pasa", async () => {
    render(
      <FilterPanel
        isOpen={true}
        onClose={jest.fn()}
        triggerRef={triggerRef}
        sections={makeChipsSections("", jest.fn())}
        onClearAll={jest.fn()}
      />,
    );
    expect(screen.queryByText(/Ver \d+/)).toBeNull();
    expect(screen.getAllByText("Aplicar filtros").length).toBeGreaterThan(0);
  });
});
