import { authImage } from "../../assets/images";
import AppLogo from "../../components/logo";
import { Button } from "../../components/button";
import { InputField } from "../../components/inputField";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <AppLogo />
        <FormWrapper>
          <header>
            <h2>Welcome back</h2>
            <p>Please enter your account details to log in to your dashboard</p>
          </header>
          <fieldset>
            <InputField
              label={"User Name"}
              type="text"
              placeholder="Enter your user name"
            />
            <InputField
              label={"Password"}
              type="password"
              placeholder="Enter your password"
            />
            <ForgotPassword>Forgot Password</ForgotPassword>
            <Link to={"/dashboard"}>
              <Button buttonClass={"primary"} label={"Log In"} />
            </Link>
          </fieldset>
        </FormWrapper>
      </ContentContainer>

      <ImageWrapper>
        <img src={authImage} alt="IronClad Image" />
      </ImageWrapper>
    </PageContainer>
  );
};

export default LoginPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f8f8f8;
`;

const ContentContainer = styled.div`
  flex: 1;
  flex-grow: 1;
  max-width: 588px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 2rem;
`;

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

const ImageWrapper = styled.div`
  width: 50%;
  height: 100%;
  max-width: 705px;
  position: sticky;
  top: 0;
  right: 0;
  bottom: 0;
  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;
