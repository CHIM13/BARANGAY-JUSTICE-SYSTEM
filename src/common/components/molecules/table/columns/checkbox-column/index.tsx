import React from "react";
import { cn } from "@/common/lib/utils";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";
import { Table, Row } from "@tanstack/react-table";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/atoms/ui/tooltip";

interface BaseCheckboxProps {
  label?: string;
  labelPosition?: "left" | "right";
  labelClassName?: string;
  info?: string;
  infoClassName?: string;
  className?: string;
  disabled?: boolean;
}

interface HeaderCheckboxProps extends BaseCheckboxProps {
  table: Table<any>;
  customize?: React.ReactNode;
}

interface RowCheckboxProps extends BaseCheckboxProps {
  row: Row<any>;
  customize?: React.ReactNode;
}

const InfoIcon = ({
  info,
  className,
}: {
  info: string;
  className?: string;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle
          className={cn(
            "size-4 text-muted-foreground hover:text-foreground cursor-help",
            className
          )}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">{info}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const CheckboxContainer = ({
  children,
  label,
  labelPosition = "right",
  labelClassName,
  info,
  infoClassName,
  disabled,
  className,
}: {
  children: React.ReactNode;
} & BaseCheckboxProps) => {
  if (!label && !info) return children;

  const labelElement = label && (
    <div className="flex items-center gap-1.5">
      <span className={cn("text-sm", disabled && "opacity-50", labelClassName)}>
        {label}
      </span>
      {info && <InfoIcon info={info} className={infoClassName} />}
    </div>
  );

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {labelPosition === "left" && labelElement}
      {children}
      {labelPosition === "right" && labelElement}
      {!label && info && <InfoIcon info={info} className={infoClassName} />}
    </div>
  );
};

export const HeaderCheckbox = ({
  table,
  label,
  labelPosition,
  labelClassName,
  info,
  infoClassName,
  className,
  disabled,
  customize,
}: HeaderCheckboxProps) => {
  const checkboxElement = customize ? (
    React.cloneElement(customize as React.ReactElement, {
      checked: table.getIsAllPageRowsSelected(),
      onCheckedChange: (value: boolean) =>
        table.toggleAllPageRowsSelected(!!value),
      disabled,
      "aria-label": "Select all",
    })
  ) : (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      disabled={disabled}
      className={className}
      aria-label="Select all"
      ref={(ref) => {
        if (ref) {
          (ref as HTMLInputElement).indeterminate =
            table.getIsSomeRowsSelected();
        }
      }}
    />
  );

  return (
    <CheckboxContainer
      label={label}
      labelPosition={labelPosition}
      labelClassName={labelClassName}
      info={info}
      infoClassName={infoClassName}
      disabled={disabled}
      className={className}
    >
      {checkboxElement}
    </CheckboxContainer>
  );
};

const RowCheckbox = ({
  row,
  label,
  labelPosition,
  labelClassName,
  info,
  infoClassName,
  className,
  disabled,
  customize,
}: RowCheckboxProps) => {
  const checkboxElement = customize ? (
    React.cloneElement(customize as React.ReactElement, {
      checked: row.getIsSelected(),
      onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
      disabled,
      "aria-label": "Select row",
    })
  ) : (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      disabled={disabled}
      className={className}
      aria-label="Select row"
    />
  );

  return (
    <CheckboxContainer
      label={label}
      labelPosition={labelPosition}
      labelClassName={labelClassName}
      info={info}
      infoClassName={infoClassName}
      disabled={disabled}
      className={className}
    >
      {checkboxElement}
    </CheckboxContainer>
  );
};

export default RowCheckbox;
