import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuantitySelector } from "./QuantitySelector";

const meta: Meta<typeof QuantitySelector> = {
  title: "Atoms/QuantitySelector",
  component: QuantitySelector,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Selector de cantidad con botones de 44 px y valor anunciado (`aria-live`). Con `max` se bloquea " +
          "al llegar al stock; con `itemLabel` los botones dicen de qué artículo se trata (carrito con varias líneas).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

function Controlled(props: Partial<React.ComponentProps<typeof QuantitySelector>>) {
  const [value, setValue] = useState(props.value ?? 1);
  return <QuantitySelector {...props} value={value} onChange={setValue} />;
}

export const Default: Story = { render: () => <Controlled value={1} /> };

export const WithStockLimit: Story = {
  name: "Con límite de stock (max)",
  render: () => <Controlled value={2} max={3} />,
};

export const WithItemLabel: Story = {
  name: "Con nombre del artículo (itemLabel)",
  render: () => <Controlled value={2} itemLabel="Miel de romero 500 g" />,
};

export const Compact: Story = {
  name: "Compacto (size=sm)",
  render: () => <Controlled value={2} size="sm" />,
};

export const Disabled: Story = { render: () => <Controlled value={2} disabled /> };
