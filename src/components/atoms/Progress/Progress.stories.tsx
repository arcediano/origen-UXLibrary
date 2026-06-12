import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white max-w-md">
      <Progress variant="seed" value={20} showLabel label="Semilla" />
      <Progress variant="sprout" value={40} showLabel label="Brote" />
      <Progress variant="leaf" value={60} showLabel label="Hoja" />
      <Progress variant="fruit" value={75} showLabel label="Fruto" />
      <Progress variant="forest" value={90} showLabel label="Bosque" />
      <Progress variant="warning" value={50} showLabel label="Atención" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white max-w-md">
      <Progress size="sm" value={50} />
      <Progress size="md" value={50} />
      <Progress size="lg" value={50} />
    </div>
  ),
};

export const StepProgress: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <Progress
        variant="leaf"
        value={3}
        max={7}
        showLabel
        label="Paso 3 de 7"
        description="Ubicación de tu negocio"
      />
    </div>
  ),
};

export const CharCount: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-white max-w-md">
      <div>
        <p className="mb-1 text-xs text-text-subtle">Descripción incompleta (28/50)</p>
        <Progress mode="char-count" value={28} threshold={50} max={500} />
      </div>
      <div>
        <p className="mb-1 text-xs text-text-subtle">Descripción completa (120/500)</p>
        <Progress mode="char-count" value={120} threshold={50} max={500} />
      </div>
    </div>
  ),
};
