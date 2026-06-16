import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterSheet, type FilterSection } from "./FilterSheet";

function chipsSection(overrides: Partial<FilterSection & { type: "chips" }> = {}): FilterSection {
  return {
    type: "chips",
    id: "status",
    title: "Estado",
    options: [
      { label: "Todos", value: "" },
      { label: "Activos", value: "active" },
      { label: "Inactivos", value: "inactive" },
    ],
    value: "",
    onChange: vi.fn(),
    ...overrides,
  } as FilterSection;
}

describe("FilterSheet", () => {
  it("does not render content when closed", () => {
    render(
      <FilterSheet isOpen={false} onClose={vi.fn()} sections={[chipsSection()]} onClearAll={vi.fn()} />,
    );
    expect(screen.queryByText("Estado")).not.toBeInTheDocument();
  });

  it("renders chip section options when open", () => {
    render(
      <FilterSheet isOpen={true} onClose={vi.fn()} sections={[chipsSection()]} onClearAll={vi.fn()} />,
    );
    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("Activos")).toBeInTheDocument();
  });

  it("applies the draft value on 'Aplicar filtros'/'Ver N resultados'", () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(
      <FilterSheet
        isOpen={true}
        onClose={onClose}
        sections={[chipsSection({ onChange })]}
        onClearAll={vi.fn()}
        resultCount={10}
        resultLabel="productos"
      />,
    );

    fireEvent.click(screen.getByText("Activos"));
    fireEvent.click(screen.getByText("Ver 10 productos"));

    expect(onChange).toHaveBeenCalledWith("active");
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClearAll and onClose when clearing", () => {
    const onClearAll = vi.fn();
    const onClose = vi.fn();
    render(
      <FilterSheet
        isOpen={true}
        onClose={onClose}
        sections={[chipsSection({ value: "active" })]}
        onClearAll={onClearAll}
      />,
    );

    fireEvent.click(screen.getByText("Limpiar filtros"));
    expect(onClearAll).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("dispatches filter-sheet:toggle events on open/close", () => {
    const handler = vi.fn();
    window.addEventListener("filter-sheet:toggle", handler);

    const { rerender } = render(
      <FilterSheet isOpen={false} onClose={vi.fn()} sections={[chipsSection()]} onClearAll={vi.fn()} />,
    );
    rerender(<FilterSheet isOpen={true} onClose={vi.fn()} sections={[chipsSection()]} onClearAll={vi.fn()} />);

    expect(handler).toHaveBeenCalled();
    window.removeEventListener("filter-sheet:toggle", handler);
  });
});
