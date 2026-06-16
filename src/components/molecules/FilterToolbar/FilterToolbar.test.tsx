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
    const button = screen.getByLabelText("Abrir filtros");
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
});
