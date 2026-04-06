import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toast, ToastClose, ToastProvider, ToastViewport } from "./Toast";

describe("Toast", () => {
  it("ToastClose conserva aria-label y toast-close aunque se intenten sobrescribir", () => {
    render(
      <ToastProvider>
        <Toast open>
          {/* @ts-expect-error testing runtime guard */}
          <ToastClose aria-label="Hack" toast-close="override" />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(closeButton).toHaveAttribute("toast-close", "");
  });
});
