import React from "react";
import styled from "styled-components";
import { Logo } from "../../assets/svgs";
const AppLogo = ({ useColored }) => {
  return (
    <LogoWrapper useColored={useColored}>
      <Logo />
      <h3>IronClad</h3>
    </LogoWrapper>
  );
};

export default AppLogo;

const LogoWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;

  & h3 {
    font-weight: 600;
    font-size: ${({ useColored }) => (useColored ? "16px" : "24px")};
    color: ${({ theme, useColored }) =>
      useColored ? theme.colors.Primary300 : "#475467"};
  }
`;
