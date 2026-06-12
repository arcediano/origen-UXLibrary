import type { Meta, StoryObj } from "@storybook/react";
import { ProductImage } from "./ProductImage";

const meta: Meta<typeof ProductImage> = {
  title: "Atoms/ProductImage",
  component: ProductImage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductImage>;

export const Default: Story = {
  render: () => (
    <div className="h-32 w-32 overflow-hidden rounded-xl border border-border-subtle bg-surface-alt p-4">
      <ProductImage src="https://picsum.photos/200" alt="Producto de ejemplo" />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div className="h-32 w-32 overflow-hidden rounded-xl border border-border-subtle bg-surface-alt p-4">
      <ProductImage src={null} alt="Producto sin imagen" />
    </div>
  ),
};

export const BrokenSource: Story = {
  render: () => (
    <div className="h-32 w-32 overflow-hidden rounded-xl border border-border-subtle bg-surface-alt p-4">
      <ProductImage src="https://broken-url-example.test/no-existe.jpg" alt="Producto con URL inválida" />
    </div>
  ),
};
