import { render, screen, fireEvent } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
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
});
