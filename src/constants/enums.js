export const DateRangeQueryType = {
  Today: 1,
  Week: 2,
  Month: 3,
  Quarter: 4,
  BiAnnual: 5,
  Annual: 6,
  All: 7,
};

export const CurrencyType = {
  USDT: 1,
  Dollar: 2,
  XAF: 3,
  RMB: 4,
  Naira: 5,
  Zelle: 6,
};

export const CurrencyAccountType = {
  XAF_Mbabid: "XAF_Mbabid",
  XAF_Solomon: "XAF_Solomon",
  NA: "NA",
};

export const Department = {
  USDT: 1,
  Dollar: 2,
  XAF: 3,
  RMB: 4,
  Naira: 5,
  Zelle: 6,
  Finance: 7,
  Administration: 8,
};

export const QueryKeys = {
  dashboard: {
    overview: "overview",
    graph: "graph",
    recent: "recent",
  },
  account: "account",
  currency: "currency",
  customer: "customer",
  trade: {
    getAll: "trades",
    getById: "trade",
    adminActions: "trade-admin-actions",
  },
};

export const TradeStatus = {
  Pending: 1,
  Approved: 2,
  Declined: 3,
};

export const CurrencyTradeStatus = {
  Cancelled: 0,
  PendingCOO: 1,
  PendingCFO: 2,
  Approved: 3,
  Rejected: 4,
};

export const ApprovalStatus = {
  NOT_STARTED: 0,
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
};

export const ApprovalType = {
  APPROVED: 1,
  REJECTED: 2,
};

export const userRoles = {
  CFO: `CFO`,
  COO: `COO`,
  SUPERADMIN: `SUPERADMIN`,
  SalesRep: `SalesRep`,
};
