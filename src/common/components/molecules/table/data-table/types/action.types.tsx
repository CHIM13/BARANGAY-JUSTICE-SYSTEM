import { ReactNode } from "react";

// Basic Types
export type DefaultActionType = "button";

// Action Types
interface BaseActionProps {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

// Search Types
export type SearchConfig = {
  id?: string;
  placeholder?: string;
  className?: string;
  hidden?: boolean;
  onChange?: (value: string) => void;
};

// Filter Types
export type FilterOptionItem = {
  label: string;
  value: any;
};

export type FilterField = {
  field: string;
  label: string;
  options: FilterOptionItem[];
};

export type FilterConfig<T> = {
  id?: string;
  className?: string;
  hidden?: boolean;
  field?: keyof T;
  options?: FilterOptionItem[];
  groups?: FilterField[];
  onChange?: (field: keyof T | string, value: any) => void;
};

// More Actions

export interface DefaultAction<T> extends BaseActionProps {
  type: DefaultActionType;
  variant?: "default" | "destructive" | "outline";
  onClick: (data?: T[]) => void | Promise<void>;
}

export interface CustomAction extends BaseActionProps {
  type: "custom";
  component: ReactNode;
}

export type MoreAction<T> = DefaultAction<T> | CustomAction;

// Configuration Types
export type MoreActionsConfig<T> = {
  id?: string;
  className?: string;
  hidden?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  trigger?: ReactNode;
  actions: MoreAction<T>[];
};

// Bulk Actions
export type BulkActionType =
  | "delete"
  | "update"
  | "export"
  | "archive"
  | "custom";

export type BulkActionsConfig<T> = {
  id?: string;
  className?: string;
  hidden?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  actions: BulkAction<T>[];
};

export interface BulkAction<T> {
  id: string;
  type: BulkActionType;
  label: string;
  icon?: ReactNode;
  variant?: "default" | "destructive" | "outline";
  disabled?: boolean;
  hidden?: boolean;
  component?: ReactNode;
  onClick: (selectedItems: T[]) => void | Promise<void>;
  confirmationRequired?: boolean;
  confirmationMessage?: string;
}

// Main Configuration Type
export type ActionConfig<T> = {
  search?: SearchConfig;
  filter?: FilterConfig<T>;
  moreActions?: MoreActionsConfig<T>;
  bulkActions?: BulkActionsConfig<T>;
};
