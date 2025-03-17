import {
  TableBody,
  TableCell,
  TableRow,
} from "@/common/components/atoms/ui/table";
import { flexRender, Row } from "@tanstack/react-table";

interface DataTableBodyProps<TData> {
  readonly rows: readonly Row<TData>[];
}

function DataTableBody<TData>({ rows }: Readonly<DataTableBodyProps<TData>>) {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default DataTableBody;
