import * as yup from "yup";

export const initiatePaymentSchema = yup.object().shape({
  amount: yup.string().required("please input amount"),
  account: yup.mixed().required("please select account"),
  currency: yup.mixed().required("please select currency"),
});
