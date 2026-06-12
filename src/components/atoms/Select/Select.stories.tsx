import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="p-4 bg-white max-w-xs">
        <Select label="Forma jurídica" value={value} onValueChange={setValue} placeholder="Selecciona una opción">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="autonomo">Autónomo</SelectItem>
            <SelectItem value="sl">Sociedad Limitada</SelectItem>
            <SelectItem value="cooperativa">Cooperativa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="p-4 bg-white max-w-xs">
        <Select label="Provincia" value={value} onValueChange={setValue} placeholder="Buscar provincia" searchable>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="madrid">Madrid</SelectItem>
            <SelectItem value="barcelona">Barcelona</SelectItem>
            <SelectItem value="valencia">Valencia</SelectItem>
            <SelectItem value="sevilla">Sevilla</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-xs">
      <Select label="Provincia (autodetectada)" value="madrid" disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="madrid">Madrid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-xs">
      <Select label="Tamaño de equipo" placeholder="Selecciona una opción" error="Este campo es obligatorio">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 persona</SelectItem>
          <SelectItem value="2-5">2-5 personas</SelectItem>
          <SelectItem value="6+">6 o más</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="p-4 bg-white max-w-xs">
        <Select label="Categoría" value={value} onValueChange={setValue} placeholder="Selecciona categoría">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup label="Frescos">
              <SelectItem value="frutas">Frutas y verduras</SelectItem>
              <SelectItem value="lacteos">Lácteos</SelectItem>
            </SelectGroup>
            <SelectGroup label="Despensa">
              <SelectItem value="conservas">Conservas</SelectItem>
              <SelectItem value="panaderia">Panadería</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
};
