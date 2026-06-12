import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Leaf, Sprout, Heart, ShieldCheck, Wheat, Milk } from "lucide-react";
import { SelectableCard } from "./SelectableCard";

const meta: Meta<typeof SelectableCard> = {
  title: "Atoms/SelectableCard",
  component: SelectableCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectableCard>;

export const Compact: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["eco"]);
    const toggle = (id: string) =>
      setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

    const values = [
      { id: "eco", label: "Ecológico", icon: <Leaf className="h-5 w-5" /> },
      { id: "local", label: "Km 0", icon: <Sprout className="h-5 w-5" /> },
      { id: "artisan", label: "Artesanal", icon: <Heart className="h-5 w-5" /> },
      { id: "fair", label: "Comercio justo", icon: <ShieldCheck className="h-5 w-5" /> },
    ];

    return (
      <div className="grid grid-cols-4 gap-3 p-4 bg-white max-w-lg">
        {values.map((v) => (
          <SelectableCard
            key={v.id}
            layout="compact"
            icon={v.icon}
            label={v.label}
            selected={selected.includes(v.id)}
            onSelect={() => toggle(v.id)}
          />
        ))}
      </div>
    );
  },
};

export const Detailed: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["organic"]);
    const toggle = (id: string) =>
      setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

    const certifications = [
      { id: "organic", label: "Producción ecológica", description: "Certificado por la UE", icon: <Leaf className="h-5 w-5" /> },
      { id: "iso", label: "ISO 22000", description: "Gestión de seguridad alimentaria", icon: <ShieldCheck className="h-5 w-5" /> },
    ];

    return (
      <div className="grid grid-cols-2 gap-3 p-4 bg-white max-w-2xl">
        {certifications.map((c) => (
          <SelectableCard
            key={c.id}
            layout="detailed"
            icon={c.icon}
            label={c.label}
            description={c.description}
            selected={selected.includes(c.id)}
            onSelect={() => toggle(c.id)}
          />
        ))}
      </div>
    );
  },
};

export const Tones: Story = {
  render: () => {
    const [brand, setBrand] = React.useState(true);
    const [danger, setDanger] = React.useState(true);
    const [warning, setWarning] = React.useState(true);

    return (
      <div className="grid grid-cols-3 gap-3 p-4 bg-white max-w-lg">
        <SelectableCard layout="compact" icon={<Sprout className="h-5 w-5" />} label="Marca" tone="brand" selected={brand} onSelect={() => setBrand((v) => !v)} />
        <SelectableCard layout="compact" icon={<Wheat className="h-5 w-5" />} label="Gluten" tone="danger" selected={danger} onSelect={() => setDanger((v) => !v)} />
        <SelectableCard layout="compact" icon={<Milk className="h-5 w-5" />} label="Lácteos" tone="warning" selected={warning} onSelect={() => setWarning((v) => !v)} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 p-4 bg-white max-w-md">
      <SelectableCard layout="compact" icon={<Leaf className="h-5 w-5" />} label="Disponible" />
      <SelectableCard layout="compact" icon={<Leaf className="h-5 w-5" />} label="No disponible" disabled />
    </div>
  ),
};
