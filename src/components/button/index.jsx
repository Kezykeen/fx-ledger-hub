import React from "react";
import styled from "styled-components";

import { BackgroundlessButton } from "../../globals/sharedStyles";
import { Spinner } from "../spinner";

const Button = ({
  label,
  buttonClass,
  loading,
  disabled,
  type,
  link,
  onClick,
  buttonLink,
  customClass,
  ...rest
}) => {
  return (
    <StyledButton
      $buttonClass={buttonClass}
      className={`${customClass ? customClass : ""}`}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {buttonClass === "more-info" ? (
        <span></span>
      ) : (
        <>
          {loading ? (
            <Spinner
              width={20}
              height={20}
              color={buttonClass === "secondary" ? `black` : `white`}
            />
          ) : (
            label
          )}
        </>
      )}
    </StyledButton>
  );
};

export { Button };

const StyledButton = styled(BackgroundlessButton)`
  padding: 10px 14px 10px 14px;
  width: 100%;
  height: 44px;
  font-weight: 500;
  font-size: 0.875rem;
  font-family: "Montserrat", sans-serif;
  outline: none;
  border: none;
  border-radius: 4px;
  margin: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ $buttonClass, theme }) =>
    $buttonClass === "primary"
      ? theme.colors.PrimaryDefault
      : $buttonClass === "danger"
      ? "red"
      : theme.colors.N20};
  color: ${({ $buttonClass, theme }) =>
    $buttonClass === "secondary_danger"
      ? "red"
      : $buttonClass === "secondary"
      ? theme.colors.white
      : theme.colors.white};
  cursor: pointer;
`;
