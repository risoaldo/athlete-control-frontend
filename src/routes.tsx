import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { SignIn } from "./pages/app/sign-in/sign-in";
import { AppLayout } from "./pages/layouts/app";
import { SigInLayout } from "./pages/layouts/sign-in";
import { Athletes } from "./pages/app/athletes/athletes";
import { Schools } from "./pages/app/schols/schools";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/athletes", element: <Athletes /> },
      { path: "/schools", element: <Schools /> },
    ],
  },

  {
    path: "/",
    element: <SigInLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
