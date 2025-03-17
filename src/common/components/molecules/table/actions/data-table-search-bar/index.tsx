import { Input } from "@/common/components/atoms/ui/input";
import { Search } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { SearchConfig } from "../../data-table/types/action.types";

interface DataTableSearchProps<TData> {
  config: SearchConfig;
  table: Table<TData>;
}

export function DataTableSearch<TData>({
  config,
  table,
}: Readonly<DataTableSearchProps<TData>>) {
  if (config.hidden) return null;

  const { globalFilter } = table.getState();

  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        id={config.id}
        placeholder={config.placeholder}
        value={globalFilter ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className={`pl-8 ${config.className ?? ""}`}
      />
    </div>
  );
}

export default DataTableSearch;
