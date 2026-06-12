import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxWithLabel, CheckboxGroup } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-white">
      <Checkbox variant="seed" checked />
      <Checkbox variant="leaf" checked />
      <Checkbox variant="forest" checked />
      <Checkbox variant="accent" checked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-white">
      <Checkbox size="sm" checked />
      <Checkbox size="md" checked />
      <Checkbox size="lg" checked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-white">
      <Checkbox checked={false} />
      <Checkbox checked />
      <Checkbox checked="indeterminate" />
      <Checkbox checked disabled />
      <Checkbox hasError />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 bg-white max-w-md">
      <CheckboxWithLabel
        label="Acepto los términos y condiciones"
        description="Lee nuestras políticas de privacidad antes de continuar"
        size="lg"
      />
      <CheckboxWithLabel label="Recibir comunicaciones por email" errorMessage="Debes aceptar para continuar" hasError />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <CheckboxGroup legend="Categorías" description="Selecciona una o varias categorías" layout="vertical">
        <CheckboxWithLabel label="Frutas y verduras" />
        <CheckboxWithLabel label="Lácteos" />
        <CheckboxWithLabel label="Panadería" />
      </CheckboxGroup>
    </div>
  ),
};
