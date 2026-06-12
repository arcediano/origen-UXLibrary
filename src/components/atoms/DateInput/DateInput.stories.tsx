import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DateInput, DateRangeInput } from "./DateInput";

const meta: Meta<typeof DateInput> = {
  title: "Atoms/DateInput",
  component: DateInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: { label: "Fecha de nacimiento" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 bg-white max-w-xs">
      <DateInput label="Small" inputSize="sm" />
      <DateInput label="Medium" inputSize="md" />
      <DateInput label="Large" inputSize="lg" />
    </div>
  ),
};

export const WithError: Story = {
  args: { label: "Fecha de caducidad", error: "La fecha no puede ser anterior a hoy" },
};

export const Disabled: Story = {
  args: { label: "Fecha de alta", disabled: true, value: "2026-01-01" },
};

export const Range: Story = {
  render: () => {
    const [from, setFrom] = React.useState("2026-06-01");
    const [to, setTo] = React.useState("2026-06-30");
    return (
      <div className="p-4 bg-white max-w-md">
        <DateRangeInput
          labelFrom="Desde"
          labelTo="Hasta"
          valueFrom={from}
          valueTo={to}
          onChangeFrom={setFrom}
          onChangeTo={setTo}
        />
      </div>
    );
  },
};
