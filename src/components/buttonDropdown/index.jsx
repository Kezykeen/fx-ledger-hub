import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import styled from "styled-components";

export const ButtonDropdown = ({ buttonGroup, buttonElement }) => {
  return (
    <Menu
      menuButton={<StyledMenuButton>{buttonElement}</StyledMenuButton>}
      transition
    >
      <ButtonContainer buttonGroup={buttonGroup} />
    </Menu>
  );
};

const ButtonContainer = ({ buttonGroup }) => {
  return (
    <>
      {buttonGroup?.map((btn, index) => (
        <StyledMenuItem key={index} role="button" onClick={btn.onClick}>
          <Text>{btn.name}</Text>
        </StyledMenuItem>
      ))}
    </>
  );
};

// Styled components

const StyledMenuItem = styled(MenuItem)`
  background-color: ${({ theme }) => theme.colors.white};
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray700};
`;

const StyledMenuButton = styled(MenuButton)`
  display: flex;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 10px 18px !important;
  height: 44px;
  width: auto;
  border: 1px solid red;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 1px 2px 0px #1018280d;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
