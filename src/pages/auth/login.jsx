import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { loginUrl } from "../../urls/auth";
import { usePost } from "../../hooks/api";
import { InputField } from "../../components/inputField";
import { Button } from "../../components/button";
import { loginSchema } from "./components/validation";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: login, isPending } = usePost(loginUrl(), (data) => {
    console.log({ data });
    dispatch(setUser(data));
    navigate("/dashboard");
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data);
  };

  console.log({ isPending });

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h2>Welcome back</h2>
        <p>Please enter your account details to log in to your dashboard</p>
      </header>
      <fieldset>
        <InputField
          label={"Email"}
          name="emailAddress"
          register={register}
          placeholder="Enter your email"
          error={!!errors.emailAddress}
          errorText={errors.emailAddress && errors.emailAddress.message}
        />
        <InputField
          register={register}
          label={"Password"}
          type="password"
          name="password"
          placeholder="Enter your password"
          error={!!errors.password}
          errorText={errors.password && errors.password.message}
        />
        <ForgotPassword>Forgot Password</ForgotPassword>
        <Button
          buttonClass={"primary"}
          type="submit"
          label={"Log In"}
          loading={isPending}
        />
      </fieldset>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  background-color: white;
  padding: 0 41px;
  padding-top: 51px;
  padding-bottom: 110px;
  border-radius: 12px;
  border: 1px solid #f2f4f7;
  width: 100%;
  & > header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    max-width: 422px;
    margin: 0 auto;
    margin-bottom: 2rem;
    & h2 {
      font-size: 24px;
      font-weight: 500;
      color: #344054;
    }
    & p {
      font-weight: 300;
      font-size: 16px;
      color: #667085;
      text-align: center;
    }
  }
  & fieldset {
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
    padding: 32px 24px 32px 24px;
    border-radius: 12px;
    gap: 1rem;
    border: none;
  }
`;

const ForgotPassword = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.25px;
  text-align: left;
  color: #667085;
  text-decoration: underline;
  cursor: pointer;
`;
