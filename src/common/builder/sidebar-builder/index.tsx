import { SingleItemProps, SubItem, GroupItemProps } from "./types";

export type SidebarHelperType = {
  createSingleItem: (config: Omit<SingleItemProps, "type">) => SingleItemProps;
  createGroupItem: (
    config: Omit<GroupItemProps, "type" | "subItems"> & {
      subItems: SubItem[];
    }
  ) => GroupItemProps;
  createSection: (config: {
    id: string;
    title: string;
    items: Array<SingleItemProps | GroupItemProps>;
  }) => {
    id: string;
    title: string;
    items: Array<SingleItemProps | GroupItemProps>;
  };
};

// Memoized helper functions to prevent unnecessary re-renders
const memoizedCreateSingleItem = (
  config: Omit<SingleItemProps, "type">
): SingleItemProps => ({
  type: "single",
  ...config,
});

const memoizedCreateGroupItem = (
  config: Omit<GroupItemProps, "type" | "subItems"> & {
    subItems: SubItem[];
  }
): GroupItemProps => ({
  type: "group",
  ...config,
});

const memoizedCreateSection = (config: {
  id: string;
  title: string;
  items: Array<SingleItemProps | GroupItemProps>;
}) => config;

export function createSidebarHelper(): SidebarHelperType {
  return {
    createSingleItem: memoizedCreateSingleItem,
    createGroupItem: memoizedCreateGroupItem,
    createSection: memoizedCreateSection,
  };
}
