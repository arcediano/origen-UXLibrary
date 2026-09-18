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

  it.each(["icon", "icon-sm"] as const)(
    "size=%s mantiene el ancho fijo en escritorio (no colapsa a w-auto vía la base w-full sm:w-auto)",
    (size) => {
      render(<Button size={size} aria-label="Cerrar">×</Button>);
      const button = screen.getByRole("button", { name: /cerrar/i });
      // Regresión: sin el sm:w-* explícito del tamaño, tailwind-merge dejaba
      // sobrevivir "sm:w-auto" de la clase base junto al w-10/w-8 sin prefijo,
      // y "sm:w-auto" ganaba la cascada real en Tailwind a partir de "sm"
      // (verificado compilando el CSS real), encogiendo el botón icon-only
      // a su contenido en escritorio en vez de mantenerlo cuadrado.
      expect(button.className).not.toContain("sm:w-auto");
      expect(button.className).toMatch(size === "icon" ? /(?:^| )sm:w-10(?: |$)/ : /(?:^| )sm:w-8(?: |$)/);
    }
  );

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
    expect(buttonVariants({ variant: "primary" })).toContain("text-white");
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

  describe("conservación de clases de color en cn() — regresión para bug de tailwind-merge", () => {
    /**
     * Test de regresión: verifica que cn() (usado internamente en Button.render)
     * no descarta clases de color de texto al combinarlas con fontSize personalizados.
     *
     * Reproductor original del bug: buttonVariants() genera clases correctamente,
     * pero el render() final llama a cn() que descartaba la clase de color.
     * Este test ejercita ese path real.
     *
     * Ver: .claude/requirements/bug-fusion-clases-tailwind-merge-button.md
     */
    it.each([
      ["primary", "text-white"],
      ["secondary", "text-origen-bosque"],
      ["outline", "text-origen-bosque"],
      ["ghost", "text-origen-bosque"],
      ["destructive", "text-feedback-danger-text"],
      ["hero", "text-origen-bosque"],
      ["heroOutline", "text-white"],
    ])("variant=%s conserva clase de color de texto en size=sm", (variant, colorClass) => {
      render(<Button variant={variant as any} size="sm">Texto</Button>);
      expect(screen.getByRole("button").className).toContain(colorClass);
    });

    it.each([
      ["primary", "text-white"],
      ["secondary", "text-origen-bosque"],
      ["outline", "text-origen-bosque"],
      ["ghost", "text-origen-bosque"],
      ["destructive", "text-feedback-danger-text"],
      ["hero", "text-origen-bosque"],
      ["heroOutline", "text-white"],
    ])("variant=%s conserva clase de color de texto en size=md", (variant, colorClass) => {
      render(<Button variant={variant as any} size="md">Texto</Button>);
      expect(screen.getByRole("button").className).toContain(colorClass);
    });

    it.each([
      ["primary", "text-white"],
      ["secondary", "text-origen-bosque"],
      ["outline", "text-origen-bosque"],
      ["ghost", "text-origen-bosque"],
      ["destructive", "text-feedback-danger-text"],
      ["hero", "text-origen-bosque"],
      ["heroOutline", "text-white"],
    ])("variant=%s conserva clase de color de texto en size=lg", (variant, colorClass) => {
      render(<Button variant={variant as any} size="lg">Texto</Button>);
      expect(screen.getByRole("button").className).toContain(colorClass);
    });
  });

  describe("ring de foco por variante (contraste sobre fondo claro/oscuro)", () => {
    it.each([
      ["primary"],
      ["secondary"],
      ["outline"],
      ["ghost"],
      ["destructive"],
    ])("variant=%s usa ring-origen-pino (fondo claro)", (variant) => {
      render(<Button variant={variant as any}>Texto</Button>);
      expect(screen.getByRole("button").className).toContain("focus-visible:ring-origen-pino");
    });

    it.each([
      ["hero"],
      ["heroOutline"],
    ])("variant=%s usa ring-white (fondo oscuro/imagen, evita el bajo contraste de ring-origen-pino)", (variant) => {
      render(<Button variant={variant as any}>Texto</Button>);
      const className = screen.getByRole("button").className;
      expect(className).toContain("focus-visible:ring-white");
      expect(className).not.toContain("focus-visible:ring-origen-pino");
    });
  });
});
