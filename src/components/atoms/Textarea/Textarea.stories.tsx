import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "Descripción", placeholder: "Cuéntanos sobre tu negocio..." },
};

export const WithCharCount: Story = {
  args: {
    label: "Descripción",
    placeholder: "Mínimo 50 caracteres...",
    showCharCount: true,
    maxLength: 500,
    helperText: "Describe tu filosofía de producción",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white max-w-md">
      <Textarea label="Default" variant="default" placeholder="Default" />
      <Textarea label="Outline" variant="outline" placeholder="Outline" />
      <Textarea label="Filled" variant="filled" placeholder="Filled" />
      <Textarea label="Minimal" variant="minimal" placeholder="Minimal" />
    </div>
  ),
};

export const Success: Story = {
  args: { label: "Descripción", success: true, defaultValue: "Productos de cercanía cultivados con métodos sostenibles." },
};

export const WithError: Story = {
  args: { label: "Descripción", error: "La descripción debe tener al menos 50 caracteres" },
};

export const Loading: Story = {
  args: { label: "Descripción", loading: true, defaultValue: "Generando descripción..." },
};
