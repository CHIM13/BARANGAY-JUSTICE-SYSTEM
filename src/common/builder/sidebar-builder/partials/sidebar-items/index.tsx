import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/common/components/atoms/ui/sidebar";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/atoms/ui/collapsible";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/common/lib/utils";
import { cva } from "class-variance-authority";
import {
  IconComponentProps,
  MenuLinkProps,
  SidebarItemProps,
} from "../../types";

const sidebarVariants = cva(
  "transition-colors duration-200 flex items-center gap-2 w-full rounded-md px-2 py-1.5",
  {
    variants: {
      variant: {
        default: "text-gray-900 dark:text-gray-100",
        destructive: "text-red-600 dark:text-red-400",
      },
      active: {
        true: "bg-gray-200 dark:bg-gray-900",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        active: false,
        className: "hover:bg-gray-100 dark:hover:bg-gray-800",
      },
      {
        variant: "destructive",
        active: false,
        className: "hover:bg-red-100 dark:hover:bg-red-900/30",
      },
    ],
    defaultVariants: {
      variant: "default",
      active: false,
      disabled: false,
    },
  }
);

const SidebarItem = (props: SidebarItemProps) => {
  const { pathname } = useLocation();
  const { title, icon: Icon, disabled = false, variant = "default" } = props;

  const isActive = (itemUrl: string) => {
    return pathname === itemUrl || pathname?.startsWith(itemUrl + "/");
  };

  // Handle single item type
  if (props.type === "single") {
    const active = isActive(props.href);

    return (
      <SidebarMenuItem>
        <MenuLink href={props.href} disabled={disabled}>
          <SidebarMenuButton
            tooltip={title}
            className={cn(
              sidebarVariants({
                variant,
                active,
                disabled,
              })
            )}
          >
            {Icon && (
              <IconComponent
                Icon={Icon}
                variant={variant}
                isActive={active}
                className="h-4 w-4"
              />
            )}
            <span>{title}</span>
          </SidebarMenuButton>
        </MenuLink>
      </SidebarMenuItem>
    );
  }

  // Handle group type
  return (
    <SidebarMenuItem>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={title}
            className={cn(
              sidebarVariants({
                variant,
                active: false, // Groups are never active
                disabled,
              })
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "h-4 w-4",
                  variant === "destructive" && "text-red-600 dark:text-red-400"
                )}
              />
            )}
            <span>{title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {props.subItems?.map((item) => {
              const subItemActive = isActive(item.href);

              return (
                <SidebarMenuSubItem key={item.title}>
                  <MenuLink href={item.href} disabled={item.disabled}>
                    <SidebarMenuSubButton
                      className={cn(
                        sidebarVariants({
                          variant: item.variant ?? variant,
                          active: subItemActive,
                          disabled: item.disabled,
                        })
                      )}
                    >
                      {item.icon && (
                        <IconComponent
                          Icon={item.icon}
                          variant={item.variant ?? variant}
                          isActive={subItemActive}
                          className="h-4 w-4 mr-2"
                        />
                      )}
                      {item.title}
                    </SidebarMenuSubButton>
                  </MenuLink>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

const MenuLink = ({ href, disabled, children }: MenuLinkProps) => {
  return (
    <Link
      to={disabled ? "" : href ?? ""}
      className={cn(
        "w-full",
        disabled && "pointer-events-none cursor-not-allowed"
      )}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </Link>
  );
};

const IconComponent = ({
  Icon,
  variant,
  className = "h-4 w-4",
}: IconComponentProps) => {
  return (
    <Icon
      className={cn(
        className,
        variant === "destructive" && "text-red-600 dark:text-red-400"
      )}
    />
  );
};

export default SidebarItem;
