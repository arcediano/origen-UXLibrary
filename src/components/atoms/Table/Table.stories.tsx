import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingBag } from "lucide-react";
import { Badge } from "../Badge";
import { Table, type Column } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Atoms/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

interface Product {
  id: string;
  name: string;
  price: number;
  status: "active" | "draft";
}

const data: Product[] = [
  { id: "1", name: "Tomates ecológicos", price: 3.5, status: "active" },
  { id: "2", name: "Aceite de oliva virgen extra", price: 12.9, status: "active" },
  { id: "3", name: "Miel de azahar", price: 8.2, status: "draft" },
];

const columns: Column<Product>[] = [
  { key: "name", header: "Producto", accessor: (item) => item.name, sortable: true },
  { key: "price", header: "Precio", accessor: (item) => `${item.price.toFixed(2)} €`, sortable: true },
  {
    key: "status",
    header: "Estado",
    accessor: (item) => (
      <Badge variant={item.status === "active" ? "success" : "neutral"} size="sm">
        {item.status === "active" ? "Activo" : "Borrador"}
      </Badge>
    ),
    hideOnMobile: true,
  },
];

export const Default: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <Table data={data} columns={columns} keyExtractor={(item) => item.id} />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <Table data={[]} columns={columns} keyExtractor={(item) => item.id} loading loadingRows={3} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <Table data={[]} columns={columns} keyExtractor={(item) => item.id} emptyMessage="No hay productos para mostrar" />
    </div>
  ),
};

export const EmptyConDescripcionYAccion: Story = {
  name: "Empty (icono + descripción + acción)",
  render: () => (
    <div className="p-4 bg-white">
      <Table
        data={[]}
        columns={columns}
        keyExtractor={(item) => item.id}
        emptyMessage="No hay pedidos recientes"
        emptyDescription="Los nuevos pedidos aparecerán aquí"
        emptyIcon={<ShoppingBag className="h-8 w-8 text-origen-pino" />}
        emptyAction={{ label: "Ver catálogo", href: "#" }}
      />
    </div>
  ),
};

export const Expandable: Story = {
  render: () => (
    <div className="p-4 bg-white">
      <Table
        data={data}
        columns={columns}
        keyExtractor={(item) => item.id}
        expandable={{
          renderExpand: (item) => (
            <p className="text-sm text-text-subtle">Detalles adicionales de {item.name}.</p>
          ),
        }}
      />
    </div>
  ),
};
