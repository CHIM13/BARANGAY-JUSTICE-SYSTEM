import { cn } from "@/common/lib/utils";
import { CellContext } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/atoms/ui/tooltip";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

type IconSize = "sm" | "md" | "lg" | "xl";

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

type IconConfig = {
  icon: keyof typeof LucideIcons;
  label?: string;
  labelDirection?: "left" | "right";
  tooltip?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
  labelClassName?: string;
  size?: IconSize;
};

interface IconColumnProps extends CellContext<any, any> {
  // Single icon configuration
  icon?: keyof typeof LucideIcons;
  label?: string;
  labelDirection?: "left" | "right";
  size?: IconSize;

  // Interaction
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  isActive?: boolean;

  // Tooltip
  tooltip?: string;

  // Styling
  className?: string;
  labelClassName?: string;
  containerClassName?: string;

  // Custom icon
  customIcon?: React.ReactNode;

  // Multiple icons support
  icons?: IconConfig[];
}

const IconColumn = ({
  getValue,
  icon,
  label = getValue(),
  labelDirection = "right",
  size = "md",
  onClick,
  href,
  disabled = false,
  isActive = false,

  tooltip,
  className,
  labelClassName,
  containerClassName,
  customIcon,
  icons,
}: IconColumnProps) => {
  const renderIconContent = (
    iconName: keyof typeof LucideIcons,
    config: {
      size: IconSize;
      className?: string;
      isActive?: boolean;
      disabled?: boolean;
    }
  ) => {
    const Icon: LucideIcon = LucideIcons[iconName] as LucideIcon;
    return (
      <Icon
        size={iconSizes[config.size]}
        className={cn(
          // Base styles
          "transition-colors duration-200",
          // Active state
          config.isActive && "text-primary",
          // Disabled state
          config.disabled && "opacity-50 cursor-not-allowed",
          // Custom classes
          config.className
        )}
      />
    );
  };

  const renderIconWithLabel = (iconConfig: {
    icon: keyof typeof LucideIcons;
    label?: string;
    labelDirection?: "left" | "right";
    onClick?: () => void;
    href?: string;
    tooltip?: string;
    disabled?: boolean;
    isActive?: boolean;
    className?: string;
    labelClassName?: string;
    size?: IconSize;
  }) => {
    const {
      icon: iconName,
      label: iconLabel,
      labelDirection: iconLabelDirection = "right",
      onClick: iconOnClick,
      href: iconHref,
      tooltip: iconTooltip,
      disabled: iconDisabled = false,
      isActive: iconIsActive = false,
      className: iconClassName,
      labelClassName: iconLabelClassName,
      size: iconSize = size,
    } = iconConfig;

    const iconElement = (
      <div
        className={cn(
          "flex items-center gap-2",
          iconLabelDirection === "right" ? "flex-row" : "flex-row-reverse"
        )}
      >
        {renderIconContent(iconName, {
          size: iconSize,
          className: iconClassName,
          isActive: iconIsActive,
          disabled: iconDisabled,
        })}
        {iconLabel && (
          <span
            className={cn(
              "text-sm",
              iconIsActive && "text-primary",
              iconDisabled && "opacity-50",
              iconLabelClassName
            )}
          >
            {iconLabel}
          </span>
        )}
      </div>
    );

    const wrappedIcon = iconHref ? (
      <a
        href={iconHref}
        target="_blank"
        rel="noopener noreferrer"
        className={iconDisabled ? "pointer-events-none" : ""}
        onClick={iconOnClick}
      >
        {iconElement}
      </a>
    ) : (
      <button
        type="button"
        onClick={iconOnClick}
        disabled={iconDisabled}
        className={cn(
          "flex items-center",
          iconDisabled && "pointer-events-none"
        )}
      >
        {iconElement}
      </button>
    );

    if (iconTooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{wrappedIcon}</TooltipTrigger>
            <TooltipContent>{iconTooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return wrappedIcon;
  };

  return (
    <div className={cn("flex items-center gap-4", containerClassName)}>
      {customIcon && <div className="flex items-center">{customIcon}</div>}

      {icon &&
        renderIconWithLabel({
          icon,
          label,
          labelDirection,
          onClick,
          href,
          tooltip,
          disabled,
          isActive,
          className,
          labelClassName,
          size,
        })}

      {icons?.map((iconConfig) => (
        <div key={iconConfig.icon} className="flex items-center">
          {renderIconWithLabel(iconConfig)}
        </div>
      ))}
    </div>
  );
};

export default IconColumn;
