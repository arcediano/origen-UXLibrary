/**
 * @file FilterPanel.test.tsx
 * @description Tests unitarios de FilterPanel — cubre draft state, apply,
 * clear y la lógica de secciones compartidas.
 */

import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { FilterPanel, type FilterSection } from "./FilterPanel";

// Stub createPortal para que renderice inline en tests
vi.mock("react-dom", async () => {
  const real = await vi.importActual<typeof import("react-dom")>("react-dom");
  return { ...real, createPortal: (node: React.ReactNode) => node };
});

// FilterPanel usa useIsMobile (window.matchMedia) para elegir entre el
// popover desktop y el bottom sheet móvil — sin este stub, jsdom no
// implementa matchMedia y el hook lanza. matches: false => rama desktop,
// que es la que cubren estos tests (mismo patrón que Dialog.test.tsx).
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
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
    const onChange = vi.fn();
    render(
      <FilterPanel
        isOpen={false}
        onClose={vi.fn()}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={vi.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("muestra las secciones de chips en el popover desktop cuando isOpen=true", async () => {
    const onChange = vi.fn();
    render(
      <FilterPanel
        isOpen={true}
        onClose={vi.fn()}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={vi.fn()}
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
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(
      <FilterPanel
        isOpen={true}
        onClose={onClose}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={vi.fn()}
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
    const onClearAll = vi.fn();
    const onClose = vi.fn();
    // Sección con valor activo para que el botón no esté disabled
    render(
      <FilterPanel
        isOpen={true}
        onClose={onClose}
        triggerRef={triggerRef}
        sections={makeChipsSections("active", vi.fn())}
        onClearAll={onClearAll}
      />,
    );

    const clearBtns = screen.getAllByText("Limpiar filtros");
    fireEvent.click(clearBtns[0]);

    expect(onClearAll).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("el botón X del header cierra el panel sin aplicar cambios", async () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(
      <FilterPanel
        isOpen={true}
        onClose={onClose}
        triggerRef={triggerRef}
        sections={makeChipsSections("", onChange)}
        onClearAll={vi.fn()}
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
        onClose={vi.fn()}
        triggerRef={triggerRef}
        sections={makeChipsSections("", vi.fn())}
        onClearAll={vi.fn()}
      />,
    );
    expect(screen.queryByText(/Ver \d+/)).toBeNull();
    expect(screen.getAllByText("Aplicar filtros").length).toBeGreaterThan(0);
  });

  it("sección 'text': escribe en el draft y aplica el valor solo al pulsar Aplicar", async () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    const sections: FilterSection[] = [
      {
        type: "text",
        id: "sellerId",
        title: "ID vendedor",
        value: "",
        onChange,
        placeholder: "ID vendedor",
      },
    ];
    render(
      <FilterPanel
        isOpen={true}
        onClose={onClose}
        triggerRef={triggerRef}
        sections={sections}
        onClearAll={vi.fn()}
        resultCount={2}
        resultLabel="pedidos"
      />,
    );

    const input = screen.getAllByPlaceholderText("ID vendedor")[0];
    fireEvent.change(input, { target: { value: "seller-42" } });
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("Ver 2 pedidos"));
    expect(onChange).toHaveBeenCalledWith("seller-42");
    expect(onClose).toHaveBeenCalled();
  });

  it("sección 'text' con numeric=true descarta caracteres no numéricos", async () => {
    const onChange = vi.fn();
    const sections: FilterSection[] = [
      {
        type: "text",
        id: "userId",
        title: "ID comprador",
        value: "",
        onChange,
        placeholder: "ID comprador",
        numeric: true,
      },
    ];
    render(
      <FilterPanel
        isOpen={true}
        onClose={vi.fn()}
        triggerRef={triggerRef}
        sections={sections}
        onClearAll={vi.fn()}
      />,
    );

    const input = screen.getAllByPlaceholderText("ID comprador")[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12ab34" } });
    expect(input.value).toBe("1234");
  });
});
