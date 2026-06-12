import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "Atoms/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <ToggleGroup type="single" defaultValue="leaf">
        <ToggleGroupItem value="seed">Semilla</ToggleGroupItem>
        <ToggleGroupItem value="leaf">Hoja</ToggleGroupItem>
        <ToggleGroupItem value="fruit">Fruto</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <ToggleGroup type="multiple" variant="outline" defaultValue={["eco"]}>
        <ToggleGroupItem value="eco">Ecológico</ToggleGroupItem>
        <ToggleGroupItem value="local">Km 0</ToggleGroupItem>
        <ToggleGroupItem value="seasonal">De temporada</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Segmented: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <p className="mb-2 text-sm font-medium text-origen-bosque">Tipo de zona de reparto</p>
      <ToggleGroup type="single" variant="segmented" defaultValue="local">
        <ToggleGroupItem value="local">Local</ToggleGroupItem>
        <ToggleGroupItem value="regional">Regional</ToggleGroupItem>
        <ToggleGroupItem value="nacional">Nacional</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <p className="mb-2 text-sm font-medium text-origen-bosque">Meses de disponibilidad</p>
      <ToggleGroup type="multiple" variant="pill" defaultValue={["jun", "jul", "ago"]}>
        <ToggleGroupItem value="jun">Jun</ToggleGroupItem>
        <ToggleGroupItem value="jul">Jul</ToggleGroupItem>
        <ToggleGroupItem value="ago">Ago</ToggleGroupItem>
        <ToggleGroupItem value="sep">Sep</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <ToggleGroup type="single" orientation="vertical" defaultValue="b">
        <ToggleGroupItem value="a">Opción A</ToggleGroupItem>
        <ToggleGroupItem value="b">Opción B</ToggleGroupItem>
        <ToggleGroupItem value="c">Opción C</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
