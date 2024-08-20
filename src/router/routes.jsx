import LoginPage from "../layouts/authLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import {
  SalesRepOverview,
  TransactionHistory,
} from "../pages/dashboard/salesRep";
import { TransactionDetailsOverview } from "../pages/dashboard/salesRep/transactionHistory/transaction-detail";

const authRoutes = [
  {
    path: "/",
    element: <LoginPage />,
  },
];

const dashboardRoutes = [
  {
    path: "/s",
    element: <DashboardLayout />,
    children: [
      {
        element: <SalesRepOverview />,
        index: true,
        path: "",
      },
      {
        element: <TransactionHistory />,
        path: "transactions",
      },
      {
        element: <TransactionDetailsOverview />,
        path: "transactions/transaction-detail",
      },
      {
        element: <div>Customers</div>,
        index: true,
        path: "customers",
      },
      {
        element: <div>Payments</div>,
        index: true,
        path: "payments",
      },
      {
        element: <div>Refund</div>,
        index: true,
        path: "refund",
      },
      {
        element: <div>Reports</div>,
        index: true,
        path: "report",
      },
    ],
  },
  {
    path: "/c",
    element: <DashboardLayout />,
    children: [
      { element: <div>Home</div>, index: true, path: "" },
      {
        element: <TransactionHistory />,
        path: "transactions",
      },
      {
        element: <TransactionDetailsOverview />,
        path: "transactions/transaction-detail",
      },
      {
        element: <div>Customers</div>,
        index: true,
        path: "customers",
      },
      {
        element: <div>Supliers</div>,
        index: true,
        path: "supliers",
      },
      {
        element: <div>Payments</div>,
        index: true,
        path: "payments",
      },
      {
        element: <div>Refund</div>,
        index: true,
        path: "refund",
      },
      {
        element: <div>Reports</div>,
        index: true,
        path: "report",
      },
      {
        element: <div>User management</div>,
        index: true,
        path: "manage-user",
      },
    ],
  },
];

export { authRoutes, dashboardRoutes };
