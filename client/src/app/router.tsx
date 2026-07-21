import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { PublicLayout } from "./layouts/PublicLayout";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const DashboardPage = lazy(() => import("@/features/dashboard/DashboardPage"));

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ index: true, element: <div>Landing</div> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
]);
