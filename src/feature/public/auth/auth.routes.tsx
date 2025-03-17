import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/login";
import RegisterPage from "./page/register";
import ForgotPasswordPage from "./page/forgot-password";
import NotFoundScreen from "@/common/components/atoms/helper/not-found-scren";
import ForgotPasswordCheckpointPage from "./page/forgot-password-checkpoint";
import ChangePasswordCheckpointPage from "./page/change-password";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
    children: [
      {
        path: "test",
        element: <div>test</div>,
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/forgot-password/checkpoint/:token",
    element: <ForgotPasswordCheckpointPage />,
  },
  {
    path: "/forgot-password/checkpoint/change-password/:token",
    element: <ChangePasswordCheckpointPage />,
  },
  {
    path: "*",
    element: <NotFoundScreen />,
  },
]);

export default router;
