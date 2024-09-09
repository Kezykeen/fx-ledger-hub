import * as yup from "yup";

export const InitiateTransactionSchema = yup.object().shape({
  incomingCurrency: yup.mixed().required("Please select incoming currency"),
  outgoingCurrency: yup.mixed().required("Please select outgoing currency"),
  meansOfTrade: yup.mixed().required("Please select transaction means"),
  customerId: yup.mixed().required("Please select customer"),
  rate: yup
    .number()
    .typeError("Please enter a valid number for rate")
    .positive("Rate must be a positive number")
    .required("Please input rate")
    .test("is-decimal", "Rate must be a valid decimal number", (value) =>
      /^\d+(\.\d+)?$/.test(value.toString())
    ),
  incomingCurrencyAmount: yup
    .string()
    .required("Please input amount")
    .test(
      "is-greater-than-paid",
      "Amount customer paid cannot exceed incoming amount",
      function (value) {
        const { amountCustomerPaid } = this.parent;
        if (!amountCustomerPaid) return true;
        return parseFloat(value) >= parseFloat(amountCustomerPaid);
      }
    ),
  amountCustomerPaid: yup
    .string()
    .test(
      "is-not-greater-than-incoming",
      "Amount customer paid cannot exceed incoming amount",
      function (value) {
        const { incomingCurrencyAmount } = this.parent;
        if (!value) return true;
        return parseFloat(incomingCurrencyAmount) >= parseFloat(value);
      }
    ),
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
