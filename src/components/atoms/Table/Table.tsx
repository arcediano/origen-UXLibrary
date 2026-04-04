"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, ChevronsUpDown, ChevronUp } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (item: T) => string | number;
  className?: string;
  headerClassName?: string;
  width?: string;
  hideOnMobile?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
  loadingRows?: number;
  sortable?: boolean;
  initialSortColumn?: string;
  initialSortDirection?: "asc" | "desc";
  rowClassName?: string | ((item: T) => string);
  expandable?: {
    renderExpand: (item: T) => React.ReactNode;
  };
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  className,
  emptyMessage = "No hay datos para mostrar",
  loading = false,
  loadingRows = 5,
  sortable = true,
  initialSortColumn,
  initialSortDirection = "asc",
  rowClassName,
  expandable,
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<string | undefined>(initialSortColumn);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(initialSortDirection);
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());

  const handleSort = (column: Column<T>) => {
    if (!sortable || !column.sortable) return;

    if (sortColumn === column.key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column.key);
      setSortDirection("asc");
    }
  };

  const toggleRowExpand = (rowKey: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) {
        next.delete(rowKey);
      } else {
        next.add(rowKey);
      }
      return next;
    });
  };

  const getSortIcon = (column: Column<T>) => {
    if (!sortable || !column.sortable) return null;

    if (sortColumn !== column.key) {
      return <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />;
    }

    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4 shrink-0 text-origen-pradera" aria-hidden="true" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 shrink-0 text-origen-pradera" aria-hidden="true" />
    );
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    const column = columns.find((candidate) => candidate.key === sortColumn);
    if (!column || !column.sortable || !column.sortValue) return data;

    return [...data].sort((a, b) => {
      const aValue = column.sortValue ? column.sortValue(a) : "";
      const bValue = column.sortValue ? column.sortValue(b) : "";

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString);
    });
  }, [columns, data, sortColumn, sortDirection]);

  const getRowClassName = (item: T) => {
    if (typeof rowClassName === "function") return rowClassName(item);
    return rowClassName || "";
  };

  const LoadingRow = () => (
    <tr className="animate-pulse">
      {columns.map((column) => (
        <td key={column.key} className="px-2 py-2 sm:px-4 sm:py-3">
          <div className="h-4 w-3/4 rounded bg-border" />
        </td>
      ))}
    </tr>
  );

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border-subtle bg-surface-alt shadow-lg", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full md:min-w-full">
          <thead className="border-b-2 border-origen-pradera/30 bg-origen-crema">
            <tr>
              {expandable && <th className="w-10 px-2 py-3 sm:py-4" />}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    "px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-origen-bosque sm:px-4 sm:py-4 sm:text-sm",
                    column.sortable && sortable && "cursor-pointer transition-colors hover:text-origen-pradera",
                    column.hideOnMobile && "hidden md:table-cell",
                    column.headerClassName
                  )}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex min-h-[44px] items-center">
                    <span className="truncate">{column.header}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border-subtle bg-surface-alt">
            {loading ? (
              Array.from({ length: loadingRows }).map((_, index) => <LoadingRow key={index} />)
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (expandable ? 1 : 0)} className="px-4 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-origen-crema">
                      <span className="text-lg text-origen-pradera" aria-hidden="true">
                        📦
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => {
                const rowKey = keyExtractor(item);
                const isExpanded = expandedRows.has(rowKey);

                return (
                  <React.Fragment key={rowKey}>
                    <tr
                      className={cn(
                        "transition-all duration-200",
                        index % 2 === 0 ? "bg-white" : "bg-origen-crema/5",
                        onRowClick && "cursor-pointer hover:bg-origen-crema/20",
                        isExpanded && "border-l-4 border-origen-pradera bg-origen-crema/20",
                        getRowClassName(item)
                      )}
                      onClick={() => onRowClick?.(item)}
                    >
                      {expandable && (
                        <td className="px-2 py-2 sm:py-3">
                          <button
                            type="button"
                            onClick={(event) => toggleRowExpand(rowKey, event)}
                            className={cn(
                              "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md transition-all",
                              isExpanded
                                ? "bg-origen-pradera text-white"
                                : "text-muted-foreground hover:bg-origen-pradera/10 hover:text-origen-pradera"
                            )}
                            aria-label={isExpanded ? "Contraer" : "Expandir"}
                          >
                            <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                          </button>
                        </td>
                      )}

                      {columns.map((column) => (
                        <td
                          key={`${rowKey}-${column.key}`}
                          className={cn(
                            "px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm",
                            column.hideOnMobile && "hidden md:table-cell",
                            column.className
                          )}
                        >
                          {column.accessor(item)}
                        </td>
                      ))}
                    </tr>

                    {expandable && isExpanded && (
                      <tr className="border-y-2 border-origen-pradera/20 bg-gradient-to-br from-origen-crema/20 to-white">
                        <td colSpan={columns.length + 1} className="p-3 sm:p-6">
                          <div className="text-sm sm:text-base">{expandable.renderExpand(item)}</div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}