import { authImage } from "../../assets/images";
import AppLogo from "../../components/logo";
import styled from "styled-components";

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <AppLogo />
        <Outlet />
      </ContentContainer>

      <ImageWrapper>
        <img src={authImage} alt="IronClad Image" />
      </ImageWrapper>
    </PageContainer>
  );
};

export default AuthLayout;

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
