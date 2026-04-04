import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const States: Story = {
  render: () => (
    <div className="space-y-4 rounded-[2rem] bg-surface-alt p-6 shadow-subtle">
      <Label htmlFor="nombre" required>Nombre del productor</Label>
      <Label htmlFor="categoria" optional>Categoria comercial</Label>
      <Label htmlFor="stock" variant="success">Stock validado</Label>
      <Label htmlFor="precio" variant="error">Precio requiere revisión</Label>
      <Label htmlFor="descripcion" tooltip="Se mostrará en fichas y cards de catálogo.">Descripción breve</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3 rounded-[2rem] bg-surface-alt p-6 shadow-subtle">
      <Label size="sm">Label pequeño</Label>
      <Label size="default">Label estándar</Label>
      <Label size="lg">Label grande</Label>
    </div>
  ),
};