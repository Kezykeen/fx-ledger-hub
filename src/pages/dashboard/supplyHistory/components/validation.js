import * as yup from "yup";

export const closeSupplySchema = yup.object().shape({
  amount: yup.string().required("please input amount"),
  depositReceipt: yup.mixed().required("please upload file"),
});

export const initiateSupplySchema = yup.object().shape({
  amount: yup.string().required("please input amount"),
  account: yup.mixed().required("please select account"),
  currency: yup.mixed().required("please select currency"),
});
