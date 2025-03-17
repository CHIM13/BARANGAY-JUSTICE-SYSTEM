import { Table } from "@tanstack/react-table";
import { ActionConfig } from "../types/action.types";
import DataTableSearch from "../../actions/data-table-search-bar";
import DataTableBulkActions from "../../actions/data-table-bulk-action";
import DataTableFilter from "../../actions/data-table-filter-action";
import DataTableMoreActions from "../../actions/data-table-more-action";

interface DataTableActionProps<TData> {
  config: ActionConfig<TData>;
  table: Table<TData>;
  createAction: React.ReactNode;
}

export function DataTableAction<TData>({
  config,
  table,
  createAction,
}: Readonly<DataTableActionProps<TData>>) {
  const hasSelection =
    table.getState().rowSelection &&
    Object.keys(table.getState().rowSelection).length > 0;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-2">
        {config.search && (
          <DataTableSearch config={config.search} table={table} />
        )}
      </div>
      <div className="flex items-center gap-2">
        {hasSelection ? (
          config.bulkActions && (
            <DataTableBulkActions config={config.bulkActions} table={table} />
          )
        ) : (
          <>
            {createAction}
            {config.filter && (
              <DataTableFilter config={config.filter} table={table} />
            )}

            {config.moreActions && (
              <DataTableMoreActions config={config.moreActions} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DataTableAction;
