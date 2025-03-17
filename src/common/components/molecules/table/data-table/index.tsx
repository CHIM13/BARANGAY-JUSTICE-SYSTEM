import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { Table } from "@/common/components/atoms/ui/table";
import { useState } from "react";
import DataTableBody from "./parts/data-table-body";
import DataTableAction from "./parts/data-table-action";
import DataTablePagination from "./parts/data-table-pagination";
import { ActionConfig } from "./types/action.types";
import useTableState from "@/hooks/use-table-state";
import DataTableHeader from "./parts/data-table-header";

export interface DataTableFilterOption {
  readonly label: string;
  readonly value: string;
}

export interface DataTableProps<TData, TValue> {
  readonly columns: ColumnDef<TData, TValue>[];
  readonly data: TData[];
  readonly actions: ActionConfig<TData>;
  readonly createAction?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actions,
  createAction,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
    pageSize,
  } = useTableState();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      rowSelection,
      sorting,
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="space-y-4">
      <DataTableAction
        table={table}
        config={actions}
        createAction={createAction}
      />
      <div className="rounded-md border">
        <Table>
          <DataTableHeader headerGroups={table.getHeaderGroups()} />
          <DataTableBody rows={table.getRowModel().rows} />
        </Table>
      </div>
      <DataTablePagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
      />
    </div>
  );
}
