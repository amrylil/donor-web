import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import DonationsPage from "../pages/DonationsPage";
import LocationsPage from "../pages/LocationsPage";
import LoginPage from "../pages/LoginPage";
import UsersPage from "../pages/UserPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "donations",
        element: <DonationsPage />,
      },
      {
        path: "locations",
        element: <LocationsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
