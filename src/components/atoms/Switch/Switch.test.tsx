import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("type es siempre checkbox, el consumidor no puede sobrescribirlo", () => {
    // @ts-expect-error testing runtime guard
    const { container } = render(<Switch type="radio" />);
    expect(container.querySelector("input")).toHaveAttribute("type", "checkbox");
  });

  it("checked refleja el prop controlado", () => {
    const { container } = render(<Switch checked onCheckedChange={() => {}} />);
    expect(container.querySelector("input")).toBeChecked();
  });

  it("llama a onCheckedChange al hacer toggle", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch onCheckedChange={onCheckedChange} />);
    fireEvent.click(container.querySelector("input")!);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
