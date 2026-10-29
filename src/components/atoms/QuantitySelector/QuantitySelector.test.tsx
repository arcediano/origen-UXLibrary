import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuantitySelector } from "./QuantitySelector";

describe("QuantitySelector", () => {
  it("incrementa y decrementa dentro de los límites", () => {
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} min={1} max={3} />);

    fireEvent.click(screen.getByRole("button", { name: "Aumentar cantidad" }));
    fireEvent.click(screen.getByRole("button", { name: "Reducir cantidad" }));

    expect(onChange).toHaveBeenNthCalledWith(1, 3);
    expect(onChange).toHaveBeenNthCalledWith(2, 1);
  });

  it("deshabilita reducir en el mínimo y aumentar en el máximo", () => {
    const { rerender } = render(<QuantitySelector value={1} onChange={() => {}} min={1} max={1} />);

    expect(screen.getByRole("button", { name: "Reducir cantidad" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Aumentar cantidad" })).toBeDisabled();

    rerender(<QuantitySelector value={5} onChange={() => {}} min={1} max={9} />);
    expect(screen.getByRole("button", { name: "Reducir cantidad" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Aumentar cantidad" })).toBeEnabled();
  });

  it("itemLabel contextualiza el nombre accesible de ambos botones", () => {
    render(<QuantitySelector value={2} onChange={() => {}} itemLabel="Miel de romero" />);

    expect(screen.getByRole("button", { name: "Reducir cantidad de Miel de romero" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Aumentar cantidad de Miel de romero" })).toBeInTheDocument();
  });

  it("size: md (por defecto) usa objetivos de 44 px y sm de 36 px", () => {
    const { rerender } = render(<QuantitySelector value={2} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Aumentar cantidad" }).className).toContain("min-h-[44px]");

    rerender(<QuantitySelector value={2} onChange={() => {}} size="sm" />);
    expect(screen.getByRole("button", { name: "Aumentar cantidad" }).className).toContain("min-h-9");
  });

  it("anuncia el valor con aria-live", () => {
    render(<QuantitySelector value={4} onChange={() => {}} />);
    const live = screen.getByText("4");
    expect(live).toHaveAttribute("aria-live", "polite");
  });

  it("disabled bloquea ambos botones", () => {
    render(<QuantitySelector value={2} onChange={() => {}} disabled />);
    expect(screen.getByRole("button", { name: "Reducir cantidad" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Aumentar cantidad" })).toBeDisabled();
  });
});
