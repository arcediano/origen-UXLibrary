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

    expect(screen.getByRole("status").className).toContain("text-blue-900");
    expect(screen.getByRole("status").className).toContain("border-blue-700");
  });

  it("usa contraste reforzado en variante success", () => {
    render(
      <Alert variant="success">
        <AlertTitle>OK</AlertTitle>
        <AlertDescription>Detalle</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("status").className).toContain("text-green-900");
    expect(screen.getByRole("status").className).toContain("border-green-700");
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