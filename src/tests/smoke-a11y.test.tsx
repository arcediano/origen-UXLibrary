import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { MobileTopBar } from "@/components/mobile/MobileTopBar";
import { FilterBottomSheet } from "@/components/mobile/FilterBottomSheet";
import { ScrollChipFilter } from "@/components/mobile/ScrollChipFilter";

describe("Smoke and a11y", () => {
  it("renderiza primitives de formulario con nombres accesibles", () => {
    render(
      <div>
        <Label htmlFor="email" required tooltip="Usaremos este dato para notificaciones.">Correo electrónico</Label>
        <Input id="email" label="Correo electrónico" type="email" placeholder="nombre@origen.com" />
        <Button>Guardar cambios</Button>
      </div>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /guardar cambios/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /información adicional/i })).toBeInTheDocument();
  });

  it("renderiza navegación y filtros mobile con roles esperados", () => {
    render(
      <div>
        <MobileTopBar title="Explorar" subtitle="Mercado cercano" />
        <ScrollChipFilter
          items={[
            { id: "organico", label: "Orgánico" },
            { id: "cercano", label: "Cercano" },
          ]}
          value="organico"
          hasAll
        />
      </div>
    );

    expect(screen.getByRole("group", { name: /filtros/i })).toBeInTheDocument();
  });

  it("renderiza el bottom sheet con semántica de diálogo", () => {
    render(
      <FilterBottomSheet open onClose={() => undefined} title="Filtros" description="Ajusta tu búsqueda">
        <p>Contenido</p>
      </FilterBottomSheet>
    );

    expect(screen.getByRole("dialog", { name: /filtros/i })).toBeInTheDocument();
    expect(screen.getByText(/ajusta tu búsqueda/i)).toBeInTheDocument();
    expect(screen.getByText(/contenido/i)).toBeInTheDocument();
  });
});