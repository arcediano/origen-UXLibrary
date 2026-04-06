import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("type es siempre button, el consumidor no puede sobrescribirlo", () => {
    // @ts-expect-error testing runtime guard
    render(<Toggle type="submit">Filtro</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("aria-pressed refleja el estado controlado, el consumidor no puede sobrescribirlo", () => {
    render(
      // @ts-expect-error testing runtime guard
      <Toggle checked aria-pressed={false}>
        Activo
      </Toggle>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("compone el onClick del consumidor con la lógica interna de toggle", () => {
    const onClick = vi.fn();
    render(<Toggle onClick={onClick}>Item</Toggle>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
