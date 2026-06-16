import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Grid3x3, List } from "lucide-react";
import { FilterToolbar } from "./FilterToolbar";
import { cn } from "../../../lib/utils";

const meta: Meta<typeof FilterToolbar> = {
  title: "Molecules/FilterToolbar",
  component: FilterToolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FilterToolbar>;

export const Default: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");
    return (
      <FilterToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nombre o SKU..."
        activeFilterCount={0}
        onOpenFilters={() => alert("Abrir FilterSheet")}
      />
    );
  },
};

export const WithActiveFilters: Story = {
  render: () => {
    const [search, setSearch] = React.useState("queso");
    return (
      <FilterToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nombre o SKU..."
        activeFilterCount={3}
        onOpenFilters={() => alert("Abrir FilterSheet")}
      />
    );
  },
};

export const WithViewModeActions: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");

    return (
      <FilterToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nombre o SKU..."
        activeFilterCount={1}
        onOpenFilters={() => alert("Abrir FilterSheet")}
        actions={
          <div className="hidden lg:flex items-center gap-0.5 border border-border rounded-xl p-0.5 bg-surface-alt h-10">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === "list" ? "bg-surface shadow-sm text-origen-bosque" : "text-text-subtle hover:text-origen-bosque",
              )}
              aria-label="Vista tabla"
              aria-pressed={viewMode === "list"}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === "grid" ? "bg-surface shadow-sm text-origen-bosque" : "text-text-subtle hover:text-origen-bosque",
              )}
              aria-label="Vista cuadrícula"
              aria-pressed={viewMode === "grid"}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        }
      />
    );
  },
};

export const WithoutFiltersButton: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");
    return (
      <FilterToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar..."
      />
    );
  },
};

export const MobileViewport: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    const [search, setSearch] = React.useState("");
    return (
      <div className="max-w-[375px]">
        <FilterToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar pedido o cliente..."
          activeFilterCount={2}
          onOpenFilters={() => alert("Abrir FilterSheet")}
        />
      </div>
    );
  },
};
