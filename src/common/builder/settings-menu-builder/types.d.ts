// Base shared properties
interface BaseProperties {
  title: string;
  icon?: IconType;
  disabled?: boolean;
  className?: string;
}

// Specific item types with mutually exclusive href/onClick
interface ActionItem extends BaseProperties {
  type: "item";
  onClick: () => void;
  href?: never;
}

interface LinkItem extends BaseProperties {
  type: "link";
  href: string;
  onClick?: never;
}

interface MenuGroup {
  type: "group";
  items: Array<ActionItem | LinkItem>;
}

interface MenuSeparator {
  type: "separator";
}

interface MenuLabel {
  type: "label";
  component: React.ReactNode | ((props: any) => React.ReactElement);
  props?: Record<string, any>;
  className?: string;
}

type MenuItemConfig =
  | ActionItem
  | LinkItem
  | MenuGroup
  | MenuSeparator
  | MenuLabel;

// Helper type
type SettingsMenuHelperType = {
  createItem: (config: Omit<ActionItem, "type">) => ActionItem;
  createLink: (config: Omit<LinkItem, "type">) => LinkItem;
  createGroup: (items: Array<ActionItem | LinkItem>) => MenuGroup;
  createSeparator: () => MenuSeparator;
  createLabel: (config: {
    component: React.ReactNode | ((props: any) => React.ReactElement);
    props?: Record<string, any>;
    className?: string;
  }) => MenuLabelProps;
};
