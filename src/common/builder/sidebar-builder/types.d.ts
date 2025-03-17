// Base types with common properties
interface AccessorItem {
  accessorKey?: string; // Now TypeScript knows this is a string that can be split
}

interface BaseProps extends AccessorItem {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  variant?: "default" | "destructive";
}

// Type-specific props
interface SingleItemProps extends BaseProps {
  type: "single";
  href: string; // Required for single type
}

interface GroupItemProps extends BaseProps {
  type: "group";
  subItems: SubItem[]; // Required for group type
  href?: never; // Explicitly not allowed for group
}

// Combined type for the component
type SidebarItemProps = SingleItemProps | GroupItemProps;

export interface MenuLinkProps {
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface IconComponentProps {
  Icon: React.ComponentType<{ className?: string }>;
  variant?: string;
  isActive?: boolean;
  className?: string;
}

interface SidebarConfig {
  id: string;
  title: string;
  items: Array<SingleItemProps | GroupItemProps>;
}

// SubItem should also have accessorKey
interface SubItem extends BaseProps {
  href: string;
}
