import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Apple, Milk, Wheat, Fish } from "lucide-react";
import { CategoryCard, type CategoryCardCategory } from "./CategoryCard";

const meta: Meta<typeof CategoryCard> = {
  title: "Atoms/CategoryCard",
  component: CategoryCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

const categories: Array<{ category: CategoryCardCategory; icon: React.ReactNode }> = [
  { category: { id: "fruits", name: "Frutas y verduras", description: "Productos frescos de temporada" }, icon: <Apple className="h-6 w-6" /> },
  { category: { id: "dairy", name: "Lácteos", description: "Quesos, yogures y derivados" }, icon: <Milk className="h-6 w-6" /> },
  { category: { id: "bakery", name: "Panadería", description: "Pan y repostería artesanal" }, icon: <Wheat className="h-6 w-6" /> },
  { category: { id: "fish", name: "Pescadería", description: "Pescado y marisco fresco" }, icon: <Fish className="h-6 w-6" /> },
];

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["fruits"]);
    const toggle = (id: string) =>
      setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

    return (
      <div className="grid grid-cols-2 gap-3 p-4 bg-white max-w-2xl sm:grid-cols-4">
        {categories.map(({ category, icon }) => (
          <CategoryCard
            key={category.id}
            category={category}
            icon={icon}
            isSelected={selected.includes(category.id)}
            onSelect={toggle}
            multiple
          />
        ))}
      </div>
    );
  },
};

export const SingleSelect: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>("dairy");

    return (
      <div className="grid grid-cols-2 gap-3 p-4 bg-white max-w-2xl sm:grid-cols-4">
        {categories.map(({ category, icon }) => (
          <CategoryCard
            key={category.id}
            category={category}
            icon={icon}
            isSelected={selected === category.id}
            onSelect={setSelected}
          />
        ))}
      </div>
    );
  },
};
