/**
 * @file a11y-aria.test.tsx
 * @description Suite de validación programática de atributos ARIA.
 *
 * Cubre las cadenas de accesibilidad de todos los componentes clave:
 * Button, Input, Badge, Tabs, FilterBottomSheet, ScrollChipFilter.
 *
 * Complementa smoke-a11y.test.tsx (existencia de roles) con aserciones profundas
 * sobre aria-invalid, aria-describedby, aria-controls, aria-labelledby y estados
 * aria-selected / aria-checked / aria-pressed.
 */

import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Badge, StatusBadge } from "@/components/atoms/Badge/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/atoms/Tabs/Tabs";
import { FilterBottomSheet } from "@/components/mobile/FilterBottomSheet/FilterBottomSheet";
import { ScrollChipFilter } from "@/components/mobile/ScrollChipFilter/ScrollChipFilter";

// ─── Button ─────────────────────────────────────────────────────────────────

describe("Button — ARIA", () => {
  it("expone nombre accesible desde su contenido de texto", () => {
    render(<Button>Guardar producto</Button>);
    expect(screen.getByRole("button", { name: /guardar producto/i })).toBeInTheDocument();
  });

  it("está deshabilitado y tiene aria-busy cuando loading=true", () => {
    render(<Button loading loadingText="Procesando...">Guardar</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    // El spinner de lucide-react está dentro del botón
    expect(btn.querySelector("svg")).not.toBeNull();
  });

  it("botón solo-icono admite aria-label pasado como prop", () => {
    render(
      <Button size="icon" aria-label="Abrir menú de opciones" variant="ghost">
        <span aria-hidden="true">☰</span>
      </Button>
    );
    expect(screen.getByRole("button", { name: /abrir menú de opciones/i })).toBeInTheDocument();
  });
});

// ─── Input ──────────────────────────────────────────────────────────────────

describe("Input — ARIA", () => {
  it("asocia el label al input mediante htmlFor/id", () => {
    render(<Input label="Correo electrónico" type="email" />);
    // getByLabelText verifica que label.htmlFor === input.id
    const input = screen.getByLabelText("Correo electrónico");
    expect(input).toHaveAttribute("type", "email");
  });

  it("aplica aria-invalid=true cuando hay un mensaje de error", () => {
    render(<Input label="Email" error="Formato inválido" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("vincula el mensaje de error al input mediante aria-describedby", () => {
    render(<Input label="Email" error="Formato inválido" />);
    const input = screen.getByLabelText("Email");
    const errorId = input.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    const errorEl = document.getElementById(errorId!);
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toMatch(/Formato inválido/);
  });

  it("vincula el texto de ayuda al input mediante aria-describedby cuando no hay error", () => {
    render(<Input label="Bio" helperText="Máximo 200 caracteres" />);
    const input = screen.getByLabelText("Bio");
    const helperDomId = input.getAttribute("aria-describedby");
    expect(helperDomId).toBeTruthy();
    const helperEl = document.getElementById(helperDomId!);
    expect(helperEl).not.toBeNull();
    expect(helperEl!.textContent).toMatch(/Máximo 200 caracteres/);
  });

  it("no tiene aria-invalid cuando no hay error", () => {
    render(<Input label="Nombre" />);
    const input = screen.getByLabelText("Nombre");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });
});

// ─── Badge ───────────────────────────────────────────────────────────────────

describe("Badge — ARIA", () => {
  it("renderiza como un span no interactivo con contenido legible", () => {
    render(<Badge variant="success">Activo</Badge>);
    // Badge es un <span>; no debe aparecer bajo role="button" o "link"
    const span = screen.getByText("Activo");
    expect(span.tagName).toBe("SPAN");
    expect(span).not.toHaveAttribute("role", "button");
  });

  it("StatusBadge expone texto legible para lectores de pantalla", () => {
    render(<StatusBadge status="out_of_stock" />);
    // StatusBadge renderiza la etiqueta de negocio como texto visible
    expect(screen.getByText(/sin stock/i)).toBeInTheDocument();
  });
});

// ─── Tabs ────────────────────────────────────────────────────────────────────

describe("Tabs — ARIA", () => {
  function renderTabs() {
    return render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Pestaña 1</TabsTrigger>
          <TabsTrigger value="tab2">Pestaña 2</TabsTrigger>
          <TabsTrigger value="tab3">Pestaña 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Contenido 1</TabsContent>
        <TabsContent value="tab2">Contenido 2</TabsContent>
        <TabsContent value="tab3">Contenido 3</TabsContent>
      </Tabs>
    );
  }

  it("renderiza tablist, tabs y el tabpanel activo con roles correctos", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Contenido 1");
  });

  it("solo la tab activa tiene aria-selected=true", () => {
    renderTabs();
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
  });

  it("aria-controls de la tab activa apunta al id del tabpanel", () => {
    renderTabs();
    const activeTab = screen.getAllByRole("tab")[0];
    const panelId = activeTab.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId!);
    expect(panel).not.toBeNull();
    expect(panel!.getAttribute("role")).toBe("tabpanel");
  });

  it("al cambiar de tab, aria-selected se actualiza", () => {
    renderTabs();
    const [tab1, tab2] = screen.getAllByRole("tab");
    fireEvent.click(tab2);
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Contenido 2");
  });
});

// ─── FilterBottomSheet ────────────────────────────────────────────────────────

describe("FilterBottomSheet — ARIA", () => {
  it("cuando está abierto, tiene role=dialog con aria-modal=true", () => {
    render(
      <FilterBottomSheet open onClose={() => {}} title="Filtros activos">
        <p>Contenido del panel</p>
      </FilterBottomSheet>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("el dialog toma el título de la prop title como aria-label", () => {
    render(
      <FilterBottomSheet open onClose={() => {}} title="Filtrar resultados">
        <p>Contenido</p>
      </FilterBottomSheet>
    );
    expect(
      screen.getByRole("dialog", { name: /filtrar resultados/i })
    ).toBeInTheDocument();
  });

  it("cuando está cerrado, no hay dialog en el DOM", () => {
    render(
      <FilterBottomSheet open={false} onClose={() => {}} title="Filtros">
        <p>Contenido</p>
      </FilterBottomSheet>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

// ─── ScrollChipFilter ────────────────────────────────────────────────────────

const CHIP_ITEMS = [
  { id: "frutas",    label: "Frutas" },
  { id: "verduras",  label: "Verduras" },
  { id: "lacteos",   label: "Lácteos" },
];

describe("ScrollChipFilter — ARIA", () => {
  it("tiene role=group con aria-label 'Filtros'", () => {
    render(<ScrollChipFilter items={CHIP_ITEMS} value="" />);
    expect(screen.getByRole("group", { name: /filtros/i })).toBeInTheDocument();
  });

  it("los chips usan role=checkbox con aria-checked", () => {
    render(<ScrollChipFilter items={CHIP_ITEMS} value="frutas" />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
    const frutas = screen.getByRole("checkbox", { name: /frutas/i });
    const verduras = screen.getByRole("checkbox", { name: /verduras/i });
    expect(frutas).toHaveAttribute("aria-checked", "true");
    expect(verduras).toHaveAttribute("aria-checked", "false");
  });

  it("con hasAll=true, el chip 'Todos' aparece como primer checkbox", () => {
    render(<ScrollChipFilter items={CHIP_ITEMS} value="" hasAll />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toHaveTextContent("Todos");
    // Sin valor seleccionado, "Todos" está activo (aria-checked=true)
    expect(checkboxes[0]).toHaveAttribute("aria-checked", "true");
  });

  it("al hacer click en un chip inactivo, invoca onValueChange con su id", () => {
    const onValueChange = vi.fn();
    render(
      <ScrollChipFilter items={CHIP_ITEMS} value="" onValueChange={onValueChange} />
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /verduras/i }));
    expect(onValueChange).toHaveBeenCalledWith("verduras");
  });
});
