import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Información de ayuda",
    detailed: "Aclara decisiones del usuario sin ocupar espacio fijo en la interfaz.",
  },
  render: (args) => (
    <div className="rounded-[2rem] bg-surface-alt p-6 shadow-subtle">
      <p className="mb-3 text-small text-origen-oscuro">Pasa el cursor sobre el icono.</p>
      <Tooltip {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 rounded-[2rem] bg-surface-alt p-6 shadow-subtle">
      <Tooltip size="sm" content="Tooltip pequeño" />
      <Tooltip size="md" content="Tooltip medio" />
      <Tooltip size="lg" content="Tooltip grande" detailed="Útil para contextos con mayor densidad visual." />
    </div>
  ),
};