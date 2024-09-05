import styled from "styled-components";
import { BackgroundlessButton } from "../../globals/sharedStyles";
import { Spinner } from "../spinner";

const Button = ({
  label,
  buttonClass,
  loading,
  disabled,
  width,
  type,
  icon,
  onClick,
  customClass,
  ...rest
}) => {
  return (
    <StyledButton
      $buttonClass={buttonClass}
      className={`${customClass ? customClass : ""}`}
      type={type}
      $width={width}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {buttonClass === "more-info" ? (
        <span></span>
      ) : loading ? (
        <Spinner
          width={20}
          height={20}
          color={buttonClass === "secondary" ? `black` : `white`}
        />
      ) : (
        <>
          {icon && icon}
          {label}
        </>
      )}
    </StyledButton>
  );
};

export { Button };

const StyledButton = styled(BackgroundlessButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px 10px 14px;
  width: ${({ $width }) => ($width ? $width : `100%`)};
  height: 44px;
  font-weight: 500;
  font-size: 0.875rem;
  font-family: "Montserrat", sans-serif;
  outline: none;
  border: ${({ $buttonClass }) =>
    $buttonClass === "outline" ? `1px solid #D0D5DD` : `none`};
  border-radius: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  background-color: ${({ $buttonClass, theme }) =>
    $buttonClass === "outline"
      ? `#FFFFFF`
      : $buttonClass === "success"
      ? theme.colors.success600
      : $buttonClass === "danger"
      ? theme.colors.error100
      : theme.colors.primaryDefault};
  color: ${({ $buttonClass, theme }) =>
    $buttonClass === "danger"
      ? theme.colors.error600
      : $buttonClass === "secondary"
      ? theme.colors.white
      : $buttonClass === "outline"
      ? `#344054`
      : theme.colors.white};
  box-shadow: 0px 1px 2px 0px #1018280d;
  cursor: pointer;

  & > svg {
    path {
      stroke: ${({ $buttonClass, theme }) =>
        $buttonClass === "danger"
          ? theme.colors.error600
          : $buttonClass === "secondary"
          ? theme.colors.white
          : $buttonClass === "outline"
          ? `#344054`
          : theme.colors.white};
    }
  }
`;
