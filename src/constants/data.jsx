import {
  CameraIcon,
  GroupIcon,
  HomeIcon,
  LedgerIcon,
  SupplierHistoryIcon,
  SupplierIcon,
  TimeIcon,
  TimeLineIcon,
  UserCogIcon,
  WalletIcon,
} from "../assets/svgs";

export const salesNavs = [
  { name: "Dashboard", path: "/s", icon: <HomeIcon /> },
  { name: "Transaction History", path: "/s/transactions", icon: <TimeIcon /> },
  { name: "Customers", path: "/s/customers", icon: <GroupIcon /> },
  { name: "Suppliers", path: "/s/suppliers", icon: <SupplierIcon /> },
  { name: "Supply History", path: "/s/supply-history", icon: <SupplierHistoryIcon /> },
  { name: "Payments ", path: "/s/payments", icon: <CameraIcon /> },
  { name: "Refund History ", path: "/s/refund", icon: <WalletIcon /> },
  { name: "Reports ", path: "/s/report", icon: <TimeLineIcon /> },
];
export const cfoNavs = [
  { name: "Dashboard", path: "/c", icon: <HomeIcon /> },
  { name: "Transaction History", path: "/c/transactions", icon: <TimeIcon /> },
  { name: "Customers", path: "/c/customers", icon: <GroupIcon /> },
  { name: "Supliers", path: "/c/supliers", icon: <SupplierIcon /> },
  { name: "Supply History", path: "/c/supply-history", icon: <SupplierHistoryIcon /> },
  { name: "Payments ", path: "/c/payments", icon: <CameraIcon /> },
  { name: "Refund History ", path: "/c/refund", icon: <WalletIcon /> },
  { name: "Reports ", path: "/c/report", icon: <TimeLineIcon /> },
  { name: "User Management ", path: "/c/manage-user", icon: <UserCogIcon /> },
];

export const NavIcons = {
  home: <HomeIcon />,
  transactions: <TimeIcon />,
  customers: <GroupIcon />,
  suppliers: <SupplierIcon />,
  "supply-history": <SupplierHistoryIcon />,
  payments: <CameraIcon />,
  refund: <WalletIcon />,
  report: <TimeLineIcon />,
  "manage-user": <UserCogIcon />,
  ledger: <LedgerIcon />,
};
