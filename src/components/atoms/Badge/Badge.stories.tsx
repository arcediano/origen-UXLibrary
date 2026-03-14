import type { Meta, StoryObj } from "@storybook/react";
import { Badge, StatusBadge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4 bg-white">
      <Badge variant="success">Activo</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="danger">Error</Badge>
      <Badge variant="info">Procesando</Badge>
      <Badge variant="neutral">Borrador</Badge>
      <Badge variant="leaf">Ecológico</Badge>
      <Badge variant="outline">Etiqueta</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4 bg-white">
      <StatusBadge status="active" />
      <StatusBadge status="inactive" />
      <StatusBadge status="out_of_stock" />
      <StatusBadge status="draft" />
      <StatusBadge status="pending" />
      <StatusBadge status="shipped" />
      <StatusBadge status="delivered" />
      <StatusBadge status="cancelled" />
      <StatusBadge status="verified" />
      <StatusBadge status="suspended" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-4 bg-white">
      <Badge size="xs" variant="success">XS</Badge>
      <Badge size="sm" variant="success">SM</Badge>
      <Badge size="md" variant="success">MD</Badge>
      <Badge size="lg" variant="success">LG</Badge>
    </div>
  ),
};
