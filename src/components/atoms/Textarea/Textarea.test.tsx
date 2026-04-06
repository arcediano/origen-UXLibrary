import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("no permite sobrescribir aria-invalid cuando hay error", () => {
    render(<Textarea label="Descripción" error="Campo requerido" aria-invalid="false" />);
    expect(screen.getByLabelText("Descripción")).toHaveAttribute("aria-invalid", "true");
  });

  it("no permite sobrescribir aria-busy cuando loading=true", () => {
    render(<Textarea label="Descripción" loading aria-busy="false" />);
    expect(screen.getByLabelText("Descripción")).toHaveAttribute("aria-busy", "true");
  });

  it("mantiene la ejecución de onFocus y onBlur del consumidor", () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<Textarea label="Descripción" onFocus={onFocus} onBlur={onBlur} />);
    const textarea = screen.getByLabelText("Descripción");

    fireEvent.focus(textarea);
    fireEvent.blur(textarea);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
