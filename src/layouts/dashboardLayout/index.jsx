import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./components/sideBar";
import TopNav from "./components/topNav";

const DashboardLayout = () => {
  return (
    <LayoutWrapper>
      <SideBar />
      <main>
        <TopNav />
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </main>
    </LayoutWrapper>
  );
};

export default DashboardLayout;

const LayoutWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  height: 100dvh;
  width: 100dvw;
  display: flex;
  & > main {
    width: 100%;
    height: 100%;
    padding-right: 24px;
    padding-bottom: 24px;
    width: 1136px;
    margin: 0 auto;
  }
`;
const OutletWrapper = styled.div`
  margin-top: 1rem;
  padding: 32px 24px 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: calc(100dvh - 86px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
