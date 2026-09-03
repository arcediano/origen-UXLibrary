import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterSidebarPanel, type FilterSection } from "./FilterSidebarPanel";

const meta: Meta<typeof FilterSidebarPanel> = {
  title: "Molecules/FilterSidebarPanel",
  component: FilterSidebarPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Variante de `FilterSidebar` para listados de gestión (`origen-dashboard`/`origen-admin`): mantiene el acabado visual de columna lateral fija, pero con el modelo de interacción de `FilterPanel` — cada cambio queda en un draft local hasta pulsar \"Aplicar filtros\". A diferencia de `FilterPanel` (que resincroniza el draft solo al reabrirse), este componente resincroniza automáticamente si el estado aplicado cambia por una vía externa (p. ej. se quita un chip en `ActiveFilterChips`). Renderizar solo en `lg:block` — en móvil/tablet usar las mismas `sections` dentro de `FilterPanel` (bottom sheet, mismo modelo de draft + Aplicar).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterSidebarPanel>;

/**
 * Caso de uso real: filtros de pedidos de un panel de gestión (fecha, estado,
 * importe) — mismos tres campos combinables que `OrderFilters.tsx` en
 * `origen-dashboard`. Los cambios se acumulan en el draft y solo llegan al
 * consumidor (contador de resultados incluido, en una app real) al pulsar
 * "Aplicar filtros".
 */
export const OrdersManagementFilters: Story = {
  render: () => {
    const [status, setStatus] = React.useState("");
    const [dateFrom, setDateFrom] = React.useState("");
    const [dateTo, setDateTo] = React.useState("");
    const [minAmount, setMinAmount] = React.useState("");
    const [maxAmount, setMaxAmount] = React.useState("");

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "status",
        title: "Estado",
        options: [
          { label: "Todos", value: "" },
          { label: "Pendiente", value: "pending" },
          { label: "Enviado", value: "shipped" },
          { label: "Entregado", value: "delivered" },
          { label: "Cancelado", value: "cancelled" },
        ],
        value: status,
        onChange: setStatus,
      },
      {
        type: "daterange",
        id: "range",
        title: "Fecha del pedido",
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
    ];

    return (
      <div className="grid grid-cols-[280px_1fr] gap-6 max-w-4xl">
        <FilterSidebarPanel
          sections={sections}
          resultCount={36}
          resultLabel="pedidos"
          onClearAll={() => {
            setStatus("");
            setDateFrom("");
            setDateTo("");
            setMinAmount("");
            setMaxAmount("");
          }}
        />
        <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-text-subtle">
          Área de contenido (tabla de pedidos)
        </div>
      </div>
    );
  },
};

/** Estado sin filtros activos — botón "Limpiar filtros" deshabilitado, botón "Aplicar filtros" siempre disponible. */
export const Empty: Story = {
  render: () => {
    const [status, setStatus] = React.useState("");

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "status",
        title: "Estado",
        options: [
          { label: "Todos", value: "" },
          { label: "Pendiente", value: "pending" },
          { label: "Entregado", value: "delivered" },
        ],
        value: status,
        onChange: setStatus,
      },
    ];

    return (
      <div className="max-w-xs">
        <FilterSidebarPanel sections={sections} resultCount={120} resultLabel="pedidos" onClearAll={() => setStatus("")} />
      </div>
    );
  },
};

/**
 * Cambio pendiente sin aplicar: seleccionar un chip habilita "Limpiar
 * filtros" de inmediato (hay algo que limpiar en el draft), pero el
 * contador de resultados y el estado real no cambian hasta pulsar "Aplicar
 * filtros" — a diferencia de `FilterSidebar`, que aplicaría el chip al
 * instante.
 */
export const PendingDraft: Story = {
  render: () => {
    const [status, setStatus] = React.useState("");
    const [applyCount, setApplyCount] = React.useState(0);

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "status",
        title: "Estado",
        options: [
          { label: "Todos", value: "" },
          { label: "Pendiente", value: "pending" },
          { label: "Entregado", value: "delivered" },
        ],
        value: status,
        onChange: (v) => {
          setStatus(v);
          setApplyCount((c) => c + 1);
        },
      },
    ];

    return (
      <div className="max-w-xs space-y-3">
        <p className="text-xs text-text-subtle">
          Aplicado: <strong>{applyCount}</strong> vez/veces — status actual aplicado: <strong>{status || "(ninguno)"}</strong>
        </p>
        <FilterSidebarPanel sections={sections} resultCount={120} resultLabel="pedidos" onClearAll={() => setStatus("")} />
      </div>
    );
  },
};
