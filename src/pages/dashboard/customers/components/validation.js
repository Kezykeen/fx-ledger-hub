import * as yup from "yup";

export const initiatePaymentSchema = yup.object().shape({
  amount: yup.string().required("please input amount"),
  account: yup.mixed().required("please select account"),
  currency: yup.mixed().required("please select currency"),
});

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

export const createCustomerSchema = yup.object().shape({
  fullName: yup.string().required("please input name"),
  phoneNumber: yup.string().required("please input number"),
  address: yup.string().required("please input address"),
});

export const createAccountSchema = yup.object().shape({
  balance: yup.string().required("please input balance"),
});
