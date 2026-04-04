import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Atoms/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tabs nativos del sistema Origen con soporte controlado y orientación horizontal o vertical.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-xl rounded-[2rem] bg-origen-nube p-6">
      <Tabs defaultValue="destacados">
        <TabsList>
          <TabsTrigger value="destacados">Destacados</TabsTrigger>
          <TabsTrigger value="nuevos">Nuevos</TabsTrigger>
          <TabsTrigger value="sostenibles">Sostenibles</TabsTrigger>
        </TabsList>
        <TabsContent value="destacados" className="rounded-3xl border border-border-subtle bg-surface-alt p-5">
          <p className="text-small text-origen-oscuro">Módulo ideal para destacar categorías con conversión alta.</p>
        </TabsContent>
        <TabsContent value="nuevos" className="rounded-3xl border border-border-subtle bg-surface-alt p-5">
          <p className="text-small text-origen-oscuro">Espacio para lanzamientos y colecciones recién incorporadas.</p>
        </TabsContent>
        <TabsContent value="sostenibles" className="rounded-3xl border border-border-subtle bg-surface-alt p-5">
          <p className="text-small text-origen-oscuro">Panel para surtido con foco en trazabilidad y origen responsable.</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="max-w-3xl rounded-[2rem] bg-origen-nube p-6">
      <Tabs defaultValue="stock" orientation="vertical" className="grid gap-4 md:grid-cols-[220px_1fr]">
        <TabsList fullWidth className="h-fit">
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="precio">Precio</TabsTrigger>
          <TabsTrigger value="entrega">Entrega</TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="stock" className="rounded-3xl border border-border-subtle bg-surface-alt p-5">
            <p className="text-small text-origen-oscuro">Estado del inventario y disponibilidad por ventana comercial.</p>
          </TabsContent>
          <TabsContent value="precio" className="rounded-3xl border border-border-subtle bg-surface-alt p-5">
            <p className="text-small text-origen-oscuro">Comparativa de margen, descuentos y precio por unidad.</p>
          </TabsContent>
          <TabsContent value="entrega" className="rounded-3xl border border-border-subtle bg-surface-alt p-5">
            <p className="text-small text-origen-oscuro">Opciones logísticas y compromiso de entrega para el canal digital.</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
};