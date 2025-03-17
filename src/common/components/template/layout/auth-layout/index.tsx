import { PropsWithChildren } from "react";
import { YStack } from "@/common/components/atoms/ui/stack";

interface Props extends PropsWithChildren {
  title: string;
  description?: string;
}

const AuthLayout = ({ children, title, description }: Props) => {
  return (
    <div className="h-screen border ">
      <div className="h-full grid grid-cols-2 gap-4">
        <div className="bg-black"></div>
        <div className="flex justify-center items-center  p-4">
          <div className="  p-4 min-w-[350px] rounded-md max-w-[500px]">
            <YStack className="gap-2 mb-8 space-y-2">
              <h1 className="text-3xl font-bold text-center">{title}</h1>
              {description && (
                <span className="text-center">{description}</span>
              )}
            </YStack>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
