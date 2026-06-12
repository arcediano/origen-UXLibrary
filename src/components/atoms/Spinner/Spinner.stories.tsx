import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-white">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-white">
      <Spinner variant="default" />
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <div className="rounded-lg bg-origen-bosque p-2">
        <Spinner variant="white" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Spinner size="md" variant="primary" />
      <span className="text-sm text-text-subtle">Cargando...</span>
    </div>
  ),
};
