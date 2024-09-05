import * as yup from "yup";

export const loginSchema = yup.object().shape({
  emailAddress: yup.string().required("please input emal"),
  password: yup.string().required("please input password"),
});
