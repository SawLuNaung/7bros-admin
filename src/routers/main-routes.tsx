import { useMemo } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Layout } from "../components/Layout";
import { Drivers } from "../pages/Drivers/Dirvers";
import { CreateAccount } from "../pages/CreateAccount/CreateAccount";
import { Customers } from "../pages/Customers/Customers";
import { SetUpFees } from "../pages/SetUpFees/SetUpFees";
import { Notification } from "../pages/Notification/Notification";
import { TopUp } from "../pages/TopUp/TopUp";
import { Trip } from "../pages/Trip/Trip";
import { Maps } from "../pages/Map/Map";
import { ExtraFee } from "../pages/ExtraFee/ExtraFee";
import { TripDetails } from "../pages/Trip/TripDetails";

const useAppRouter = () => {
  return useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "drivers", element: <Drivers /> },
            { path: "create-account", element: <CreateAccount /> },
            { path: "customers", element: <Customers /> },
            { path: "setup-fees", element: <SetUpFees /> },
            { path: "notifications", element: <Notification /> },
            { path: "top-up", element: <TopUp /> },
            { path: "trip-history", element: <Trip /> },
            { path: "trip-history/details/:id", element: <TripDetails /> },
            { path: "map", element: <Maps /> },
            { path: "extra-fees", element: <ExtraFee /> },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]),
    []
  );
};

export default useAppRouter;
