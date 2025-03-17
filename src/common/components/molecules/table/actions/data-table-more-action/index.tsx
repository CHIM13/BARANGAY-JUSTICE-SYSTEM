import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { MoreActionsConfig } from "../../data-table/types/action.types";
interface DataTableMoreActionsProps<TData> {
  config: MoreActionsConfig<TData>;
}

export function DataTableMoreActions<TData>({
  config,
}: Readonly<DataTableMoreActionsProps<TData>>) {
  if (config.hidden) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          id={config.id}
          className={config.className}
        >
          {config.trigger ?? <MoreHorizontal className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={config.placement === "left" ? "start" : "end"}
        className="w-56"
      >
        {config.actions.map((action) => {
          if (action.type === "custom") {
            return (
              <DropdownMenuItem
                key={action.id}
                disabled={action.disabled}
                hidden={action.hidden}
              >
                {action.component}
              </DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => action.onClick()}
              disabled={action.disabled}
              hidden={action.hidden}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableMoreActions;
