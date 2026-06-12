import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CurrencyInput } from "./CurrencyInput";

const meta: Meta<typeof CurrencyInput> = {
  title: "Atoms/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(12.5);
    return (
      <div className="p-4 bg-white max-w-xs">
        <CurrencyInput label="Precio por unidad" value={value} onChange={setValue} helperText="Precio sin IVA" />
      </div>
    );
  },
};

export const WithThousandSeparator: Story = {
  render: () => {
    const [value, setValue] = React.useState(125000);
    return (
      <div className="p-4 bg-white max-w-xs">
        <CurrencyInput label="Facturación anual" value={value} onChange={setValue} showThousandSeparator />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = React.useState(9.99);
    return (
      <div className="flex flex-col gap-3 p-4 bg-white max-w-xs">
        <CurrencyInput label="Small" value={value} onChange={setValue} inputSize="sm" />
        <CurrencyInput label="Medium" value={value} onChange={setValue} inputSize="md" />
        <CurrencyInput label="Large" value={value} onChange={setValue} inputSize="lg" />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    return (
      <div className="p-4 bg-white max-w-xs">
        <CurrencyInput label="Precio" value={value} onChange={setValue} error="El precio debe ser mayor que 0" required />
      </div>
    );
  },
};
