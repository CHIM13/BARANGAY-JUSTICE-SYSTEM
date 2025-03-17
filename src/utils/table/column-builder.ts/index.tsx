import RowCheckbox, {
  HeaderCheckbox,
} from "@/common/components/molecules/table/columns/checkbox-column";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Column builder function
const columnBuilder = <T extends object>(columns: ColumnDef<T>[]) => {
  const columnHelper = createColumnHelper<T>();

  return [
    // Checkbox column
    columnHelper.display({
      id: "checkbox",
      header: ({ table }) => <HeaderCheckbox table={table} />,

      cell: ({ row }) => <RowCheckbox row={row} />,
    }),
    ...columns,
  ];
};

export default columnBuilder;
