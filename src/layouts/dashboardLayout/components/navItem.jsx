import { Link } from "react-router-dom";
import styled from "styled-components";

const NavItem = ({ name, icon, path, isActive }) => {
  return (
    <MenuItem to={path} isActive={isActive}>
      <IconWrapper isActive={isActive}>{icon}</IconWrapper>
      <span>{name}</span>
    </MenuItem>
  );
};

export default NavItem;

const IconWrapper = styled.span`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.Primary300 : theme.colors.gray500};
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;

  background-color: ${({ isActive }) =>
    isActive ? "#FD853A33" : "transparent"};
  & > span:last-of-type {
    font-weight: ${(props) => (props.isActive ? "600" : "500")};
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray800};
    white-space: nowrap;
  }
  border-left: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.Primary300 : "transparent"};
  &:hover {
    background-color: #fd853a33;
    border-left: 2px solid
      ${({ theme, isActive }) =>
        isActive ? theme.colors.Primary300 : theme.colors.Primary200};
    & > span:first-of-type {
      color: ${({ theme, isActive }) => theme.colors.Primary300};
    }
  }
`;
