import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("no permite sobrescribir aria-invalid cuando hay error", () => {
    render(<Input label="Email" error="Formato inválido" aria-invalid="false" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("no permite sobrescribir aria-busy cuando loading=true", () => {
    render(<Input label="Nombre" loading aria-busy="false" />);
    expect(screen.getByLabelText("Nombre")).toHaveAttribute("aria-busy", "true");
  });

  it("mantiene la ejecución de onFocus y onBlur del consumidor", () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<Input label="Nombre" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByLabelText("Nombre");

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("aplica containerClassName al wrapper raíz sin afectar al className del input", () => {
    render(
      <Input
        label="Ingrediente"
        containerClassName="flex-1 custom-container"
        className="custom-input"
      />
    );
    const input = screen.getByLabelText("Ingrediente");
    const rootDiv = input.closest(".custom-container");

    expect(rootDiv).toBeInTheDocument();
    expect(rootDiv).toHaveClass("flex-1", "w-full", "space-y-1.5");
    expect(input).toHaveClass("custom-input");
    expect(input).not.toHaveClass("custom-container");
  });
});
