import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./Alert";

describe("Alert", () => {
  it("usa aria-live assertive para errores y polite para variantes no críticas", () => {
    const { rerender } = render(
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");

    rerender(
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("no permite sobrescribir role ni aria-live reservados", () => {
    const { rerender } = render(
      <Alert variant="error" role="presentation" aria-live="off">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");

    rerender(
      <Alert variant="info" role="presentation" aria-live="assertive">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("usa contraste reforzado en variante info", () => {
    render(
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("status").className).toContain("text-feedback-info-text");
    expect(screen.getByRole("status").className).toContain("border-feedback-info");
  });

  it("usa contraste reforzado en variante success", () => {
    render(
      <Alert variant="success">
        <AlertTitle>OK</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("status").className).toContain("text-feedback-success-text");
    expect(screen.getByRole("status").className).toContain("border-feedback-success");
  });

  it("usa borde visible en variante default", () => {
    render(
      <Alert>
        <AlertTitle>Base</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("status").className).toContain("border-origen-hoja");
  });

  it("apila el contenido en columna en móvil cuando hay trailing, y en fila desde sm (bug reportado por el humano, 2026-11-05: el texto quedaba comprimido en una columna estrecha junto al botón)", () => {
    render(
      <Alert variant="warning" trailing={<button type="button">Reenviar email</button>}>
        Tu correo electrónico aún no está verificado.
      </Alert>
    );

    const alert = screen.getByRole("status");
    expect(alert.className).toContain("flex-col");
    expect(alert.className).toContain("sm:flex-row");
    expect(screen.getByRole("button", { name: "Reenviar email" })).toBeInTheDocument();
  });

  it("agrupa trailing y el botón de cerrar en el mismo bloque de acciones", () => {
    const onDismiss = vi.fn();
    render(
      <Alert
        variant="warning"
        trailing={<button type="button">Acción</button>}
        dismissible
        onDismiss={onDismiss}
      >
        Mensaje
      </Alert>
    );

    const accionButton = screen.getByRole("button", { name: "Acción" });
    const closeButton = screen.getByRole("button", { name: /cerrar alerta/i });
    expect(accionButton.parentElement).toBe(closeButton.parentElement);
  });

  it("permite cerrar una alerta dismissible", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();

    render(
      <Alert dismissible onDismiss={onDismiss}>
        <AlertTitle>Atención</AlertTitle>
        <AlertDescription>Mensaje</AlertDescription>
      </Alert>
    );

    await user.click(screen.getByRole("button", { name: /cerrar alerta/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});