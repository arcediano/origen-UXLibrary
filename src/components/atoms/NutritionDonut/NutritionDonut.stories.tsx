import type { Meta, StoryObj } from "@storybook/react";
import { NutritionDonut } from "./NutritionDonut";

const meta: Meta<typeof NutritionDonut> = {
  title: "Atoms/NutritionDonut",
  component: NutritionDonut,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NutritionDonut>;

export const Default: Story = {
  args: {
    protein: 25,
    fat: 30,
    carbs: 45,
    centerLabel: "100g",
  },
};

export const SinDatos: Story = {
  args: {
    protein: 0,
    fat: 0,
    carbs: 0,
    centerLabel: "--",
  },
};

export const UnSoloMacro: Story = {
  args: {
    protein: 60,
    fat: 0,
    carbs: 0,
    centerLabel: "60g",
  },
};

export const PorRacion: Story = {
  args: {
    protein: 10,
    fat: 5,
    carbs: 20,
    centerLabel: "por ración",
  },
};

export const AltaEnGrasas: Story = {
  args: {
    protein: 8,
    fat: 52,
    carbs: 12,
    centerLabel: "100g",
  },
};
