export interface MenuItem {
  readonly name: string;
  readonly icon: React.ReactNode;
  readonly onClick: () => void;
}

export interface MenuBarProfile {
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
}
