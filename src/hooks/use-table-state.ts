// hooks/useTableState.ts
import { useState } from "react";
import { RowSelectionState, SortingState } from "@tanstack/react-table";

export function useTableState() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(10);

  return {
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
    selectedFilter,
    setSelectedFilter,
    sorting,
    setSorting,
    pageSize,
    setPageSize,
  };
}

export default useTableState;
