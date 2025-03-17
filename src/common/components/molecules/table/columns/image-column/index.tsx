import { cn } from "@/common/lib/utils";
import { CellContext } from "@tanstack/react-table";
import * as LucideIcons from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/atoms/ui/tooltip";
import {
  Avatar as SchadCnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/atoms/ui/avatar";

import { Badge } from "@/common/components/atoms/ui/badge";
import { LucideIcon } from "lucide-react";

// Types
type AvatarShape = "rounded" | "square";
type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
} as const;

// Section Types
type BaseSectionProps = {
  containerClassName?: string;
  icon?: keyof typeof LucideIcons;
  iconPosition?: "left" | "right";
};

type TextSection = BaseSectionProps & {
  type?: "text";
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
};

type LinkSection = BaseSectionProps & {
  type: "link";
  label?: string;
  value: string;
  href: string;
  valueClassName?: string;
};

type BadgeSection = BaseSectionProps & {
  type: "badge";
  value: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
};

type CustomSection = BaseSectionProps & {
  type: "custom";
  component: React.ReactNode;
};

type Section = TextSection | LinkSection | BadgeSection | CustomSection;

// Avatar Types
interface AvatarItem {
  src: string;
  fallback: string;
  tooltip?: string;
  onClick?: () => void;
  component?: React.ReactNode;
}

interface ImageColumnProps extends CellContext<any, any> {
  // Single avatar props
  src?: string;
  fallback?: string;
  tooltip?: string;
  onClick?: () => void;

  // Multiple avatars props
  avatars?: AvatarItem[];
  stackLimit?: number;
  stackClassName?: string;

  // Styling props
  shape?: AvatarShape;
  size?: AvatarSize;
  className?: string;
  containerClassName?: string;

  // Additional details
  sections?: Section[];
  sectionClassName?: string;
}

const Avatar = ({
  src,
  fallback,
  className,
  shape = "rounded",
  tooltip,
  onClick,
  component,
}: {
  src: string;
  fallback: string;
  className?: string;
  shape?: AvatarShape;
  tooltip?: string;
  onClick?: () => void;
  component?: React.ReactNode;
}) => {
  const avatarElement = component || (
    <SchadCnAvatar
      className={cn(
        shape === "square" ? "rounded-md" : "rounded-full",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <AvatarImage
        src={src || "https://github.com/shadcn.png"}
        alt={fallback}
      />
      <AvatarFallback>{fallback || "CN"}</AvatarFallback>
    </SchadCnAvatar>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{avatarElement}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return avatarElement;
};

const ImageColumn = ({
  getValue,
  src,
  fallback,
  tooltip,
  onClick,
  avatars,
  stackLimit = 3,
  stackClassName,
  shape = "rounded",
  size = "md",
  className,
  containerClassName,
  sections,
  sectionClassName,
}: ImageColumnProps) => {
  const renderSection = (section: Section) => {
    const Icon: LucideIcon | null = section.icon
      ? (LucideIcons[section.icon] as LucideIcon)
      : null;

    const iconElement = Icon && <Icon size={16} className="flex-shrink-0" />;

    switch (section.type) {
      case "link":
        return (
          <div
            className={cn(
              "flex items-center gap-2",
              section.containerClassName
            )}
          >
            {section.iconPosition !== "right" && iconElement}
            {section.label && (
              <span className="text-sm font-medium text-muted-foreground">
                {section.label}:
              </span>
            )}
            <a
              href={section.href}
              className={cn(
                "text-sm text-blue-600 hover:underline",
                section.valueClassName
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {section.value}
            </a>
            {section.iconPosition === "right" && iconElement}
          </div>
        );

      case "badge":
        return (
          <div
            className={cn(
              "flex items-center gap-2",
              section.containerClassName
            )}
          >
            {section.iconPosition !== "right" && iconElement}
            <Badge variant={section.variant} className={section.className}>
              {section.value}
            </Badge>
            {section.iconPosition === "right" && iconElement}
          </div>
        );

      case "custom":
        return (
          <div
            className={cn(
              "flex items-center gap-2",
              section.containerClassName
            )}
          >
            {section.iconPosition !== "right" && iconElement}
            {section.component}
            {section.iconPosition === "right" && iconElement}
          </div>
        );

      default:
        return (
          <div
            className={cn(
              "flex items-center gap-2",
              section.containerClassName
            )}
          >
            {section.iconPosition !== "right" && iconElement}
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                section.labelClassName
              )}
            >
              {section.label}:
            </span>
            <span className={cn("text-sm", section.valueClassName)}>
              {section.value}
            </span>
            {section.iconPosition === "right" && iconElement}
          </div>
        );
    }
  };

  const renderAvatarStack = () => {
    if (!avatars?.length) return null;

    const visibleAvatars = avatars.slice(0, stackLimit);
    const remainingCount = avatars.length - stackLimit;

    return (
      <div className="flex items-center">
        <div className={cn("flex -space-x-4 relative", stackClassName)}>
          {visibleAvatars.map((avatar, index) => (
            <div
              key={avatar.src}
              className={cn(
                "relative",
                // Increase z-index for each subsequent avatar
                `z-[${10 + index}]`
              )}
            >
              <Avatar
                src={avatar.src}
                fallback={avatar.fallback}
                tooltip={avatar.tooltip}
                onClick={avatar.onClick}
                shape={shape}
                component={avatar.component}
                className={cn(
                  sizeClasses[size],
                  "ring-2 ring-background",
                  className
                )}
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
                // Highest z-index for the remaining count
                `z-[${10 + stackLimit}]`
              )}
            >
              <span className="text-sm font-medium">+{remainingCount}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("flex items-center gap-4", containerClassName)}>
      {avatars ? (
        renderAvatarStack()
      ) : (
        <Avatar
          src={src ?? ""}
          fallback={fallback ?? getValue()}
          tooltip={tooltip}
          onClick={onClick}
          shape={shape}
          className={cn(sizeClasses[size], className)}
        />
      )}
      {sections && sections.length > 0 && (
        <div className={cn("flex flex-col gap-2 z-20", sectionClassName)}>
          {sections.map((section, index) => (
            <div key={index + `${index + 1}`}>{renderSection(section)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageColumn;
