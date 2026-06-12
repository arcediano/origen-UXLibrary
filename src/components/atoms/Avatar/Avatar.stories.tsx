import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>OB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Avatar shape="circle" size="lg">
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
      <Avatar shape="rounded" size="lg">
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
      <Avatar shape="square" size="lg">
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="Productor" />
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://broken-url-example.test/avatar.png" alt="Productor" />
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Status: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      {(["online", "offline", "away", "busy", "verified"] as const).map((status) => (
        <Avatar key={status} size="lg" status={status}>
          <AvatarFallback>OB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const BrandInitialsFallback: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-white">
      <Avatar size="lg" bordered>
        <AvatarFallback className="bg-gradient-to-br from-origen-pradera to-origen-hoja text-white">
          OB
        </AvatarFallback>
      </Avatar>
      <p className="text-sm text-text-subtle">
        Fallback de iniciales con fondo de gradiente de marca (ver /onboarding, Paso 6 - Pagos).
      </p>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <AvatarGroup max={3} size="md">
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>GH</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>IJ</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  ),
};
