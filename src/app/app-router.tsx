import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { appPaths } from "./app-paths";
import { Home, Create, Profile, Explore, Join, AuthLayout } from "../features";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        path: appPaths.home,
        element: <Home />,
      },
      {
        path: appPaths.profile,
        element: <Profile />
      },
      {
        path: appPaths.create,
        element: <Create />,
      },
      {
        path: appPaths.explore,
        element: <Explore />,
      },
      {
        path: appPaths.meetingId,
        element: <Join />,
      },
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
