import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterToolbar } from "./FilterToolbar";

describe("FilterToolbar", () => {
  it("renders the search input with the given placeholder", () => {
    render(<FilterToolbar searchValue="" onSearchChange={vi.fn()} searchPlaceholder="Buscar productos..." />);
    expect(screen.getByPlaceholderText("Buscar productos...")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing", () => {
    const onSearchChange = vi.fn();
    render(<FilterToolbar searchValue="" onSearchChange={onSearchChange} searchPlaceholder="Buscar..." />);
    fireEvent.change(screen.getByPlaceholderText("Buscar..."), { target: { value: "queso" } });
    expect(onSearchChange).toHaveBeenCalledWith("queso");
  });

  it("does not render the filters button when onOpenFilters is not provided", () => {
    render(<FilterToolbar searchValue="" onSearchChange={vi.fn()} />);
    expect(screen.queryByLabelText("Abrir filtros")).not.toBeInTheDocument();
  });

  it("renders the filters button and badge when activeFilterCount > 0", () => {
    const onOpenFilters = vi.fn();
    render(
      <FilterToolbar
        searchValue=""
        onSearchChange={vi.fn()}
        onOpenFilters={onOpenFilters}
        activeFilterCount={3}
      />,
    );
    const button = screen.getByLabelText("Filtros (3 activos)");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    fireEvent.click(button);
    expect(onOpenFilters).toHaveBeenCalledTimes(1);
  });

  it("renders the actions slot", () => {
    render(
      <FilterToolbar
        searchValue=""
        onSearchChange={vi.fn()}
        actions={<button aria-label="Vista cuadrícula">grid</button>}
      />,
    );
    expect(screen.getByLabelText("Vista cuadrícula")).toBeInTheDocument();
  });

  describe("compact", () => {
    it("keeps the search input at flex-1 instead of wrapping to its own row", () => {
      render(<FilterToolbar searchValue="" onSearchChange={vi.fn()} compact />);
      const wrapper = screen.getByRole("searchbox").closest("div");
      expect(wrapper?.className).toContain("flex-1");
      expect(wrapper?.className).not.toContain("basis-full");
    });

    it("hides the filters button label behind sm: instead of always showing it", () => {
      const onOpenFilters = vi.fn();
      render(
        <FilterToolbar
          searchValue=""
          onSearchChange={vi.fn()}
          onOpenFilters={onOpenFilters}
          filtersLabel="Filtros"
          compact
        />,
      );
      const label = screen.getByText("Filtros");
      expect(label.className).toContain("hidden");
      expect(label.className).toContain("sm:inline");
    });

    it("does not hide the filters button label when compact is off", () => {
      render(
        <FilterToolbar
          searchValue=""
          onSearchChange={vi.fn()}
          onOpenFilters={vi.fn()}
          filtersLabel="Filtros"
        />,
      );
      expect(screen.getByText("Filtros").className).not.toContain("hidden");
    });
  });
});
