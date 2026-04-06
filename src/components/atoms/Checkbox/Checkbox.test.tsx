import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("type es siempre checkbox, el consumidor no puede sobrescribirlo", () => {
    // @ts-expect-error testing runtime guard
    const { container } = render(<Checkbox type="radio" />);
    expect(container.querySelector("input")).toHaveAttribute("type", "checkbox");
  });

  it("checked refleja el prop controlado", () => {
    const { container } = render(<Checkbox checked onChange={() => {}} />);
    expect(container.querySelector("input")).toBeChecked();
  });

  it("llama a onCheckedChange al hacer clic", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Checkbox onCheckedChange={onCheckedChange} />);
    fireEvent.click(container.querySelector("input")!);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
