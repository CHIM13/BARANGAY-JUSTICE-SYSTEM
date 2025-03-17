import { ActionConfig } from "@/common/components/molecules/table/data-table/types/action.types";

// Default handlers for bulk actions
const defaultBulkActionHandlers = {
  delete: <T,>(items: T[]) => {
    console.log("Deleting items:", items);
  },
  update: <T,>(items: T[]) => {
    console.log("Updating items:", items);
  },
  export: <T,>(items: T[]) => {
    console.log("Exporting items:", items);
  },
  archive: <T,>(items: T[]) => {
    console.log("Archiving items:", items);
  },
  custom: <T,>(items: T[]) => {
    console.log("Custom action on items:", items);
  },
};

const actionBuilder = <T,>(config: ActionConfig<T>): ActionConfig<T> => {
  return {
    // Global search configuration
    search: config.search
      ? {
          id: config.search.id ?? "global-search",
          placeholder: config.search.placeholder ?? "Search in all columns...",
          className: config.search.className,
          hidden: config.search.hidden,
          onChange: config.search.onChange,
        }
      : undefined,

    // Filter configuration
    filter: config.filter
      ? {
          id: config.filter.id ?? "data-filter",
          className: config.filter.className,
          hidden: config.filter.hidden,
          field: config.filter.field,
          options: config.filter.options,
          groups: config.filter.groups,
          onChange: config.filter.onChange,
        }
      : undefined,

    // More actions configuration
    moreActions: config.moreActions
      ? {
          id: config.moreActions.id ?? "more-actions",
          className: config.moreActions.className,
          hidden: config.moreActions.hidden,
          placement: config.moreActions.placement ?? "bottom",
          trigger: config.moreActions.trigger,
          actions: config.moreActions.actions.map((action) => ({
            ...action,
            variant: (action as any).variant ?? "default",
          })),
        }
      : undefined,

    // Bulk actions configuration
    bulkActions: config.bulkActions
      ? {
          id: config.bulkActions.id ?? "bulk-actions",
          className: config.bulkActions.className,
          hidden: config.bulkActions.hidden,
          placement: config.bulkActions.placement ?? "top",
          actions: config.bulkActions.actions.map((action) => ({
            ...action,
            variant: action.variant ?? "default",
            onClick: action.onClick ?? defaultBulkActionHandlers[action.type],
          })),
        }
      : undefined,
  };
};

export default actionBuilder;
