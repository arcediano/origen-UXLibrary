import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <Slider label="Radio de entrega (km)" defaultValue={[25]} min={0} max={100} showValue />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <Slider label="Rango de precio" defaultValue={[20, 80]} min={0} max={100} showValue formatValue={(v) => `${v} €`} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-white max-w-md">
      <Slider label="Leaf" variant="leaf" defaultValue={[40]} showValue />
      <Slider label="Forest" variant="forest" defaultValue={[60]} showValue />
      <Slider label="Accent" variant="accent" defaultValue={[80]} showValue />
    </div>
  ),
};

export const WithMarks: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <Slider
        label="Nivel de experiencia"
        defaultValue={[2]}
        min={0}
        max={4}
        step={1}
        showMarks
        marks={[
          { value: 0, label: "Inicial" },
          { value: 2, label: "Intermedio" },
          { value: 4, label: "Experto" },
        ]}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <Slider label="Deshabilitado" defaultValue={[50]} disabled showValue />
    </div>
  ),
};
