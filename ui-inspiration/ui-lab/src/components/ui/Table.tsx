"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/FormElements";
import { Button } from "@/components/ui/Button";

// --- TYPES ---
export interface Column<T> {
  key: string;
  header: string | React.ReactNode;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  idKey?: keyof T; // Key to identify unique rows
  className?: string;
  pagination?: {
    pageSize: number;
  };
  actions?: (item: T) => React.ReactNode;
}

// --- TABLE COMPONENT ---
export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  selectable = false,
  onSelectionChange,
  idKey = "id",
  className,
  pagination,
  actions,
}: TableProps<T>) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as any)[sortConfig.key];
      const bVal = (b as any)[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination
  const pageSize = pagination?.pageSize || 10;
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedData.map((item) => String(item[idKey as string]));
      const newSet = new Set(selected);
      allIds.forEach((id) => newSet.add(id));
      setSelected(newSet);
      onSelectionChange?.(Array.from(newSet));
    } else {
      const newSet = new Set(selected);
      paginatedData.forEach((item) =>
        newSet.delete(String(item[idKey as string])),
      );
      setSelected(newSet);
      onSelectionChange?.(Array.from(newSet));
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSet = new Set(selected);
    if (checked) newSet.add(id);
    else newSet.delete(id);
    setSelected(newSet);
    onSelectionChange?.(Array.from(newSet));
  };

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key && current.direction === "asc")
        return { key, direction: "desc" };
      return { key, direction: "asc" };
    });
  };

  const allPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selected.has(String(item[idKey as string])));
  const somePageSelected =
    paginatedData.some((item) => selected.has(String(item[idKey as string]))) &&
    !allPageSelected;

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="rounded-md border border-border-default bg-surface-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-subtle text-text-secondary border-b border-border-default">
              <tr>
                {selectable && (
                  <th className="h-10 px-4 w-[40px]">
                    <Checkbox
                      checked={allPageSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = somePageSelected;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "h-10 px-4 font-medium whitespace-nowrap align-middle",
                      col.sortable &&
                        "cursor-pointer hover:text-text-primary select-none",
                    )}
                    style={{ width: col.width }}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col.header}</span>
                      {col.sortable && <ArrowUpDown className="h-3 w-3" />}
                    </div>
                  </th>
                ))}
                {actions && <th className="h-10 px-4 w-[50px]"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                    }
                    className="h-24 text-center text-text-tertiary"
                  >
                    No results.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const id = String(item[idKey as string]);
                  const isSelected = selected.has(id);
                  return (
                    <tr
                      key={id}
                      className={cn(
                        "transition-colors hover:bg-surface-subtle/50 data-[state=selected]:bg-surface-subtle",
                        isSelected && "bg-surface-subtle",
                      )}
                      data-state={isSelected ? "selected" : undefined}
                    >
                      {selectable && (
                        <td className="p-4 w-[40px]">
                          <Checkbox
                            checked={isSelected}
                            onChange={(e) =>
                              handleSelectRow(id, e.target.checked)
                            }
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className="p-4 align-middle">
                          {col.cell(item)}
                        </td>
                      ))}
                      {actions && (
                        <td className="p-4 align-middle text-right">
                          {actions(item)}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-xs text-text-secondary">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Button };
