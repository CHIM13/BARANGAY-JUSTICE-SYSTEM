import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/atoms/ui/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { flexRender, HeaderGroup, SortDirection } from "@tanstack/react-table";

interface DataTableHeaderProps<TData> {
  readonly headerGroups: readonly HeaderGroup<TData>[];
}

const SortIcon = ({ direction }: { direction: SortDirection | false }) => {
  if (direction === "asc") return <ArrowUp className="h-4 w-4" />;
  if (direction === "desc") return <ArrowDown className="h-4 w-4" />;
  return <ArrowUpDown className="h-4 w-4" />;
};

function DataTableHeader<TData>({
  headerGroups,
}: Readonly<DataTableHeaderProps<TData>>) {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isSortable = header.column.getCanSort();
            const sortDirection = header.column.getIsSorted() as SortDirection;

            return (
              <TableHead
                key={header.id}
                onClick={
                  isSortable
                    ? header.column.getToggleSortingHandler()
                    : undefined
                }
                className={isSortable ? "cursor-pointer select-none" : ""}
              >
                {!header.isPlaceholder && (
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {isSortable && (
                      <span className="ml-2">
                        <SortIcon direction={sortDirection} />
                      </span>
                    )}
                  </div>
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default DataTableHeader;
