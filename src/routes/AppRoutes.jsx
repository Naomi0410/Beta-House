import { Error, Loading } from "@/components";
import { Suspense, lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  Login,
  ResetPassword,
  Register,
  ForgotPassword,
  Home,
  Properties,
} from "@/pages";
import { ProtectedUser, PublicRoutes } from "./ProtectedRoutes";
import { useStore } from "@/hooks";
import { userService } from "@/api";
import { toast } from "react-toastify";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const PageNotFound = lazy(() => import("@/components/PageNotFound"));

const AppRoutes = () => {
  const { token } = useStore();

  const routes = [
    {
      path: "/",
      name: "Root",
      element: (
        <Suspense fallback={<Loading />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/properties",
          element: (
            <Suspense fallback={<Loading />}>
              <Properties />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "authorize",
      element: (
        <Suspense fallback={<Loading />}>
          <PublicRoutes isAuth={token}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password/:userId/:token",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loading />}>
          <PageNotFound />
        </Suspense>
      ),
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
