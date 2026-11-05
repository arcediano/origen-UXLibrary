import { render, screen, fireEvent, within } from "@testing-library/react";
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

  it("un SelectItem con contenido mixto (icono + texto) muestra su etiqueta en SelectValue, no el value en crudo (hallazgo del humano, 2026-11-05)", () => {
    render(
      <Select defaultValue="frutas-verduras" placeholder="Categoría">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="frutas-verduras">
            <span>
              <img src="/fruta.png" alt="" />
              <span>Frutas y Verduras</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    );

    // Antes del fix, getLabel() nunca se rellenaba para children no-string y
    // SelectValue mostraba el value en crudo ("frutas-verduras").
    const trigger = screen.getByRole('button');
    expect(within(trigger).getByText('Frutas y Verduras')).toBeInTheDocument();
    expect(within(trigger).queryByText('frutas-verduras')).toBeNull();
  });

  it("un Select searchable filtra ítems con contenido mixto igual que los de solo texto", () => {
    render(
      <Select defaultValue="" placeholder="Categoría" searchable>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="frutas-verduras">
            <span>
              <img src="/fruta.png" alt="" />
              <span>Frutas y Verduras</span>
            </span>
          </SelectItem>
          <SelectItem value="lacteos-huevos">
            <span>
              <img src="/lacteos.png" alt="" />
              <span>Lácteos y Huevos</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.change(screen.getByPlaceholderText("Buscar..."), { target: { value: "fruta" } });

    expect(screen.getByText('Frutas y Verduras')).toBeInTheDocument();
    expect(screen.queryByText('Lácteos y Huevos')).toBeNull();
  });
});
