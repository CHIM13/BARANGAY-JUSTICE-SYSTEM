import {
  AvatarFallback,
  AvatarImage,
  Avatar,
} from "@/common/components/atoms/ui/avatar";
import { SidebarMenuButton } from "@/common/components/atoms/ui/sidebar";
import useFetchProfile from "@/feature/shared/account/hooks/use-fetch-profile";

const SidebarMenuProfile = () => {
  const { payload } = useFetchProfile().data;

  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={""} alt={"user"} />
        <AvatarFallback className="rounded-lg">
          {payload.firstName.charAt(0)}
          {payload.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          {payload.firstName} {payload.lastName}
        </span>
        <span className="truncate text-xs">{payload.email}</span>
      </div>
    </SidebarMenuButton>
  );
};

export default SidebarMenuProfile;
