import {
  RouterProvider,
  RouterProviderProps,
  createBrowserRouter,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getRouteByRole } from "./utils/other/getRouteByRole";
import userRoutes from "./feature/user/user.routes";
import { AccountSchema } from "./feature/shared/account/interfaces/account.interface";
import useInitializeAccount from "./feature/shared/account/hooks/useInitializeAccount";
import authRoutes from "@/feature/public/auth/auth.routes.tsx";
import adminRoutes from "./feature/admin/admin.routes";

const roleMap: Record<
  AccountSchema["role"],
  ReturnType<typeof createBrowserRouter>
> = {
  user: userRoutes,
  admin: adminRoutes,
};

const App = () => {
  const { account } = useInitializeAccount();
  const [router, setRouter] =
    useState<RouterProviderProps["router"]>(authRoutes);

  useEffect(() => {
    if (account) {
      const _preferredRoute = getRouteByRole(account.role, roleMap);
      setRouter(_preferredRoute);
    }
  }, [account]);

  return <RouterProvider router={router} />;
};

export default App;
