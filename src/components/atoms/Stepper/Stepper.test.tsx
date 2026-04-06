import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper, StepperFooter } from "./Stepper";

const steps = [
  { id: "s1", title: "Paso 1", status: "completed" as const },
  { id: "s2", title: "Paso 2", status: "active" as const },
  { id: "s3", title: "Paso 3", status: "pending" as const },
];

describe("Stepper", () => {
  it("marca el paso activo con aria-current=step", () => {
    render(<Stepper steps={steps} currentStep={1} />);

    const activeButton = screen.getByRole("button", { name: "Paso 2" });
    expect(activeButton).toHaveAttribute("aria-current", "step");
  });

  it("ejecuta onStepChange solo cuando el paso es navegable", () => {
    const onStepChange = vi.fn();

    render(<Stepper steps={steps} currentStep={1} onStepChange={onStepChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Paso 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Paso 3" }));

    expect(onStepChange).toHaveBeenNthCalledWith(1, 0);
    expect(onStepChange).toHaveBeenNthCalledWith(2, 2);
  });

  it("StepperFooter usa botones type=button", () => {
    render(<StepperFooter currentStep={0} totalSteps={3} />);

    const previous = screen.getByRole("button", { name: "Anterior" });
    const next = screen.getByRole("button", { name: "Siguiente" });

    expect(previous).toHaveAttribute("type", "button");
    expect(next).toHaveAttribute("type", "button");
  });
});
