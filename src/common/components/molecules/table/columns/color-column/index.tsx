import { cn } from "@/common/lib/utils";
import { CellContext } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/atoms/ui/tooltip";

type ColorShape = "rounded" | "square";
type ColorSize = "sm" | "md" | "lg" | "xl";

const sizeClasses = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
  xl: "size-12",
} as const;

interface ColorItem {
  color: string;
  label?: string;
  tooltip?: string;
  onClick?: () => void;
  href?: string;
  customize?: React.ReactNode;
}

interface ColorColumnProps extends CellContext<any, any> {
  // Single color props
  color?: string;
  label?: string;
  labelPosition?: "left" | "right";
  tooltip?: string;
  onClick?: () => void;
  href?: string;
  customize?: React.ReactNode;

  // Multiple colors props
  colors?: ColorItem[];
  stackLimit?: number;
  stackClassName?: string;

  // Styling props
  shape?: ColorShape;
  size?: ColorSize;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const ColorSwatch = ({
  color,
  label,
  tooltip,
  onClick,
  href,
  shape = "rounded",
  size = "md",
  className,
  labelClassName,
  customize,
}: {
  color: string;
  label?: string;
  tooltip?: string;
  onClick?: () => void;
  href?: string;
  shape?: ColorShape;
  size?: ColorSize;
  className?: string;
  labelClassName?: string;
  customize?: React.ReactNode;
}) => {
  const colorElement = customize || (
    <button
      type="button"
      className={cn(
        "border border-border",
        shape === "square" ? "rounded-md" : "rounded-full",
        sizeClasses[size],
        (onClick || href) && "cursor-pointer",
        className
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
      disabled={!onClick && !href}
    />
  );

  const wrappedColor = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2"
    >
      {colorElement}
      {label && <span className={cn("text-sm", labelClassName)}>{label}</span>}
    </a>
  ) : (
    <div className="flex items-center gap-2">
      {colorElement}
      {label && (
        <button
          type="button"
          className={cn("text-sm", onClick && "cursor-pointer", labelClassName)}
          onClick={onClick}
          disabled={!onClick}
        >
          {label}
        </button>
      )}
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{wrappedColor}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return wrappedColor;
};

const ColorColumn = ({
  getValue,
  color,
  label,
  labelPosition = "right",
  tooltip,
  onClick,
  href,
  customize,
  colors,
  stackLimit = 3,
  stackClassName,
  shape = "rounded",
  size = "md",
  className,
  containerClassName,
  labelClassName,
}: ColorColumnProps) => {
  const renderColorStack = () => {
    if (!colors?.length) return null;

    const visibleColors = colors.slice(0, stackLimit);
    const remainingCount = colors.length - stackLimit;

    return (
      <div className="flex items-center">
        <div className={cn("flex -space-x-2 relative", stackClassName)}>
          {visibleColors.map((colorItem, index) => (
            <div
              key={colorItem.color}
              className={cn("relative", `z-[${10 + index}]`)}
            >
              <ColorSwatch
                color={colorItem.color}
                label={colorItem.label}
                tooltip={colorItem.tooltip}
                onClick={colorItem.onClick}
                href={colorItem.href}
                shape={shape}
                size={size}
                className={cn("ring-2 ring-background", className)}
                labelClassName={labelClassName}
                customize={colorItem.customize}
              />
            </div>
          ))}
          {remainingCount > 0 && (
            <div
              className={cn(
                "flex items-center justify-center bg-muted relative",
                sizeClasses[size],
                shape === "square" ? "rounded-md" : "rounded-full",
                "ring-2 ring-background",
                `z-[${10 + stackLimit}]`
              )}
            >
              <span className="text-xs font-medium">+{remainingCount}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const singleColor = color ?? getValue();

  return (
    <div
      className={cn(
        "flex",
        labelPosition === "right" ? "flex-row" : "flex-row-reverse",
        "items-center gap-2",
        containerClassName
      )}
    >
      {colors ? (
        renderColorStack()
      ) : (
        <ColorSwatch
          color={singleColor}
          label={label}
          tooltip={tooltip}
          onClick={onClick}
          href={href}
          shape={shape}
          size={size}
          className={className}
          labelClassName={labelClassName}
          customize={customize}
        />
      )}
    </div>
  );
};

export default ColorColumn;
