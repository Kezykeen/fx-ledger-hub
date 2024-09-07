import * as yup from "yup";

export const fundAccountSchema = yup.object().shape({
  currency: yup.mixed().required("please select currency"),
  account: yup.mixed().required("please select account"),
  amount: yup.string().required("please input amount"),
});

export const withdrawAccountSchema = yup.object().shape({
  currency: yup.mixed().required("please select currency"),
  account: yup.mixed().required("please select account"),
  amount: yup.string().required("please input amount"),
  reason: yup.string(),
});

export const createAccountSchema = yup.object().shape({
  currencyAccountType: yup.mixed(),
  number: yup.string().required("please input number"),
  name: yup.string().required("please input name"),
  balance: yup.string().required("please input balance"),
});
