import { Button } from "@/common/components/atoms/ui/button";
import { Table } from "@tanstack/react-table";
import { BulkActionsConfig } from "../../data-table/types/action.types";

interface DataTableBulkActionsProps<TData> {
  config: BulkActionsConfig<TData>;
  table: Table<TData>;
}

function DataTableBulkActions<TData>({
  config,
  table,
}: Readonly<DataTableBulkActionsProps<TData>>) {
  if (config.hidden) return null;

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  return (
    <div
      id={config.id}
      className={`flex items-center gap-2 ${config.className ?? ""}`}
    >
      {config.actions.map((action) =>
        action.type === "custom" ? (
          <div key={action.id}>{action.component}</div>
        ) : (
          <Button
            key={action.id}
            variant={action.variant ?? "default"}
            size="sm"
            onClick={() => {
              if (action.confirmationRequired) {
                if (
                  window.confirm(action.confirmationMessage ?? "Are you sure?")
                ) {
                  action.onClick(selectedRows);
                }
              } else {
                action.onClick(selectedRows);
              }
            }}
            disabled={action.disabled || selectedRows.length === 0}
            hidden={action.hidden}
            className="flex items-center gap-2"
          >
            {action.icon && <span>{action.icon}</span>}
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}

export default DataTableBulkActions;
