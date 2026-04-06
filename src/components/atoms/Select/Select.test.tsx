import { render, screen, fireEvent } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Select";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

function renderSelect(onTriggerClick?: () => void) {
  return render(
    <Select defaultValue="one" placeholder="Selecciona">
      <SelectTrigger aria-expanded={false} onClick={onTriggerClick}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one" aria-selected={false}>
          One
        </SelectItem>
        <SelectItem value="two">Two</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("no permite sobrescribir aria-expanded reservado del trigger", () => {
    renderSelect();
    const trigger = screen.getByRole("button");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("no permite sobrescribir aria-selected reservado de SelectItem", () => {
    renderSelect();
    fireEvent.click(screen.getByRole("button"));

    const oneOption = screen.getByRole("option", { name: "One" });
    expect(oneOption).toHaveAttribute("aria-selected", "true");
  });

  it("mantiene ejecución de onClick del consumidor en trigger", () => {
    const onClick = vi.fn();
    renderSelect(onClick);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
