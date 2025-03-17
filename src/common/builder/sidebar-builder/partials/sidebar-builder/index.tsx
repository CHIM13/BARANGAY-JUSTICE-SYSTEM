import {
  SidebarGroupLabel,
  SidebarGroup,
  SidebarMenu,
} from "@/common/components/atoms/ui/sidebar";

import SidebarItem from "../sidebar-items";
import { SidebarConfig } from "../../types";
import { memo } from "react";

export interface SidebarBuilderProps {
  config: SidebarConfig;
}

export const SidebarBuilder = memo(({ config }: SidebarBuilderProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{config.title}</SidebarGroupLabel>
      <SidebarMenu>
        {config.items.map((item, index) => (
          <SidebarItem
            key={`${item.accessorKey || item.title}-${index}`}
            {...item}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
});

SidebarBuilder.displayName = "SidebarBuilder";
