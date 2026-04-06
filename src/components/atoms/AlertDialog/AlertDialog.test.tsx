import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./AlertDialog";

describe("AlertDialog", () => {
  it("Trigger por defecto es button type=button", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Abrir</AlertDialogTrigger>
      </AlertDialog>
    );

    expect(screen.getByRole("button", { name: "Abrir" })).toHaveAttribute("type", "button");
  });

  it("no permite sobrescribir role ni aria-modal en AlertDialogContent", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent role="region" aria-modal="false">
          <AlertDialogTitle>Eliminar</AlertDialogTitle>
          <AlertDialogDescription>Accion irreversible</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );

    const alertDialog = screen.getByRole("alertdialog");
    expect(alertDialog).toHaveAttribute("aria-modal", "true");
  });

  it("conecta aria-labelledby y aria-describedby con title y description", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogTitle>Eliminar</AlertDialogTitle>
          <AlertDialogDescription>Accion irreversible</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );

    const alertDialog = screen.getByRole("alertdialog");
    const title = screen.getByText("Eliminar");
    const description = screen.getByText("Accion irreversible");

    expect(alertDialog).toHaveAttribute("aria-labelledby", title.getAttribute("id"));
    expect(alertDialog).toHaveAttribute("aria-describedby", description.getAttribute("id"));
  });

  it("AlertDialogAction compone onClick y solicita cierre", () => {
    const onOpenChange = vi.fn();
    const onClick = vi.fn();

    render(
      <AlertDialog open onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogTitle>Eliminar</AlertDialogTitle>
          <AlertDialogDescription>Accion irreversible</AlertDialogDescription>
          <AlertDialogAction onClick={onClick}>Confirmar</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("AlertDialogAction respeta preventDefault y no cierra", () => {
    const onOpenChange = vi.fn();

    render(
      <AlertDialog open onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogTitle>Eliminar</AlertDialogTitle>
          <AlertDialogDescription>Accion irreversible</AlertDialogDescription>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it("AlertDialogCancel respeta preventDefault y no cierra", () => {
    const onOpenChange = vi.fn();

    render(
      <AlertDialog open onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogTitle>Eliminar</AlertDialogTitle>
          <AlertDialogDescription>Accion irreversible</AlertDialogDescription>
          <AlertDialogCancel
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Cancelar
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });
});
