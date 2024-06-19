import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { appPaths } from "./app-paths";
import { Home, Create, Profile, Explore, Join } from "../features";
import { AuthContextProvider } from "../context";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
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
