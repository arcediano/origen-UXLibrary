import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toast, ToastClose, ToastProvider, ToastViewport, Toaster, reducer, useToast } from "./Toast";

function ToastTestControls() {
  const { toast, dismiss } = useToast();

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          toast({
            title: "Saved",
            description: "Changes persisted",
          })
        }
      >
        Open Toast
      </button>
      <button type="button" onClick={() => dismiss()}>
        Dismiss All
      </button>
    </div>
  );
}

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

  it("useToast + Toaster renderiza y permite dismiss global", async () => {
    render(
      <>
        <ToastTestControls />
        <Toaster />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open Toast" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Dismiss All" }));

    await waitFor(() => {
      expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    });
  });
});
