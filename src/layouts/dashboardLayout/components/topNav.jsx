import React from "react";
import styled from "styled-components";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { AlertIcon, LogoutIcon } from "../../../assets/svgs";
import { useLocation } from "react-router-dom";
import { createBreadcrumbs } from "../../../utils/helpers.utils";
import { NavIcons } from "../../../constants/data";

const TopNav = () => {
  const loc = useLocation();
  const pathname = loc.pathname;
  const crumbs = createBreadcrumbs(pathname);
  const crumbsData = [
    ...crumbs.slice(0, 1).map((crumb) => ({ ...crumb, name: "Home" })),
    ...crumbs.slice(1),
  ];
  const isCrumsGreaterThanTwo = crumbsData.length > 1;
  let activeRoot = isCrumsGreaterThanTwo ? crumbsData[1] : crumbsData[0];
  activeRoot = {
    ...activeRoot,
    name: NavIcons[activeRoot.name.toLowerCase()],
    path: pathname,
  };
  return (
    <NavWrapper>
      <span>
        <Breadcrumbs crumbs={[activeRoot, ...crumbsData.slice(0)]} />
      </span>
      <div>
        <ButtonWrapper>
          <LogoutIcon />
        </ButtonWrapper>
        <ButtonWrapper>
          <AlertIcon />
        </ButtonWrapper>
      </div>
    </NavWrapper>
  );
};

export default TopNav;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  position: sticky;
  top: 0;
  background-color: #f2f4f7;
  padding-right: 24px;
  padding-bottom: 6px;
  & > div {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;
const ButtonWrapper = styled.button`
  background-color: #e4e7ec99;
  color: #344054;
  height: 47px;
  width: 47px;
  border: none;
  outline: none;
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.Primary300};
    color: white;
  }
`;
