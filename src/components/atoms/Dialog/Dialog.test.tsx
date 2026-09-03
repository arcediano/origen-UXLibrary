import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

beforeAll(() => {
  mockMatchMedia(false);
});

describe("Dialog", () => {
  it("no permite sobrescribir role ni aria-modal en DialogContent", () => {
    render(
      <Dialog open>
        <DialogContent role="region" aria-modal="false">
          <DialogTitle>Titulo</DialogTitle>
          <DialogDescription>Descripcion</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("DialogTrigger mantiene type=button aunque el consumidor intente sobrescribir", () => {
    render(
      <Dialog>
        {/* @ts-expect-error testing runtime guard */}
        <DialogTrigger type="submit">Abrir</DialogTrigger>
      </Dialog>
    );

    expect(screen.getByRole("button", { name: "Abrir" })).toHaveAttribute("type", "button");
  });

  it("DialogTrigger compone onClick y cambia estado", () => {
    const onClick = vi.fn();

    render(
      <Dialog>
        <DialogTrigger onClick={onClick}>Abrir</DialogTrigger>
        <DialogContent>
          <DialogTitle>Titulo</DialogTitle>
          <DialogDescription>Descripcion</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("cierra al hacer click fuera cuando closeOnOutsideClick=true", () => {
    const onOpenChange = vi.fn();

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Titulo</DialogTitle>
          <DialogDescription>Descripcion</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const backdrop = screen.getByRole("dialog").parentElement;
    fireEvent.mouseDown(backdrop!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("cierra con Escape", () => {
    const onOpenChange = vi.fn();

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Titulo</DialogTitle>
          <DialogDescription>Descripcion</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  describe("en móvil, contenido más alto que la pantalla", () => {
    afterEach(() => {
      mockMatchMedia(false);
    });

    it("el contenido queda dentro de un contenedor con overflow-y-auto, no recortado sin scroll", () => {
      mockMatchMedia(true);

      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Titulo</DialogTitle>
            </DialogHeader>
            <div data-testid="cuerpo">Cuerpo largo</div>
            <DialogFooter>
              <button type="button">Confirmar</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      const body = screen.getByTestId("cuerpo");
      const scrollWrapper = body.parentElement;
      expect(scrollWrapper).toHaveClass("overflow-y-auto");

      // El panel exterior ya no recorta el scroll: es el wrapper interior
      // quien se desplaza, así que el panel debe dejar de tener overflow-y-auto
      // (antes del fix, max-h-[90dvh] sin overflow-y-auto recortaba el
      // contenido en silencio -- p.ej. las casillas del código 2FA quedaban
      // fuera de la pantalla sin forma de llegar a ellas).
      const panel = screen.getByRole("dialog");
      expect(panel).not.toHaveClass("overflow-y-auto");
    });

    it("el botón de confirmar (footer) sigue siendo accesible -- sticky, no se pierde con el scroll", () => {
      mockMatchMedia(true);

      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Titulo</DialogTitle>
            </DialogHeader>
            <div>Cuerpo</div>
            <DialogFooter>
              <button type="button">Confirmar</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      const footer = screen.getByRole("button", { name: "Confirmar" }).closest("div");
      expect(footer).toHaveClass("sticky");
      expect(footer).toHaveClass("bottom-0");
    });
  });
});
