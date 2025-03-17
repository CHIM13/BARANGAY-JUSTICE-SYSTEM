import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import { cn } from "@/common/lib/utils";
import { Link } from "react-router-dom";

interface SettingsMenuBuilderProps {
  trigger: React.ReactNode;
  items: MenuItemConfig[];
  side?: "bottom" | "right";
  align?: "start" | "center" | "end";
  className?: string;
}

const SettingsMenuBuilder = ({
  trigger,
  items,
  side = "bottom",
  align = "end",
  className,
}: SettingsMenuBuilderProps) => {
  const renderMenuItem = (item: ActionItem | LinkItem) => {
    const commonProps = {
      key: item.title,
      disabled: item.disabled,
      className: cn("flex items-center", item.className),
    };

    const content = (
      <>
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        {item.title}
      </>
    );

    if (item.type === "link") {
      return (
        <DropdownMenuItem {...commonProps} asChild>
          <Link to={item.href}>{content}</Link>
        </DropdownMenuItem>
      );
    }

    return (
      <DropdownMenuItem {...commonProps} onClick={item.onClick}>
        {content}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
          className
        )}
        side={side}
        align={align}
        sideOffset={4}
      >
        {items.map((item, index) => {
          switch (item.type) {
            case "item":
            case "link":
              return renderMenuItem(item);

            case "group":
              return (
                <DropdownMenuGroup key={`group-${index + 1}`}>
                  {item.items.map(renderMenuItem)}
                </DropdownMenuGroup>
              );

            case "separator":
              return <DropdownMenuSeparator key={`separator-${index + 1}`} />;

            case "label":
              return (
                <DropdownMenuLabel
                  key={`label-${index + 1}`}
                  className={cn("p-0 font-normal", item.className)}
                >
                  {typeof item.component === "function"
                    ? item.component(item.props)
                    : item.component}
                </DropdownMenuLabel>
              );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenuBuilder;
