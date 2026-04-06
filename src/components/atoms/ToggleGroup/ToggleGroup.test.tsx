import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

describe("ToggleGroup", () => {
  it("ToggleGroupItem conserva type=button aunque el consumidor intente sobrescribir", () => {
    render(
      <ToggleGroup type="single">
        {/* @ts-expect-error testing runtime guard */}
        <ToggleGroupItem value="a" type="submit">
          A
        </ToggleGroupItem>
      </ToggleGroup>
    );

    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("type", "button");
  });

  it("ToggleGroupItem conserva aria-pressed segun estado y no acepta override", () => {
    render(
      <ToggleGroup type="single" value="a" onValueChange={() => {}}>
        {/* @ts-expect-error testing runtime guard */}
        <ToggleGroupItem value="a" aria-pressed={false}>
          A
        </ToggleGroupItem>
      </ToggleGroup>
    );

    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("aria-pressed", "true");
  });

  it("compone onClick del consumidor y mantiene la logica de cambio", () => {
    const onClick = vi.fn();
    const onValueChange = vi.fn();

    render(
      <ToggleGroup type="single" onValueChange={onValueChange}>
        <ToggleGroupItem value="a" onClick={onClick}>
          A
        </ToggleGroupItem>
      </ToggleGroup>
    );

    fireEvent.click(screen.getByRole("button", { name: "A" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("a");
  });
});
