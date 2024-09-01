import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./components/sideBar";
import TopNav from "./components/topNav";

const DashboardLayout = () => {
  return (
    <LayoutWrapper>
      <SideBar />
      <RightWrapper>
        <TopNav />
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </RightWrapper>
    </LayoutWrapper>
  );
};

export default DashboardLayout;

const LayoutWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray100};
  height: 100dvh;
  width: 100dvw;
`;

const RightWrapper = styled.div`
  width: calc(100vw - 320px);
  height: 100%;
  padding-right: 24px;
  padding-bottom: 24px;
`;

const OutletWrapper = styled.div`
  margin-top: 1rem;
  padding: 32px 24px 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  max-width: 1136px;
  height: calc(100dvh - 86px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
