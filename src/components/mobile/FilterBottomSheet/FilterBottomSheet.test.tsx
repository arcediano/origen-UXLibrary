import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { FilterBottomSheet } from "./FilterBottomSheet";

describe("FilterBottomSheet", () => {
  it("renders nothing when closed", () => {
    render(<FilterBottomSheet open={false} onClose={vi.fn()} title="Filtros" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders dialog and title when open", () => {
    render(<FilterBottomSheet open={true} onClose={vi.fn()} title="Filtros" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Filtros")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <FilterBottomSheet
        open={true}
        onClose={vi.fn()}
        title="Filtros"
        description="Selecciona opciones"
      />
    );
    expect(screen.getByText("Selecciona opciones")).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<FilterBottomSheet open={true} onClose={onClose} title="Filtros" />);
    const backdrop = screen.getByRole("dialog").previousElementSibling as HTMLElement;
    fireEvent.pointerDown(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<FilterBottomSheet open={true} onClose={onClose} title="Filtros" />);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders footer when provided", () => {
    render(
      <FilterBottomSheet
        open={true}
        onClose={vi.fn()}
        footer={<button>Aplicar</button>}
      />
    );
    expect(screen.getByText("Aplicar")).toBeInTheDocument();
  });
});
