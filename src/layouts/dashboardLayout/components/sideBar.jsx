import styled from "styled-components";
import AppLogo from "../../../components/logo";
import { Button } from "../../../components/button";

import ActiveUser from "./activeUser";
import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./navItem";
import { PlusIcon } from "../../../assets/svgs";
import { navs } from "../../../constants/data";
import AdminActions from "./adminActions";

const SideBar = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  // const isSalesRep = loc.pathname.startsWith("/s");
  const isSalesRep = false;
  const isActive = (path) => loc.pathname.includes(path);

  return (
    <SideBarWrapper>
      <SideBarContainer>
        <header>
          <AppLogo useColored />
        </header>
        <ActionWrapper>
          {isSalesRep ? (
            <Button
              buttonClass={"primary"}
              onClick={() => navigate("initiate-transaction")}
              label={
                <Flex>
                  <span>{<PlusIcon />}</span> <span>Initiate Transaction</span>
                </Flex>
              }
            />
          ) : (
            <AdminActions />
          )}
        </ActionWrapper>
        <MenuWrapper>
          <h3>NAVIGATION</h3>
          <Menu>
            {navs.map((nav, index) => {
              return (
                <NavItem
                  key={index}
                  {...nav}
                  isActive={
                    index === 0 ? nav.path === loc.pathname : isActive(nav.path)
                  }
                />
              );
            })}
          </Menu>
        </MenuWrapper>
        <ActiveUser name="John Doe" email="Johndoe@gmail.com" />
      </SideBarContainer>
    </SideBarWrapper>
  );
};

export default SideBar;

const SideBarWrapper = styled.div`
  width: 320px;
  height: 100dvh;
  padding: 16px;
  position: sticky;
  flex-shrink: 0;
  left: 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  justify-content: center;
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  & header {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    padding-top: 18px;
    padding-bottom: 12px;
    border-bottom: 0.5px solid #e4e7ec;
    padding-left: 24px;
  }
`;

const ActionWrapper = styled.div`
  padding: 50px 24px 22px;
  border-bottom: 0.5px solid #e4e7ec;
`;

const MenuWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 24px 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;

  & > h3 {
    font-weight: 500;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray800};
    padding-left: 5px;
  }
`;

const Menu = styled.div`
  background: #f17d091c;
  width: 100%;
  height: fit-content;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.4rem;
`;
