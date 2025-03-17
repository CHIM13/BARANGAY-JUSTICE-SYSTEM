import { Button } from "@/common/components/atoms/ui/button";
import { useRouteError } from "react-router-dom";
import ServerNotRespondingScreen from "../server-not-responding-screen";

interface Props {
  onReset?: () => void;
}

const ErrorScreen = ({ onReset }: Props) => {
  const error = useRouteError();

  const { name } = error as Error;

  // Conver this to switch case, create a constant for the errors
  // Add the config for under maintenance
  // Add the config for the not paid

  if (name === "ServerNotRespondingError") {
    window.localStorage.removeItem("app:credentials");
    return <ServerNotRespondingScreen />;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
      <Button onClick={() => onReset?.()}>Home</Button>
    </div>
  );
};

export default ErrorScreen;
