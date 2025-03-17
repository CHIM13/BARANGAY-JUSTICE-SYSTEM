import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/common/components/atoms/ui/sidebar";
import { SidebarBuilder } from "@/common/builder/sidebar-builder/partials/sidebar-builder";
import { SidebarConfig } from "@/common/builder/sidebar-builder/types";
import SettingsMenuBuilder from "@/common/builder/settings-menu-builder/partials/setting-menu-builder";
import { ChevronsUpDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/atoms/ui/avatar";
import SidebarMenuProfile from "@/common/components/molecules/other/sidebar-menu-profile";

interface Props {
  readonly sidebarConfig: SidebarConfig;
  readonly menuConfig: MenuItemConfig[];
}

export function AppSidebar({ sidebarConfig, menuConfig }: Props) {
  console.log("AppSidebar", sidebarConfig);

  return (
    <Sidebar collapsible="icon" className="overflow-hidden">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarBuilder config={sidebarConfig} />
      </SidebarContent>
      <SidebarFooter>
        <SettingsMenuBuilder
          trigger={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0"
            >
              <SidebarMenuProfile />
            </SidebarMenuButton>
          }
          side="right"
          items={menuConfig}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
