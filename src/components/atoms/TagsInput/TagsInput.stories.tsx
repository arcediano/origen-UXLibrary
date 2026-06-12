import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TagsInput } from "./TagsInput";

const meta: Meta<typeof TagsInput> = {
  title: "Atoms/TagsInput",
  component: TagsInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagsInput>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(["Ecológico", "Km 0"]);
    return (
      <div className="p-4 bg-white max-w-md">
        <TagsInput label="Etiquetas del producto" value={tags} onChange={setTags} helperText="Pulsa Enter o coma para añadir" />
      </div>
    );
  },
};

export const WithSuggestions: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div className="p-4 bg-white max-w-md">
        <TagsInput
          label="Zonas de entrega"
          value={tags}
          onChange={setTags}
          suggestions={["Madrid Centro", "Madrid Norte", "Madrid Sur", "Alcobendas", "Pozuelo"]}
          maxTags={5}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div className="p-4 bg-white max-w-md">
        <TagsInput label="Categorías" value={tags} onChange={setTags} error="Añade al menos una categoría" required />
      </div>
    );
  },
};
