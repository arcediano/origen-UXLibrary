import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Leaf, MapPin, Sparkles, SunMedium } from "lucide-react";
import { ScrollChipFilter } from "./ScrollChipFilter";

const items = [
  { id: "organico", label: "Orgánico", icon: <Leaf className="h-4 w-4" aria-hidden="true" /> },
  { id: "cercano", label: "Cercano", icon: <MapPin className="h-4 w-4" aria-hidden="true" /> },
  { id: "premium", label: "Selección", icon: <Sparkles className="h-4 w-4" aria-hidden="true" /> },
  { id: "temporada", label: "Temporada", icon: <SunMedium className="h-4 w-4" aria-hidden="true" /> },
];

const meta: Meta<typeof ScrollChipFilter> = {
  title: "Mobile/ScrollChipFilter",
  component: ScrollChipFilter,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollChipFilter>;

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("");

    return (
      <div className="space-y-4 bg-origen-nube py-6">
        <ScrollChipFilter items={items} value={value} onValueChange={(next) => setValue(String(next))} hasAll />
        <div className="px-4">
          <p className="text-small text-text-subtle">Filtro activo: {value || "Todos"}</p>
        </div>
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["organico", "temporada"]);

    return (
      <div className="space-y-4 bg-origen-nube py-6">
        <ScrollChipFilter
          items={items}
          value={value}
          multiple
          onValueChange={(next) => setValue(Array.isArray(next) ? next : [])}
        />
        <div className="px-4">
          <p className="text-small text-text-subtle">Selección: {value.join(", ")}</p>
        </div>
      </div>
    );
  },
};