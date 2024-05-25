import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { appPaths } from "./app-paths";
import { Home, Create, Profile, Explore } from "../features";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
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
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
