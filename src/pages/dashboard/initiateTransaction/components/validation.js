import * as yup from "yup";

export const InitiateTransactionSchema = yup.object().shape({
  incomingCurrency: yup.mixed().required("please select incoming currency"),
  outgoingCurrency: yup.mixed().required("please select outgoing currency"),
  meansOfTrade: yup.mixed().required("please select transaction means"),
  customerId: yup.mixed().required("please select customer"),
  rate: yup.string().required("please input rate"),
  incomingCurrencyAmount: yup.string().required("please input amount"),
  amountCustomerPaid: yup.string(),
  amountCustomerIsOwing: yup.string(),
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
