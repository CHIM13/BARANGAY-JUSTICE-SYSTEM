import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import { Case } from "@/feature/user/interface/case";

export const RecentCaseDataTableActionCell = memo(function ActionsCell({
  caseData,
}: {
  caseData: Case;
}) {
  const router = useNavigate();

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(caseData.id);
  }, [caseData.id]);

  const handleView = useCallback(() => {
    router(`/cases/${caseData.id}`);
  }, [router, caseData.id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopyId}>Copy case ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleView}
          className="font-semibold cursor-pointer"
        >
          <span className="font-semibold">View</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
