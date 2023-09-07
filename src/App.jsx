import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { authService } from "./services/auth";
import ErrorPage from "./errorPage";

import {Root} from "./routes/Root";
import {LoginPage, loginAction, loginLoader} from "./routes/Login";
import {Dashboard, DashboardLoader} from "./routes/Dashboard";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: authService.username };
    },
    errorElement:<ErrorPage />,
    Component: Root,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: DashboardLoader,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      await authService.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}




function PublicPage() {
  return <h3>Public</h3>;
}


