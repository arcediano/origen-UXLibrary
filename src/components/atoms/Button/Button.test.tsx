import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button, buttonVariants } from "./Button";

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

  it("usa los tokens de marca feedback-danger para destructive", () => {
    expect(buttonVariants({ variant: "destructive" })).toContain("bg-feedback-danger-subtle");
    expect(buttonVariants({ variant: "destructive" })).toContain("text-feedback-danger-text");
    expect(buttonVariants({ variant: "destructive" })).toContain("border-feedback-danger-border");
    expect(buttonVariants({ variant: "destructive" })).toContain("hover:bg-feedback-danger/15");
  });

  it("refuerza el feedback visual de ghost en hover y focus-visible", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: /ghost/i });
    expect(button.className).toContain("hover:text-origen-pino");
    expect(button.className).toContain("focus-visible:bg-origen-pastel/40");
  });

  it("usa un focus ring visible para estados claros", () => {
    render(<Button variant="secondary">Secundario</Button>);
    expect(screen.getByRole("button", { name: /secundario/i }).className).toContain("focus-visible:ring-origen-pino");
  });

  it("mantiene disabled states legibles en outline y ghost", () => {
    render(
      <>
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
      </>
    );

    expect(screen.getByRole("button", { name: /outline/i }).className).toContain("disabled:text-origen-bosque/70");
    expect(screen.getByRole("button", { name: /ghost/i }).className).toContain("disabled:text-origen-bosque/70");
  });

  it("fuerza texto legible en primary con gradiente oscuro", () => {
    expect(buttonVariants({ variant: "primary" })).toContain("!text-white");
  });

  it("no permite sobrescribir aria reservadas del estado loading", () => {
    render(
      <Button loading aria-busy="false" aria-disabled="false">
        Guardar
      </Button>
    );

    const button = screen.getByRole("button", { name: /cargando/i });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
