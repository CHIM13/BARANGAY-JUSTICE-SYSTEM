import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../atoms/ui/avatar";

interface BaseMenuItem {
  label: string;
  shortcut?: string;
  disabled?: boolean;
}

interface ClickableMenuItem extends BaseMenuItem {
  onClick?: () => void;
  href?: string;
  component?: never;
}

interface CustomMenuItem extends BaseMenuItem {
  component: React.ReactNode;
  onClick?: never;
  href?: never;
}

type MenuItemType = ClickableMenuItem | CustomMenuItem;

export interface AvatarMenuGroupType {
  label?: string;
  items: MenuItemType[];
}

export interface AvatarMenuProps {
  avatarSrc?: string;
  avatarFallback?: string;
  menuGroups: AvatarMenuGroupType[];
}

const AvatarMenu = ({
  avatarSrc = "https://github.com/shadcn.png",
  avatarFallback = "CN",
  menuGroups,
}: AvatarMenuProps) => {
  const renderMenuItem = (item: MenuItemType) => {
    if ("component" in item && item.component) {
      return (
        <div key={item.label} className="">
          {item.component}
        </div>
      );
    }

    const menuItem = (
      <DropdownMenuItem
        key={item.label}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        {item.label}
        {item.shortcut && (
          <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
        )}
      </DropdownMenuItem>
    );

    if (item.href) {
      return (
        <Link to={item.href} key={item.label}>
          {menuItem}
        </Link>
      );
    }

    return menuItem;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar src={avatarSrc} fallback={avatarFallback} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" side="bottom">
        {menuGroups.map((group, groupIndex) => (
          <React.Fragment key={group.label ?? groupIndex}>
            {group.label && (
              <>
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              {group.items.map((item) => renderMenuItem(item))}
            </DropdownMenuGroup>
            {groupIndex < menuGroups.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
