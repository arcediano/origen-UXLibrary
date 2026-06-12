import type { Meta, StoryObj } from "@storybook/react";
import { Euro, Percent } from "lucide-react";
import { InputAffixField } from "./InputAffixField";

const meta: Meta<typeof InputAffixField> = {
  title: "Atoms/InputAffixField",
  component: InputAffixField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputAffixField>;

export const Default: Story = {
  args: { label: "Precio", affixLeft: <Euro className="h-4 w-4" />, placeholder: "0,00" },
};

export const AffixRight: Story = {
  args: { label: "Descuento", affixRight: <Percent className="h-4 w-4" />, placeholder: "0" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 bg-white max-w-xs">
      <InputAffixField label="Small" inputSize="sm" affixLeft={<Euro className="h-4 w-4" />} placeholder="0,00" />
      <InputAffixField label="Medium" inputSize="md" affixLeft={<Euro className="h-4 w-4" />} placeholder="0,00" />
      <InputAffixField label="Large" inputSize="lg" affixLeft={<Euro className="h-4 w-4" />} placeholder="0,00" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Comisión",
    affixRight: <Percent className="h-4 w-4" />,
    error: "La comisión debe estar entre 0 y 100",
    required: true,
  },
};
