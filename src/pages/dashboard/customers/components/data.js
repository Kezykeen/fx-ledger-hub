export const customerHistoryHash = {
  transaction: `transaction-history`,
  refund: `refund-history`,
  upfront: `upfront-history`,
};

export const customerTab = [
  {
    label: "In Progress",
    hash: "in-progress",
  },
  {
    label: "Approved",
    hash: "approved",
  },
  {
    label: "Cancelled",
    hash: "cancelled",
  },
];

export const customerDetailsTab = [
  {
    label: "Transaction History",
    hash: customerHistoryHash.transaction,
  },
  {
    label: "Refund History",
    hash: customerHistoryHash.refund,
  },
  {
    label: "Upfront History",
    hash: customerHistoryHash.upfront,
  },
];
