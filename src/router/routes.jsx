import LoginPage from "../layouts/authLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import {
  SalesRepOverview,
  TransactionHistory,
} from "../pages/dashboard/salesRep";
import { InitiateTransaction } from "../pages/dashboard/salesRep/initiateTransaction";
import { SupplyHistory } from "../pages/dashboard/salesRep/supplyHistory";
import { EditTransaction } from "../pages/dashboard/salesRep/transactionHistory/edit";
import { TransactionDetailsOverview } from "../pages/dashboard/salesRep/transactionHistory/transaction-detail";

const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const dashboardRoutes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        element: <SalesRepOverview />,
        index: true,
        path: "dashboard",
      },
      {
        element: <TransactionHistory />,
        path: "transactions",
      },
      {
        element: <TransactionDetailsOverview />,
        path: "transactions/:id",
      },
      {
        element: <EditTransaction />,
        path: "transactions/:id/edit",
      },
      {
        element: <div>Customers</div>,
        index: true,
        path: "customers",
      },
      {
        element: <div>Suppliers</div>,
        index: true,
        path: "suppliers",
      },
      {
        element: <SupplyHistory />,
        index: true,
        path: "supply-history",
      },
      {
        element: <div>Ledger</div>,
        index: true,
        path: "ledger/:team",
      },
      {
        element: <div>Payments</div>,
        index: true,
        path: "payments",
      },
      {
        element: <div>Refund History</div>,
        index: true,
        path: "refund-history",
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
      {
        element: <InitiateTransaction />,
        index: true,
        path: "initiate-transaction",
      },
    ],
  },
];

export { authRoutes, dashboardRoutes };
