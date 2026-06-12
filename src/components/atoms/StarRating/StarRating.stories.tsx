import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { StarRating } from "./StarRating";

const meta: Meta<typeof StarRating> = {
  title: "Atoms/StarRating",
  component: StarRating,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const ReadOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-4 bg-white">
      <StarRating value={4.5} readOnly size="md" showValue totalReviews={128} />
      <StarRating value={3} readOnly size="sm" />
      <StarRating value={5} readOnly size="lg" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-4 bg-white">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <StarRating key={size} value={4} readOnly size={size} />
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);
    return (
      <div className="p-4 bg-white">
        <StarRating value={value} onChange={setValue} size="lg" showValue />
      </div>
    );
  },
};
