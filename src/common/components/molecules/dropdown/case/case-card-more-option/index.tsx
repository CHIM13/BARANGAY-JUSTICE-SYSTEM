// CaseCardMoreOption.tsx
import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import UpdatePartySheet from "@/common/components/organism/sheet/case/update-party-sheet";
import { Copy, MoreVertical, Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  label?: string;
  partyType: "compliant" | "respondent";
}

const CaseCardMoreOption = ({ label, partyType }: Props) => {
  // Added state for both dropdown and sheet
  const [isUpdateSheetOpen, setIsUpdateSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handler for when Update is clicked
  const handleUpdateClick = () => {
    setIsUpdateSheetOpen(true);
    setIsDropdownOpen(false); // Close dropdown when opening sheet
  };

  // Handler for sheet open/close
  const handleSheetOpenChange = (open: boolean) => {
    setIsUpdateSheetOpen(open);
    if (!open) {
      setIsDropdownOpen(false); // Ensure dropdown is closed when sheet closes
    }
  };

  return (
    <>
      {/* Made DropdownMenu controlled */}
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleUpdateClick}>
            <Pencil className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdatePartySheet
        label={label}
        partyType={partyType}
        compliantId="123123"
        open={isUpdateSheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
};

export default CaseCardMoreOption;
