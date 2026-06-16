import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActiveFilterChips, type ActiveFilterChip } from "./ActiveFilterChips";

describe("ActiveFilterChips", () => {
  it("renders nothing when chips is empty", () => {
    const { container } = render(<ActiveFilterChips chips={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a chip with its label", () => {
    const chips: ActiveFilterChip[] = [{ id: "status", label: "Activos", onRemove: vi.fn() }];
    render(<ActiveFilterChips chips={chips} />);
    expect(screen.getByText("Activos")).toBeInTheDocument();
  });

  it("calls onRemove when the chip remove button is clicked", () => {
    const onRemove = vi.fn();
    const chips: ActiveFilterChip[] = [{ id: "status", label: "Activos", onRemove }];
    render(<ActiveFilterChips chips={chips} />);
    fireEvent.click(screen.getByLabelText("Quitar filtro: Activos"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not show 'Limpiar todo' with a single chip", () => {
    const chips: ActiveFilterChip[] = [{ id: "status", label: "Activos", onRemove: vi.fn() }];
    render(<ActiveFilterChips chips={chips} onClearAll={vi.fn()} />);
    expect(screen.queryByText("Limpiar todo")).not.toBeInTheDocument();
  });

  it("shows and triggers 'Limpiar todo' with multiple chips", () => {
    const onClearAll = vi.fn();
    const chips: ActiveFilterChip[] = [
      { id: "status", label: "Activos", onRemove: vi.fn() },
      { id: "category", label: "Quesos", onRemove: vi.fn() },
    ];
    render(<ActiveFilterChips chips={chips} onClearAll={onClearAll} />);
    const clearAll = screen.getByText("Limpiar todo");
    expect(clearAll).toBeInTheDocument();
    fireEvent.click(clearAll);
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});
