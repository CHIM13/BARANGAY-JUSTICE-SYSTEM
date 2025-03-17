import React from "react";
import { cn } from "@/common/lib/utils";
import { useToggleColumn } from "@/hooks/use-toggle-column";
import { useController, Control } from "react-hook-form";
import { Switch } from "@/common/components/atoms/ui/switch";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/atoms/ui/tooltip";

interface BaseToggleColumnProps {
  defaultValue?: boolean;
  onToggleOn?: () => void | Promise<void>;
  onToggleOff?: () => void | Promise<void>;
  onChange?: (value: boolean) => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "success" | "danger";
  customize?: React.ReactNode;
  // Label props
  label?: string;
  labelPosition?: "left" | "right";
  labelClassName?: string;
  info?: string;
  infoClassName?: string;
}

// Props when used with react-hook-form
interface FormToggleColumnProps extends BaseToggleColumnProps {
  control: Control<any>;
  name: string;
}

// Props when used standalone
interface StandaloneToggleColumnProps extends BaseToggleColumnProps {
  control?: never;
  name?: never;
}

type ToggleColumnProps = FormToggleColumnProps | StandaloneToggleColumnProps;

const variantStyles = {
  default: {
    checked: "data-[state=checked]:bg-primary",
  },
  success: {
    checked: "data-[state=checked]:bg-green-500",
  },
  danger: {
    checked: "data-[state=checked]:bg-red-500",
  },
} as const;

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

const ToggleColumn = ({
  defaultValue,
  onToggleOn,
  onToggleOff,
  onChange,
  disabled,
  className,
  variant = "default",
  customize,
  control,
  name,
  // Label props
  label,
  labelPosition = "right",
  labelClassName,
  info,
  infoClassName,
}: ToggleColumnProps) => {
  const {
    value: standaloneValue,
    setValue: setStandaloneValue,
    isLoading,
  } = useToggleColumn({
    defaultValue,
    onToggleOn,
    onToggleOff,
    onChange,
  });

  // Only use the form controller if both control and name are provided
  const isFormMode = Boolean(control && name);
  const formField = isFormMode
    ? useController({
        name: name as string,
        control: control as Control<any>,
        defaultValue,
      }).field
    : null;

  const value = isFormMode ? formField?.value : standaloneValue;
  const handleChange = isFormMode
    ? (newValue: boolean) => {
        void (async () => {
          if (onToggleOn && newValue) await onToggleOn();
          if (onToggleOff && !newValue) await onToggleOff();
          formField?.onChange(newValue);
          await onChange?.(newValue);
        })();
      }
    : setStandaloneValue;

  const toggleElement = customize ? (
    React.cloneElement(customize as React.ReactElement, {
      checked: value,
      onCheckedChange: handleChange,
      disabled: disabled || isLoading,
    })
  ) : (
    <Switch
      checked={value}
      onCheckedChange={handleChange}
      disabled={disabled || isLoading}
      className={cn(
        variantStyles[variant].checked,
        disabled && "cursor-not-allowed",
        className
      )}
    />
  );

  // If no label, return just the toggle
  if (!label && !info) {
    return toggleElement;
  }

  const labelElement = (
    <div className="flex items-center gap-1.5 min-w-0">
      <span className={cn("text-sm", disabled && "opacity-50", labelClassName)}>
        {label}
      </span>
      {info && <InfoIcon info={info} className={infoClassName} />}
    </div>
  );

  return (
    <div className="inline-flex items-center gap-2">
      {labelPosition === "left" && label && labelElement}
      {toggleElement}
      {labelPosition === "right" && label && labelElement}
      {!label && info && <InfoIcon info={info} className={infoClassName} />}
    </div>
  );
};

// Export types for external use
export type { ToggleColumnProps, BaseToggleColumnProps };

export default ToggleColumn;
