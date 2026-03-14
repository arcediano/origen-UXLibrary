import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renderiza el texto del hijo correctamente", () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
  });

  it("se puede hacer click cuando no está deshabilitado", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("no dispara onClick cuando está deshabilitado", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("muestra el texto de carga y bloquea el click", async () => {
    const onClick = vi.fn();
    render(<Button loading loadingText="Guardando..." onClick={onClick}>Guardar</Button>);
    expect(screen.getByText("Guardando...")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("aplica la clase aria-busy durante el loading", () => {
    render(<Button loading>Guardar</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
});
