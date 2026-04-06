import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toast, ToastClose, ToastProvider, ToastViewport, reducer } from "./Toast";

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

  it("reducer respeta el limite maximo de toasts", () => {
    const initialState = { toasts: [] };

    const state1 = reducer(initialState, {
      type: "ADD_TOAST",
      toast: { id: "1", title: "one" },
    });
    const state2 = reducer(state1, {
      type: "ADD_TOAST",
      toast: { id: "2", title: "two" },
    });
    const state3 = reducer(state2, {
      type: "ADD_TOAST",
      toast: { id: "3", title: "three" },
    });
    const state4 = reducer(state3, {
      type: "ADD_TOAST",
      toast: { id: "4", title: "four" },
    });

    expect(state4.toasts).toHaveLength(3);
    expect(state4.toasts.map((t) => t.id)).toEqual(["4", "3", "2"]);
  });

  it("reducer dismiss sin id cierra todos los toasts abiertos", () => {
    const initialState = {
      toasts: [
        { id: "1", title: "one", open: true },
        { id: "2", title: "two", open: true },
      ],
    };

    const nextState = reducer(initialState, { type: "DISMISS_TOAST" });

    expect(nextState.toasts).toHaveLength(2);
    expect(nextState.toasts.every((toast) => toast.open === false)).toBe(true);
  });
});
