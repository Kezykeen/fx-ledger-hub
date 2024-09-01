import LoginPage from "../layouts/authLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import {
  SalesRepOverview,
  TransactionHistory,
} from "../pages/dashboard/salesRep";
import { InitiateTransaction } from "../pages/dashboard/salesRep/initiateTransaction";
import { SupplyHistory } from "../pages/dashboard/salesRep/supplyHistory";
import { EditTransaction } from "../pages/dashboard/salesRep/transactionHistory/edit";
import { CustomersHistory } from "../pages/dashboard/salesRep/customers";
import { TransactionDetailsOverview } from "../pages/dashboard/salesRep/transactionHistory/transaction-detail";
import { CustomerDetailsOverview } from "../pages/dashboard/salesRep/customers/customers-detail";
import { Suppliers } from "../pages/dashboard/salesRep/suppliers";
import { SupplierDetails } from "../pages/dashboard/salesRep/suppliers/details";
import { CustomerRecord } from "../pages/dashboard/salesRep/customers/components/customer-history/transcation-history";
import { RefundRecord } from "../pages/dashboard/salesRep/customers/components/customer-history/refund-history";
import { UpfrontRecord } from "../pages/dashboard/salesRep/customers/components/customer-history/upfront-history";

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
        element: <CustomersHistory />,
        index: true,
        path: "customers",
      },
      {
        // CustomerDetailsOverview as the parent route
        element: <CustomerDetailsOverview />,
        path: "customers/customers-detail",
        children: [
          {
            // Child route under CustomerDetailsOverview
            element: <CustomerRecord />,
            path: "",
          },
          {
            element: <RefundRecord />,
            path: "refund",
          },
          {
            element: <UpfrontRecord />,
            path: "upfront",
          },
        ],
      },
      {
        element: <Suppliers />,
        index: true,
        path: "suppliers",
      },
      {
        element: <SupplierDetails />,
        index: true,
        path: "suppliers/:id",
      },
      {
        element: <div>Payments</div>,
        index: true,
        path: "payments",
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
        element: <div>Reports</div>,
        index: true,
        path: "report",
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
