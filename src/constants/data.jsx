import {
  CameraIcon,
  GroupIcon,
  HomeIcon,
  LedgerIcon,
  SupplierIcon,
  SupplyHistoryIcon,
  TimeIcon,
  TimeLineIcon,
  UserCogIcon,
  WalletIcon,
} from "../assets/svgs";

export const navs = [
  { name: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
  { name: "Transaction History", path: "/transactions", icon: <TimeIcon /> },
  { name: "Customers", path: "/customers", icon: <GroupIcon /> },
  { name: "Suppliers", path: "/suppliers", icon: <SupplierIcon /> },
  {
    name: "Supply History",
    path: "/supply-history",
    icon: <SupplyHistoryIcon />,
  },
  {
    name: "Ledger",
    path: "/ledger",
    icon: <LedgerIcon />,
    children: [
      { name: "XAF", path: "/ledger/XAF" },
      { name: "USDT", path: "/ledger/usdt" },
      { name: "RMB", path: "/ledger/rmb" },
      { name: "Dollar", path: "/ledger/dollar" },
      { name: "Naira", path: "/ledger/naira" },
    ],
  },
  { name: "Payments ", path: "/payments", icon: <CameraIcon /> },
  { name: "Refund History ", path: "/refund-history", icon: <WalletIcon /> },
  { name: "Reports ", path: "/report", icon: <TimeLineIcon /> },
  { name: "User Management ", path: "/manage-user", icon: <UserCogIcon /> },
];

export const NavIcons = {
  dashboard: <HomeIcon />,
  transactions: <TimeIcon />,
  customers: <GroupIcon />,
  suppliers: <SupplierIcon />,
  payments: <CameraIcon />,
  refund: <WalletIcon />,
  report: <TimeLineIcon />,
  "supply history": <SupplyHistoryIcon />,
  "refund history": <WalletIcon />,
  "manage user": <UserCogIcon />,
  "initiate transaction": <HomeIcon />,
  ledger: <LedgerIcon />,
};

export const teamsOptions = [
  {
    label: `All Teams`,
    value: 0,
  },
  {
    label: `USDT`,
    value: 1,
  },
  {
    label: `Dollar`,
    value: 2,
  },
  {
    label: `XAF`,
    value: 3,
  },
  {
    label: `RMB`,
    value: 4,
  },
  {
    label: `Naira`,
    value: 5,
  },
  {
    label: `ZELLE`,
    value: 6,
  },
];
