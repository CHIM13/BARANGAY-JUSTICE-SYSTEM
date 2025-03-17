import useFetchProfile from "@/feature/shared/account/hooks/use-fetch-profile";
import { Suspense } from "react";

const HeroWidget = () => {
  const { data } = useFetchProfile();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="my-4">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold">
            Hello, {data.payload.firstName}
          </span>
          <span className="text-sm text-muted-foreground">
            How can I help you today?
          </span>
        </div>
      </div>
    </Suspense>
  );
};

export default HeroWidget;
