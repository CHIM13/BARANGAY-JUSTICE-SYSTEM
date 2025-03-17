import { cn } from "@/common/lib/utils";
import { CellContext } from "@tanstack/react-table";
import { Badge } from "@/common/components/atoms/ui/badge";

const currencyList = {
  PHP: "₱",
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
} as const;

// Base types for different section types
type BaseSection = {
  containerClassName?: string;
  icon?: React.ReactNode;
  dir?: "left" | "right";
  className?: string;
};

type TextSection = BaseSection & {
  type?: "text";
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
  onClick?: (label: string) => void;
};

type LinkSection = BaseSection & {
  type: "link";
  label?: string;
  value: string;
  href: string;
  valueClassName?: string;
  onClick?: (label: string) => void;
};

type BadgeSection = BaseSection & {
  type: "badge";
  value: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  valueClassName?: string;
};

type CustomSection = BaseSection & {
  type: "custom";
  component: React.ReactNode;
};

type Section = TextSection | LinkSection | BadgeSection | CustomSection;

// List item types
type BaseListItem = {
  valueClassName?: string;
};

type TextListItem = BaseListItem & {
  type?: "text";
  label: string;
  value: string;
};

type LinkListItem = BaseListItem & {
  type: "link";
  label?: string;
  value: string;
  href: string;
};

type BadgeListItem = BaseListItem & {
  type: "badge";
  value: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
};

type ListItem = TextListItem | LinkListItem | BadgeListItem;

interface Props extends CellContext<any, any> {
  description?: string;
  currency?: keyof typeof currencyList;
  section?: Section[];
  className?: string;
}

const TextColumn = ({
  getValue,
  description,
  currency,
  section,
  className,
}: Props) => {
  const currencySymbol = currencyList[currency as keyof typeof currencyList];

  const renderValue = (item: Section | ListItem) => {
    switch (item.type) {
      case "link":
        return (
          <a
            href={item.href}
            className={cn(
              "text-sm text-blue-600 hover:underline",
              item.valueClassName
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.value}
          </a>
        );
      case "badge":
        return (
          <Badge
            variant={item.badgeVariant}
            className={cn(item.valueClassName)}
          >
            {item.value}
          </Badge>
        );
      case "custom":
        return item.component;
      default:
        if ("value" in item) {
          return (
            <span
              className={cn(
                "text-sm text-muted-foreground",
                item.valueClassName
              )}
            >
              {item.value}
            </span>
          );
        }
        return null;
    }
  };

  const renderSection = (item: Section) => {
    if (item.type === "custom") {
      return (
        <div className={cn(item.containerClassName)}>{item.component}</div>
      );
    }

    return (
      <div className={cn("", item.containerClassName)}>
        {item.type !== "badge" && "label" in item && (
          <button
            type="button"
            className={cn(
              "flex items-center gap-2",
              item.onClick && "cursor-pointer hover:text-blue-600"
            )}
            onClick={() => item.onClick?.(item.label ?? "")}
            disabled={!item.onClick}
          >
            {item.icon}
            <span
              className={cn(
                "font-bold",
                "labelClassName" in item ? item.labelClassName : ""
              )}
            >
              {item.label}:
            </span>
          </button>
        )}
        {renderValue(item)}
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span>
        {currencySymbol ? `${currencySymbol} ${getValue()}` : getValue()}
      </span>
      {description && (
        <span className="text-sm text-muted-foreground">{description}</span>
      )}

      {section && (
        <div className="flex flex-col gap-2">
          {section.map((item, index) => (
            <div key={index + `${index + 1}`}>{renderSection(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextColumn;
