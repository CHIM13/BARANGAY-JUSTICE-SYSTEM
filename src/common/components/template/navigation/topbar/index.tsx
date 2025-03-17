import AvatarMenu, {
  AvatarMenuGroupType,
} from "@/common/components/molecules/avatar/AvatarMenu";
import { XStack } from "../../../atoms/ui/stack";
import ThemeToggle from "@/common/components/molecules/dropdown/other/theme-toggle";

interface TopbarProps {
  children?: React.ReactNode;
  menuGroups: AvatarMenuGroupType[];
}

const Topbar = ({ children, menuGroups, ...props }: TopbarProps) => {
  return (
    <header className="fixed z-50 w-full flex justify-between items-center px-4 py-2 bg-background border-b h-16">
      <XStack className="space-x-2 items-center">
        <div className="text-lg font-bold">Logo</div>
      </XStack>

      <nav className="flex space-x-2 ">
        <div className="mx-4 space-x-2">{children}</div>
        <div className="flex space-x-4 items-center">
          <AvatarMenu menuGroups={menuGroups} {...props} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
