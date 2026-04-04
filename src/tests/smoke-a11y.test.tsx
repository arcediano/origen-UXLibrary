import { render, screen } from "@testing-library/react";
import { Bell, Home, Search } from "lucide-react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
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
        <MobileBottomNav
          activeId="home"
          items={[
            { id: "home", label: "Inicio", icon: <Home className="h-4 w-4" aria-hidden="true" /> },
            { id: "search", label: "Buscar", icon: <Search className="h-4 w-4" aria-hidden="true" /> },
            { id: "alerts", label: "Alertas", icon: <Bell className="h-4 w-4" aria-hidden="true" /> },
          ]}
        />
      </div>
    );

    expect(screen.getByLabelText(/mobile bottom navigation/i)).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /filtros/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /inicio/i })).toHaveAttribute("aria-pressed", "true");
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