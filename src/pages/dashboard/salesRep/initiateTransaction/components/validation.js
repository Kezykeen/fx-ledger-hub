import * as yup from "yup";

export const InitiateTransactionSchema = yup.object().shape({
  incomingCurrency: yup.mixed().required("please select incoming currency"),
  outgoingCurrency: yup.mixed().required("please select outgoing currency"),
  transactionMeans: yup.mixed().required("please select transaction means"),
  customer: yup.mixed().required("please select customer"),
  rate: yup.string().required("please input rate"),
  amount: yup.string().required("please input amount"),
  amountPaid: yup.string(),
  amountPending: yup.string(),
});

export const accountsSchema = yup.object().shape({
  debitAccount: yup.array().of(
    yup.object().shape({
      account: yup.mixed().required("Account is required"),
      amount: yup.string().required("Amount is required"),
    })
  ),
  creditAccount: yup.array().of(
    yup.object().shape({
      account: yup
        .object({
          value: yup.string().required(),
          label: yup.string().required(),
        })
        .required("Account is required"),
      amount: yup.string().required("Amount is required"),
    })
  ),
});
