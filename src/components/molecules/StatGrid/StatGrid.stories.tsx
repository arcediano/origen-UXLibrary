import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingBag, TrendingUp, Users, Package } from "lucide-react";
import { StatGrid } from "./StatGrid";

const meta: Meta<typeof StatGrid> = {
  title: "Molecules/StatGrid",
  component: StatGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof StatGrid>;

const items = [
  { label: "Ingresos", value: "€4.280", icon: <TrendingUp />, variant: "hoja" as const, trend: { value: 12.4 } },
  { label: "Pedidos", value: 142, icon: <ShoppingBag />, variant: "pradera" as const, trend: { value: 4.2 } },
  { label: "Clientes nuevos", value: 38, icon: <Users />, variant: "bosque" as const },
  { label: "Stock bajo", value: 5, icon: <Package />, variant: "mandarina" as const, trend: { value: -2 } },
];

export const TwoColumns: Story = {
  args: {
    items: items.slice(0, 2),
    columns: 2,
    periodLabel: "Mes actual",
  },
};

export const FourColumns: Story = {
  args: {
    items,
    columns: 4,
    periodLabel: "Últimos 30 días",
  },
};

export const ThreeColumns: Story = {
  args: {
    items: items.slice(0, 3),
    columns: 3,
  },
};

export const Loading: Story = {
  args: {
    items,
    columns: 4,
    periodLabel: "Cargando...",
    loading: true,
  },
};
