import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-lg rounded-[2rem] bg-surface-alt p-6 shadow-subtle">
      <p className="text-small text-origen-oscuro">Cabecera del bloque</p>
      <Separator className="my-4" />
      <p className="text-small text-text-subtle">Contenido secundario separado visualmente con bajo peso cromático.</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="inline-flex h-16 items-center gap-4 rounded-[2rem] bg-surface-alt px-6 shadow-subtle">
      <span className="text-small text-origen-oscuro">Origen</span>
      <Separator orientation="vertical" className="h-8" />
      <span className="text-small text-text-subtle">Marketplace</span>
    </div>
  ),
};