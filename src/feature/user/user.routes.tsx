import { createBrowserRouter } from "react-router-dom";
import UserDashboard from "./page/dashboard";
import BaseLayout from "@/common/components/template/layout/base-layout";
import UserCaseScreen from "./page/cases";
import NotFoundScreen from "@/common/components/atoms/helper/not-found-scren";
import ErrorScreen from "@/common/components/atoms/helper/error-screen";
import sidebarConfig from "./config/sidebar.config";
import menuConfig from "./config/menu.config";
const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseLayout sidebarConfig={sidebarConfig} menuConfig={menuConfig} />
    ),
    errorElement: <ErrorScreen onReset={() => {}} />,
    children: [
      { path: "", element: <UserDashboard /> },
      { path: "cases", element: <UserCaseScreen /> },
    ],
  },

  { path: "*", element: <NotFoundScreen /> },
]);

export default userRoutes;
