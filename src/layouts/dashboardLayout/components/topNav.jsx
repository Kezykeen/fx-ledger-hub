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
  let activeRoot = crumbs[0];
  activeRoot = {
    ...activeRoot,
    name: NavIcons[activeRoot.name.toLowerCase()],
    path: pathname,
  };

  return (
    <NavWrapper>
      <span>
        <Breadcrumbs crumbs={[activeRoot, ...crumbs.slice(0)]} />
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
    background-color: ${({ theme }) => theme.colors.primary300};
    color: white;
  }
`;
