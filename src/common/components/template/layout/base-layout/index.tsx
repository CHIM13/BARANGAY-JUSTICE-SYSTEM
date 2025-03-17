import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/common/components/atoms/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/components/atoms/ui/breadcrumb";
import { Separator } from "@/common/components/atoms/ui/separator";
import { AppSidebar } from "../../navigation/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarConfig } from "@/common/builder/sidebar-builder/types";
interface Props {
  readonly sidebarConfig: SidebarConfig;
  readonly menuConfig: MenuItemConfig[];
}

const BaseLayout = ({ sidebarConfig, menuConfig }: Props) => {
  const { pathname } = useLocation();

  const breadcrumbItems = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar sidebarConfig={sidebarConfig} menuConfig={menuConfig} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{breadcrumbItems[0]}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbItems[1]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BaseLayout;
