import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { FilterBottomSheet } from "./FilterBottomSheet";

const meta: Meta<typeof FilterBottomSheet> = {
  title: "Mobile/FilterBottomSheet",
  component: FilterBottomSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FilterBottomSheet>;

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="min-h-[520px] bg-origen-nube px-4 py-6">
        <div className="mx-auto max-w-md rounded-[2rem] border border-border-subtle bg-surface-alt p-5 shadow-subtle">
          <p className="text-micro uppercase tracking-[0.18em] text-text-subtle">Mobile commerce</p>
          <h2 className="mt-2 text-h3 text-origen-bosque">Bottom sheet de filtros</h2>
          <p className="mt-2 text-small text-text-subtle">Presenta opciones complejas sin abandonar el contexto del catálogo.</p>
          <Button className="mt-4" leftIcon={<SlidersHorizontal className="h-4 w-4" aria-hidden="true" />} onClick={() => setOpen(true)}>
            Abrir filtros
          </Button>
        </div>

        <FilterBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Filtrar resultados"
          description="Ajusta disponibilidad, origen y tipo de cultivo."
          footer={
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Limpiar</Button>
              <Button className="flex-1" onClick={() => setOpen(false)}>Aplicar</Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="rounded-3xl border border-border-subtle bg-origen-nube p-4">
              <p className="text-small font-semibold text-origen-bosque">Disponibilidad</p>
              <p className="mt-1 text-small text-text-subtle">Entrega hoy, retiro en tienda o reserva semanal.</p>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-surface p-4">
              <p className="inline-flex items-center gap-2 text-small font-semibold text-origen-bosque">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Curaduría recomendada
              </p>
              <p className="mt-1 text-small text-text-subtle">Destaca productores con mejor conversión y stock confiable.</p>
            </div>
          </div>
        </FilterBottomSheet>
      </div>
    );
  },
};