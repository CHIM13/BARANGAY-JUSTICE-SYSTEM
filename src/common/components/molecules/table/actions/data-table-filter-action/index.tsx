import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/common/components/atoms/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { FilterConfig } from "../../data-table/types/action.types";

interface DataTableFilterProps<TData> {
  config: FilterConfig<TData>;
  table: Table<TData>;
}

export function DataTableFilter<TData>({
  config,
  table,
}: Readonly<DataTableFilterProps<TData>>) {
  if (config.hidden) return null;

  const handleFilterClick = (field: string, value: any) => {
    table.setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== field);
      return [...filtered, { id: field, value }];
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          id={config.id}
          className={config.className}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Root level options */}
        {config.field && config.options && (
          <DropdownMenuGroup>
            {config.options.map((option) => (
              <DropdownMenuItem
                key={`${String(config.field)}-${option.value}`}
                onClick={() =>
                  handleFilterClick(config.field as string, option.value)
                }
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}

        {/* Group options */}
        {config.groups && config.groups.length > 0 && (
          <>
            {config.field && config.options && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              {config.groups.map((group) => (
                <DropdownMenuSub key={group.field}>
                  <DropdownMenuSubTrigger>{group.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {group.options.map((option) => (
                      <DropdownMenuItem
                        key={`${group.field}-${option.value}`}
                        onClick={() =>
                          handleFilterClick(group.field, option.value)
                        }
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableFilter;
