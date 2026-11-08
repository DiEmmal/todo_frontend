import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { LoginPage } from "../auth/login";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
