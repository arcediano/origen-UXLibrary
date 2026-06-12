import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-sm">
      <RadioGroup defaultValue="standard">
        <RadioGroupItem value="standard" label="Envío estándar" description="3-5 días laborables" />
        <RadioGroupItem value="express" label="Envío exprés" description="24-48 horas" />
        <RadioGroupItem value="pickup" label="Recogida en tienda" description="Gratis" />
      </RadioGroup>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-white max-w-sm">
      <RadioGroup defaultValue="a" variant="default">
        <RadioGroupItem value="a" variant="default" label="Default" />
        <RadioGroupItem value="b" variant="default" label="Opción B" />
      </RadioGroup>
      <RadioGroup defaultValue="a" variant="organic">
        <RadioGroupItem value="a" variant="organic" label="Orgánico" />
        <RadioGroupItem value="b" variant="organic" label="Opción B" />
      </RadioGroup>
      <RadioGroup defaultValue="a" variant="minimal">
        <RadioGroupItem value="a" variant="forest" label="Bosque" />
        <RadioGroupItem value="b" variant="accent" label="Acento" />
      </RadioGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <RadioGroup defaultValue="m" orientation="horizontal">
        <RadioGroupItem value="s" label="S" />
        <RadioGroupItem value="m" label="M" />
        <RadioGroupItem value="l" label="L" />
        <RadioGroupItem value="xl" label="XL" />
      </RadioGroup>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-sm">
      <RadioGroup>
        <RadioGroupItem value="a" label="Opción A" error />
        <RadioGroupItem value="b" label="Opción B" error />
      </RadioGroup>
    </div>
  ),
};
