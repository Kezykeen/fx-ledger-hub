import React from "react";
import styled from "styled-components";
import AppLogo from "../../../components/logo";
import { Button } from "../../../components/button";

import ActiveUser from "./activeUser";
import { useLocation } from "react-router-dom";
import NavItem from "./navItem";
import { PlusIcon } from "../../../assets/svgs";
import { cfoNavs, salesNavs } from "../../../constants/data";

const SideBar = () => {
  const loc = useLocation();
  const isSalesRep = loc.pathname.startsWith("/s");
  const navToUse = isSalesRep ? salesNavs : cfoNavs;
  const isActive = (path) => loc.pathname.includes(path);
  return (
    <SideBarWrapper>
      <SideBarContainer>
        <header>
          <AppLogo useColored />
        </header>
        <ActionWrapper>
          <Button
            buttonClass={"primary"}
            label={
              <Flex>
                <span>{<PlusIcon />}</span> <span>Initiate Transaction</span>
              </Flex>
            }
          />
        </ActionWrapper>
        <MenuWrapper>
          <h3>NAVIGATION</h3>
          <Menu>
            {navToUse.map((nav, index) => (
              <NavItem
                key={index}
                name={nav.name}
                path={nav.path}
                icon={nav.icon}
                isActive={
                  index === 0 ? nav.path === loc.pathname : isActive(nav.path)
                }
              />
            ))}
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
  gap: 16px;
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
    border-bottom: 1px solid #ddd;
    padding-left: 24px;
  }
`;
const ActionWrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 50px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
`;
const MenuWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 24px 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
