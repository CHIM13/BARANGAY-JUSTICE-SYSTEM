import { cn } from "@/common/lib/utils";
import { FC, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

const XStack: FC<Props> = ({ children, ...rest }) => {
  return (
    <div {...rest} className={cn("flex flex-row", rest.className)}>
      {children}
    </div>
  );
};

const YStack: FC<Props> = ({ children, ...rest }) => {
  return (
    <div {...rest} className={cn("flex flex-col", rest.className)}>
      {children}
    </div>
  );
};

export { XStack, YStack };
