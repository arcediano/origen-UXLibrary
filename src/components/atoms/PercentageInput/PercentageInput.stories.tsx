import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PercentageInput } from "./PercentageInput";

const meta: Meta<typeof PercentageInput> = {
  title: "Atoms/PercentageInput",
  component: PercentageInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PercentageInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(15);
    return (
      <div className="p-4 bg-white max-w-xs">
        <PercentageInput label="Comisión de la plataforma" value={value} onChange={setValue} helperText="Porcentaje aplicado sobre cada venta" />
      </div>
    );
  },
};

export const WithProgress: Story = {
  render: () => {
    const [value, setValue] = React.useState(65);
    return (
      <div className="p-4 bg-white max-w-xs">
        <PercentageInput label="Progreso de perfil" value={value} onChange={setValue} showProgress />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = React.useState(120);
    return (
      <div className="p-4 bg-white max-w-xs">
        <PercentageInput label="Descuento" value={value} onChange={setValue} error="El porcentaje no puede superar 100" required />
      </div>
    );
  },
};
