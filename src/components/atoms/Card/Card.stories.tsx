import type { Meta, StoryObj } from "@storybook/react";
import { Building2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardIconHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 p-4 bg-white sm:grid-cols-2">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Fondo surface-alt con sombra sutil.</CardDescription>
        </CardHeader>
        <CardContent>Contenido de la tarjeta.</CardContent>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Fondo blanco con sombra más pronunciada.</CardDescription>
        </CardHeader>
        <CardContent>Contenido de la tarjeta.</CardContent>
      </Card>
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
          <CardDescription>Borde de marca, fondo transparente.</CardDescription>
        </CardHeader>
        <CardContent>Contenido de la tarjeta.</CardContent>
      </Card>
      <Card variant="flat">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>Fondo pastel, sin sombra.</CardDescription>
        </CardHeader>
        <CardContent>Contenido de la tarjeta.</CardContent>
      </Card>
    </div>
  ),
};

export const Section: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-lg">
      <Card variant="section" padding="md">
        <CardIconHeader
          icon={<Building2 className="h-5 w-5" />}
          title="Identidad legal"
          description="Necesario para verificar tu cuenta"
        />
        <CardContent>
          <p className="text-sm text-text-subtle">
            Contenido de la Section Card, patrón canónico de /onboarding (ver manual de diseño, sección 9).
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const CardIconHeaderSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white max-w-lg">
      <Card variant="section" padding="md">
        <CardIconHeader icon={<Building2 className="h-5 w-5" />} title="Tamaño md" description="Cabecera tamaño medio (por defecto)" size="md" />
      </Card>
      <Card variant="section" padding="sm">
        <CardIconHeader icon={<Building2 className="h-4 w-4" />} title="Tamaño sm" description="Cabecera compacta" size="sm" />
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <Card variant="elevated" interactive>
        <CardTitle size="sm">Tarjeta interactiva</CardTitle>
        <CardDescription size="sm">Pulsa o navega con el teclado para activarla.</CardDescription>
      </Card>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-md">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Plan Premium</CardTitle>
          <CardDescription>Acceso completo a todas las funciones.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-subtle">19,99 € / mes</p>
        </CardContent>
        <CardFooter align="right">
          <button className="rounded-lg bg-origen-pradera px-4 py-2 text-sm font-medium text-white">
            Suscribirse
          </button>
        </CardFooter>
      </Card>
    </div>
  ),
};
