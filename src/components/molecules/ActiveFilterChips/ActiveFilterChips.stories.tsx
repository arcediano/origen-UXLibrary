import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ActiveFilterChips, type ActiveFilterChip } from "./ActiveFilterChips";

const meta: Meta<typeof ActiveFilterChips> = {
  title: "Molecules/ActiveFilterChips",
  component: ActiveFilterChips,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ActiveFilterChips>;

export const Empty: Story = {
  args: {
    chips: [],
  },
};

export const SingleChip: Story = {
  render: () => {
    const [chips, setChips] = React.useState<ActiveFilterChip[]>([
      { id: "status", label: "Activos", onRemove: () => setChips([]) },
    ]);
    return <ActiveFilterChips chips={chips} onClearAll={() => setChips([])} />;
  },
};

export const MultipleChips: Story = {
  render: () => {
    const initial: ActiveFilterChip[] = [
      { id: "category", label: "Quesos", onRemove: () => {} },
      { id: "status", label: "Activos", onRemove: () => {} },
      { id: "stock", label: "Stock bajo", onRemove: () => {} },
      { id: "sort", label: "Más recientes", onRemove: () => {} },
    ];
    const [chips, setChips] = React.useState<ActiveFilterChip[]>(
      initial.map((c) => ({ ...c, onRemove: () => setChips((prev) => prev.filter((p) => p.id !== c.id)) })),
    );
    return (
      <div className="max-w-sm">
        <p className="mb-2 text-small text-text-subtle">
          Viewport móvil (max-w-sm): scroll horizontal sin wrap.
        </p>
        <ActiveFilterChips chips={chips} onClearAll={() => setChips([])} />
      </div>
    );
  },
};

export const DesktopWrap: Story = {
  render: () => {
    const initial: ActiveFilterChip[] = [
      { id: "category", label: "Quesos", onRemove: () => {} },
      { id: "status", label: "Activos", onRemove: () => {} },
      { id: "stock", label: "Stock bajo", onRemove: () => {} },
      { id: "sort", label: "Más recientes", onRemove: () => {} },
    ];
    const [chips, setChips] = React.useState<ActiveFilterChip[]>(
      initial.map((c) => ({ ...c, onRemove: () => setChips((prev) => prev.filter((p) => p.id !== c.id)) })),
    );
    return (
      <div className="w-[1024px]">
        <p className="mb-2 text-small text-text-subtle">
          Viewport desktop (1024px): los chips hacen wrap en varias líneas.
        </p>
        <ActiveFilterChips chips={chips} onClearAll={() => setChips([])} />
      </div>
    );
  },
};
