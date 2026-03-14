import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Search, Lock } from "lucide-react";
import { Input, InputGroup } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Correo electrónico", placeholder: "tu@email.com", type: "email" },
};

export const WithError: Story = {
  args: { label: "Email", placeholder: "tu@email.com", error: "El email no es válido" },
};

export const WithSuccess: Story = {
  args: { label: "Usuario", placeholder: "username", success: true, defaultValue: "origen_team" },
};

export const Password: Story = {
  args: { label: "Contraseña", type: "password", placeholder: "••••••••" },
};

export const WithIconAndCount: Story = {
  args: {
    label: "Descripción del producto",
    leftIcon: <Search />,
    showCharCount: true,
    maxLength: 100,
    placeholder: "Buscar...",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-white w-80">
      <Input label="Default" variant="default" placeholder="Default" leftIcon={<Mail />} />
      <Input label="Outline" variant="outline" placeholder="Outline" />
      <Input label="Filled" variant="filled" placeholder="Filled" />
      <Input label="Minimal" variant="minimal" placeholder="Minimal" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <InputGroup groupLabel="Datos personales" groupDescription="Completa tu información de contacto">
      <Input label="Nombre" placeholder="Juan" required />
      <Input label="Apellidos" placeholder="García" required />
    </InputGroup>
  ),
};
