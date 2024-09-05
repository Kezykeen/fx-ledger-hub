import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { DropdownIcon } from "../../../assets/svgs";

const NavItem = ({ name, icon, path, isActive, children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hasChildren = Boolean(children);
  const isDropdownOpen = hasChildren && isOpen;

  return (
    <NavItemContainer
      $isActive={isActive}
      as={hasChildren ? "div" : Link}
      to={!hasChildren ? path : undefined}
      onClick={hasChildren && toggleDropdown}
    >
      <ContentWrapper>
        <IconWrapper $isActive={isActive}>{icon}</IconWrapper>
        <span>{name}</span>
        {hasChildren && <ArrowIcon $isOpen={isOpen} $isActive={isActive} />}
      </ContentWrapper>
      {hasChildren && (
        <Dropdown $isOpen={isDropdownOpen}>
          {children.map(({ name, path }, idx) => (
            <ChildItem
              to={path}
              $isActive={path === location.pathname}
              key={idx}
            >
              <span>{name}</span>
            </ChildItem>
          ))}
        </Dropdown>
      )}
    </NavItemContainer>
  );
};

export default NavItem;

const NavItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
  background-color: ${({ $isActive }) =>
    $isActive ? "#FD853A33" : "transparent"};
  cursor: pointer;

  & > span:last-of-type {
    font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray800};
    white-space: nowrap;
  }

  border-left: 1.5px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary300 : "transparent"};

  &:hover {
    background-color: #fd853a33;
    border-left: 1.5px solid
      ${({ theme, $isActive }) =>
        $isActive ? theme.colors.primary300 : theme.colors.primary200};
    & > span:first-of-type {
      color: ${({ theme }) => theme.colors.primary300};
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.span`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary300 : theme.colors.gray500};
`;

const ChildItem = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  margin-top: 9px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary500 : theme.colors.grey700};
`;

const ArrowIcon = styled(DropdownIcon)`
  margin-left: auto;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};

  & path {
    stroke: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary300 : "#475467"};
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding-left: 35px;
`;
