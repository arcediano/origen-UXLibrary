import type { Meta, StoryObj } from "@storybook/react";
import { Bell, ChevronLeft, Leaf, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { MobileTopBar } from "./MobileTopBar";

const meta: Meta<typeof MobileTopBar> = {
  title: "Mobile/MobileTopBar",
  component: MobileTopBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MobileTopBar>;

export const CommerceHeader: Story = {
  render: () => (
    <div className="min-h-[520px] bg-origen-nube">
      <MobileTopBar
        sticky
        title="Verduras de estación"
        subtitle="38 resultados cerca de tu zona"
        leading={
          <Button size="icon-sm" variant="ghost" aria-label="Volver">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
        }
        trailing={
          <>
            <Button size="icon-sm" variant="ghost" aria-label="Filtrar">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Notificaciones">
              <Bell className="h-4 w-4" aria-hidden="true" />
            </Button>
          </>
        }
      />
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-[2rem] border border-border-subtle bg-surface-alt p-5 shadow-subtle">
          <p className="text-body text-origen-oscuro">Header preparado para flujos mobile-first con safe area y acciones compactas.</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Bloque de marca con logo en gradiente, ocupando el ancho flexible central
 * mediante `center`. Patron usado en tabs raiz de dashboard/admin.
 */
export const BrandCenter: Story = {
  render: () => (
    <div className="min-h-[420px] bg-origen-nube">
      <MobileTopBar
        sticky
        center={
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-origen-bosque to-origen-pino text-white shadow-origen">
              <Leaf className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-serif text-body font-semibold text-origen-bosque">origen.</p>
              <p className="truncate text-micro text-text-subtle">Panel del productor</p>
            </div>
          </div>
        }
        trailing={
          <Button size="icon-sm" variant="ghost" aria-label="Notificaciones">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </Button>
        }
      />
    </div>
  ),
};

/**
 * Sub-pagina con boton volver + titulo dinamico ocupando el bloque central
 * flexible mediante `center` (no `leading`, que es `shrink-0`).
 */
export const BackButtonWithDynamicTitle: Story = {
  render: () => (
    <div className="min-h-[420px] bg-origen-nube">
      <MobileTopBar
        sticky
        center={
          <div className="flex items-center gap-3">
            <Button size="icon-sm" variant="ghost" aria-label="Volver" className="shrink-0 rounded-full">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <div className="min-w-0">
              <p className="truncate text-body font-semibold text-origen-bosque">Mis pedidos</p>
            </div>
          </div>
        }
        trailing={
          <Button size="icon-sm" variant="ghost" aria-label="Filtrar">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          </Button>
        }
      />
    </div>
  ),
};