import type { Meta, StoryObj } from "@storybook/react";
import { Check } from "lucide-react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Toggle defaultPressed={false}>Off</Toggle>
      <Toggle defaultPressed>On</Toggle>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Toggle variant="leaf" defaultPressed>Leaf</Toggle>
      <Toggle variant="seed" defaultPressed>Seed</Toggle>
      <Toggle variant="forest" defaultPressed>Forest</Toggle>
      <Toggle variant="accent" defaultPressed>Accent</Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Toggle size="sm" defaultPressed>SM</Toggle>
      <Toggle size="md" defaultPressed>MD</Toggle>
      <Toggle size="lg" defaultPressed>LG</Toggle>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Toggle defaultPressed>
        <Check className="mr-1 h-4 w-4" /> Activo
      </Toggle>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Toggle loading>Cargando</Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Toggle disabled>Deshabilitado</Toggle>
      <Toggle disabled defaultPressed>Activo deshabilitado</Toggle>
    </div>
  ),
};
