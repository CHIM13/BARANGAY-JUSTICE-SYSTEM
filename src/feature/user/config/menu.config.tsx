import { Settings, User } from "lucide-react";
import createSettingsMenuHelper from "@/common/builder/settings-menu-builder";
import { LogoutDialog } from "@/common/components/organism/dialog/account/logout-dialog";
import SidebarMenuProfile from "@/common/components/molecules/other/sidebar-menu-profile";

const helper = createSettingsMenuHelper();

const menuConfig = [
  helper.createLabel({
    component: <SidebarMenuProfile />,
  }),
  helper.createSeparator(),
  helper.createGroup([
    helper.createLink({
      title: "Account",
      icon: User,
      href: "/account",
    }),
    helper.createLink({
      title: "Settings",
      icon: Settings,
      href: "/settings",
    }),
  ]),
  helper.createSeparator(),
  helper.createLabel({
    component: <LogoutDialog />,
  }),
];
export default menuConfig;
