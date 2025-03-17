import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/atoms/ui/alert-dialog";
import { Button, ButtonProps } from "@/common/components/atoms/ui/button";
import useLogout from "@/feature/shared/account/hooks/use-logout";
import { LogOutIcon } from "lucide-react";
import { memo } from "react";

interface Props extends ButtonProps {
  label?: string;
}

export const LogoutDialog = memo(function LogoutDialog({ label }: Props) {
  const { logout, isPending } = useLogout();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LogOutIcon className="w-4 h-4" />
          {label ?? "Logout"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account and redirected to the login
            page. Any unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={logout}>
            {isPending ? "Logging out..." : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
