import LoginPage from "../layouts/authLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import { SalesRepOverview, TransactionHistory } from "../pages/dashboard";
import { InitiateTransaction } from "../pages/dashboard/initiateTransaction";
import { SupplyHistory } from "../pages/dashboard/supplyHistory";
import { EditTransaction } from "../pages/dashboard/transactionHistory/edit";
import { CustomersHistory } from "../pages/dashboard/customers";
import { TransactionDetailsOverview } from "../pages/dashboard/transactionHistory/transaction-detail";
import { CustomerDetailsOverview } from "../pages/dashboard/customers/customers-detail";
import { Suppliers } from "../pages/dashboard/suppliers";
import { Payments } from "../pages/dashboard/payments";
import { SupplierDetails } from "../pages/dashboard/suppliers/details";
import { CustomerRecord } from "../pages/dashboard/customers/components/customer-history/transaction-history";
import { RefundRecord } from "../pages/dashboard/customers/components/customer-history/refund-history";
import { UpfrontRecord } from "../pages/dashboard/customers/components/customer-history/upfront-history";
import { PaymentDetails } from "../pages/dashboard/payments/details";

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
        element: <Payments />,
        index: true,
        path: "payments",
      },
      {
        element: <PaymentDetails />,
        index: true,
        path: "payments/:id",
      },
      {
        element: <SupplyHistory />,
        index: true,
        path: "supply-history",
      },
      {
        element: <div>Refund history</div>,
        index: true,
        path: "refund-history",
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
