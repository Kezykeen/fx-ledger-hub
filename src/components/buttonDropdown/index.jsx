import styled, { keyframes } from "styled-components";
import { ClickAwayListener } from "@mui/material";

export const ButtonDropdown = ({
  open,
  setOpen,
  buttonGroup,
  buttonElement,
  customElement,
  width,
}) => {
  const handleClick = () => {
    setOpen((previousOpen) => !previousOpen);
  };

  const handleItemClick = (btn) => {
    btn?.onClick();
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <StyledMenu>
        <Label onClick={handleClick}>{buttonElement}</Label>
        {open && (
          <DropdownContainer>
            {customElement ? (
              customElement
            ) : (
              <ButtonContainer
                buttonGroup={buttonGroup}
                handleItemClick={handleItemClick}
                width={width}
              />
            )}
          </DropdownContainer>
        )}
      </StyledMenu>
    </ClickAwayListener>
  );
};

const ButtonContainer = ({ buttonGroup, handleItemClick, width }) => {
  return (
    <Container $width={width}>
      {buttonGroup?.map((btn, i) => (
        <StyledMenuItem
          key={i}
          role="button"
          onClick={() => handleItemClick(btn)}
        >
          <Text>{btn?.name}</Text>
        </StyledMenuItem>
      ))}
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledMenu = styled.div`
  position: relative;
  z-index: 1;
`;

const Label = styled.div`
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 90%;
  left: 0;
  margin-top: 10px;
  animation: ${fadeIn} 0.25s ease-in-out;
  border-radius: 8px;
  background-color: #fff;
  padding: 10px 6px;
  box-shadow: 0px 2px 7px 1px #10182817;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => ($width ? $width : `90px`)};
`;

const StyledMenuItem = styled.div`
  background-color: white;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
    background-color: #fd853a33;
    border-radius: 8px;

    & > p {
      color: #c04a00;
    }
  }
`;

const Text = styled.p`
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray700};
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
