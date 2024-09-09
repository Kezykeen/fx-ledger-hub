import { TradeStatus } from "../../../../constants/enums";

export const paymentStatus = [
  {
    label: `All`,
    value: `all`,
  },
  {
    label: `Paid`,
    value: `paid`,
  },
  {
    label: `Owing`,
    value: `owing`,
  },
];

export const currencyOptions = [
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
    label: `Zelle`,
    value: 6,
  },
];

export const currencyTypeOptions = [
  {
    label: `XAF_Mbabid`,
    value: 0,
  },
  {
    label: `XAF_Solomon`,
    value: 1,
  },
];

export const transactionTabs = [
  {
    label: "Pending Approval",
    hash: `pending-approval`,
  },
  {
    label: "In Progress",
    hash: `in-progress`,
    value: TradeStatus.Pending,
  },
  {
    label: "Approved",
    hash: `approved`,
    value: TradeStatus.Approved,
  },
  {
    label: "Declined",
    hash: `declined`,
    value: TradeStatus.Declined,
  },
];
