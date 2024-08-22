import LoginPage from "../layouts/authLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import {
  SalesRepOverview,
  TransactionHistory,
} from "../pages/dashboard/salesRep";
import { CustomersHistory } from "../pages/dashboard/salesRep/customers";
import { TransactionDetailsOverview } from "../pages/dashboard/salesRep/transactionHistory/transaction-detail";
import { CustomerDetailsOverview } from "../pages/dashboard/salesRep/customers/customers-detail";
import { SupplyHistory } from "../pages/dashboard/salesRep/suppliers";

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
        element: <CustomersHistory />,
        index: true,
        path: "customers",
      },
      {
        element: <CustomerDetailsOverview />,
        path: "customers/customers-detail",
      },
      {
        element: <SupplyHistory />,
        index: true,
        path: "suppliers",
      },
      {
        element: <div>Supply History</div>,
        index: true,
        path: "supply-history",
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
        element: <CustomersHistory />,
        path: "customers",
      },
      {
        elements: <CustomerDetailsOverview />,
        path: "customers/customers-detail",
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
