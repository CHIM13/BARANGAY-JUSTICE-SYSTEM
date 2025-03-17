import { createSidebarHelper } from "@/common/builder/sidebar-builder";
import { FileText, GitGraph } from "lucide-react";

const sidebarHelper = createSidebarHelper();

const sidebarConfig = sidebarHelper.createSection({
  id: "home",
  title: "Home",
  items: [
    {
      type: "single",
      title: "Home",
      href: "/",
      icon: GitGraph,
    },
    {
      type: "group",
      title: "My Cases",
      subItems: [
        {
          title: "My Complaints",
          href: "/cases?type=complainant",
          icon: FileText,
        },
        {
          title: "Involved Parties",
          href: "/cases?type=respondent",
          icon: FileText,
        },
      ],
    },
  ],
});

export default sidebarConfig;
