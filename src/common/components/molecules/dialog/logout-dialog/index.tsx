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
import { Button } from "@/common/components/atoms/ui/button";
import useLogout from "@/feature/shared/account/hooks/use-logout";

interface LogoutDialogProps {
  label: string;
  title: string;
  description: string;
}

const LogoutDialog = ({
  label,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}: LogoutDialogProps) => {
  const { logout, isPending } = useLogout();

  const handleLogout = () => {
    logout({});
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start border-none">
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={isPending}>
            {isPending ? "Logging out..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
