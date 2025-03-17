import { Card, CardContent } from "@/common/components/atoms/ui/card";
import { Separator } from "@/common/components/atoms/ui/separator";
import { FolderIcon } from "lucide-react";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
  title?: string;
  size?: string;
  itemCount?: number;
  onClick?: () => void;
  icon?: ReactNode;
  format?: string;
  href?: string;
}

const DocumentFolderCard = ({
  title = "Documents",
  size = "2.3 MB",
  itemCount = 100,
  icon = <FolderIcon className="w-8 h-8" />,
  format,
  onClick,
  ...props
}: Props) => {
  return (
    <Link {...props}>
      <Card className="p-2 hover:bg-accent cursor-pointer" onClick={onClick}>
        <CardContent className="flex gap-2 items-start justify-center w-full h-full flex-col p-2">
          {icon}
          <div className="flex flex-col gap-4">
            <span className="text-lg font-medium">{title}</span>
            <div className="flex gap-2">
              <span className="text-sm font-semibold text-muted-foreground">
                {size}
              </span>
              <span>
                <Separator orientation="vertical" />
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {itemCount} items
              </span>
              {format && (
                <>
                  <span>
                    <Separator orientation="vertical" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {format}
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DocumentFolderCard;
