import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, ThumbsUp, ImageIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "../../atoms/Button";
import { FilterSheet, type FilterSection } from "./FilterSheet";

const meta: Meta<typeof FilterSheet> = {
  title: "Molecules/FilterSheet",
  component: FilterSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FilterSheet>;

/**
 * Combina los 4 tipos de sección soportados: chips (estado, valoración),
 * rango de fechas, rango numérico y toggles booleanos.
 */
export const AllSectionTypes: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [dateFrom, setDateFrom] = React.useState("");
    const [dateTo, setDateTo] = React.useState("");
    const [minAmount, setMinAmount] = React.useState("");
    const [maxAmount, setMaxAmount] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [withResponse, setWithResponse] = React.useState(false);

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "status",
        title: "Estado",
        options: [
          { label: "Todos", value: "" },
          { label: "Pendientes", value: "pending" },
          { label: "Procesando", value: "processing" },
          { label: "Entregados", value: "delivered" },
        ],
        value: status,
        onChange: setStatus,
      },
      {
        type: "daterange",
        id: "period",
        title: "Período",
        valueFrom: dateFrom,
        valueTo: dateTo,
        onChangeFrom: setDateFrom,
        onChangeTo: setDateTo,
      },
      {
        type: "numberrange",
        id: "amount",
        title: "Importe",
        valueMin: minAmount,
        valueMax: maxAmount,
        onChangeMin: setMinAmount,
        onChangeMax: setMaxAmount,
        prefix: "€",
      },
      {
        type: "toggles",
        id: "options",
        title: "Opciones",
        options: [
          { id: "verified", label: "Verificadas", icon: CheckCircle, value: verified, onChange: setVerified },
          { id: "response", label: "Con respuesta", icon: ThumbsUp, value: withResponse, onChange: setWithResponse },
          { id: "images", label: "Con imágenes", icon: ImageIcon, value: false, onChange: () => {} },
        ],
      },
    ];

    return (
      <div className="min-h-[520px] bg-origen-nube px-4 py-6">
        <div className="mx-auto max-w-md rounded-[2rem] border border-border-subtle bg-surface-alt p-5 shadow-subtle">
          <p className="text-micro uppercase tracking-[0.18em] text-text-subtle">Mobile commerce</p>
          <h2 className="mt-2 text-h3 text-origen-bosque">FilterSheet — 4 tipos de sección</h2>
          <p className="mt-2 text-small text-text-subtle">
            Estado actual de los filtros (sin aplicar): {JSON.stringify({ status, dateFrom, dateTo, minAmount, maxAmount, verified, withResponse })}
          </p>
          <Button className="mt-4" leftIcon={<SlidersHorizontal className="h-4 w-4" aria-hidden="true" />} onClick={() => setOpen(true)}>
            Abrir filtros
          </Button>
        </div>

        <FilterSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          sections={sections}
          onClearAll={() => {
            setStatus("");
            setDateFrom("");
            setDateTo("");
            setMinAmount("");
            setMaxAmount("");
            setVerified(false);
            setWithResponse(false);
          }}
          resultCount={42}
          resultLabel="pedidos"
        />
      </div>
    );
  },
};

/**
 * Caso "Productos": solo secciones de chips (categoría, estado, stock, orden).
 */
export const ChipsOnly: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    const [category, setCategory] = React.useState("");
    const [status, setStatus] = React.useState("");

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "category",
        title: "Categoría",
        options: [
          { label: "Todas", value: "" },
          { label: "Quesos", value: "quesos" },
          { label: "Aceites", value: "aceites" },
          { label: "Mieles", value: "mieles" },
        ],
        value: category,
        onChange: setCategory,
      },
      {
        type: "chips",
        id: "status",
        title: "Estado",
        options: [
          { label: "Todos", value: "" },
          { label: "Activos", value: "active" },
          { label: "Borradores", value: "draft" },
          { label: "Sin stock", value: "out_of_stock" },
        ],
        value: status,
        onChange: setStatus,
      },
    ];

    return (
      <div className="min-h-[520px] bg-origen-nube">
        <FilterSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          sections={sections}
          onClearAll={() => {
            setCategory("");
            setStatus("");
          }}
          resultCount={128}
          resultLabel="productos"
        />
      </div>
    );
  },
};
