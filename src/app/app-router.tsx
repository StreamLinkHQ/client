import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { appPaths } from "./app-paths";
import { PageLayout } from "../features/ui";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "/",
        element: <h1>hey there 1</h1>,
      },
      {
        path: appPaths.sell,
        element: <h1>hey there 2</h1>,
      },
      {
        path: appPaths.quiz,
        element: <h1>hey there 3</h1>,
      },
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
