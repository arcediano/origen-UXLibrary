import type { Meta, StoryObj } from "@storybook/react";
import { ReviewSummary } from "./ReviewSummary";

const meta: Meta<typeof ReviewSummary> = {
  title: "Molecules/ReviewSummary",
  component: ReviewSummary,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Resumen de valoraciones: media general (StarRating) + desglose de votos por estrella (1-5) en barras de progreso horizontales. Apilado en móvil, dos columnas en escritorio.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewSummary>;

export const Default: Story = {
  args: {
    average: 4.3,
    total: 128,
    breakdown: [
      { stars: 5, count: 80 },
      { stars: 4, count: 30 },
      { stars: 3, count: 10 },
      { stars: 2, count: 5 },
      { stars: 1, count: 3 },
    ],
  },
  render: (args) => (
    <div className="max-w-2xl rounded-2xl border border-border bg-surface-alt p-6 shadow-origen">
      <ReviewSummary {...args} />
    </div>
  ),
};

export const SinReseñas: Story = {
  args: {
    average: 0,
    total: 0,
    breakdown: [],
  },
  render: (args) => (
    <div className="max-w-2xl rounded-2xl border border-border bg-surface-alt p-6 shadow-origen">
      <ReviewSummary {...args} />
    </div>
  ),
};

export const SoloPositivas: Story = {
  args: {
    average: 4.9,
    total: 42,
    breakdown: [
      { stars: 5, count: 40 },
      { stars: 4, count: 2 },
    ],
  },
  render: (args) => (
    <div className="max-w-2xl rounded-2xl border border-border bg-surface-alt p-6 shadow-origen">
      <ReviewSummary {...args} />
    </div>
  ),
};
